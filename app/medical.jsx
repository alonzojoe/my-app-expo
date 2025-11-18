import {
  Searchbar,
  Portal,
  Modal,
  ActivityIndicator,
  MD2Colors,
  Text as PaperText,
  Button,
} from "react-native-paper";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import React, { useState, useMemo, useCallback } from "react";
import SafeView from "../components/SafeView";
import TransactionItem from "../components/Transactions/TransactionItem";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useDebounce from "./../hooks/useDebounce";
import useToggle from "../hooks/useToggle";
import { PHYSICIANS, DIAGNOSIS, SOAP } from "../constants/global";
import AdmittedForm from "../components/Transactions/AdmittedForm";
import OutPatientForm from "../components/Transactions/OutPatientForm";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { formatDate } from "../libs/utils";
import { fetchTransactions } from "../services/Medical/apiCalls";
import ErrorWithRefetch from "../components/Global/ErrorWithRefetch";
const Medical = () => {
  const { bottom } = useSafeAreaInsets;
  const [searchQuery, setSearchQuery] = useState("");
  const [show, toggleShow] = useToggle(false);
  const [selected, setSelected] = useState(null);

  const { authUser } = useSelector((state) => state.auth);

  const PatientID = authUser?.PatientID;

  const {
    data: MEDICAL_RECORDS,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transaction", PatientID],
    queryFn: () => fetchTransactions(PatientID),
  });

  const searchDebounce = useDebounce(searchQuery);

  const filteredRecords = useMemo(() => {
    const query = (searchDebounce || "").trim().toLowerCase();
    if (!Array.isArray(MEDICAL_RECORDS) || MEDICAL_RECORDS.length === 0)
      return [];
    return MEDICAL_RECORDS.filter(
      (record) =>
        (record.transactionNo || "").toLowerCase().includes(query) ||
        (record.transactionDate || "").toLowerCase().includes(query)
    );
  }, [searchDebounce, MEDICAL_RECORDS]);

  console.log("filtered", filteredRecords);

  const selectRecord = useCallback(
    (medical) => {
      setSelected(medical);
    },
    [setSelected]
  );

  return (
    <SafeView>
      {error ? (
        <ScrollView style={{ paddingBottom: bottom }}>
          <ErrorWithRefetch refresh={() => refetch()} />
        </ScrollView>
      ) : (
        <FlatList
          data={filteredRecords}
          keyExtractor={(item, index) =>
            `${item.PatientHistoryID}-${item.TransactionNo}-${index}`
          }
          renderItem={({ item }) => (
            <TransactionItem
              onView={() => {
                selectRecord(item);
                toggleShow(true);
              }}
              transaction={item.TransactionNo}
              transactionDate={formatDate(item.AdmissionDateTime)}
            />
          )}
          ListHeaderComponent={() => (
            <View style={{ marginTop: 15, marginBottom: 15 }}>
              <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
            </View>
          )}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingBottom: 100,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListEmptyComponent={
            isFetching ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 15,
                }}
              >
                <ActivityIndicator
                  animating={true}
                  size="large"
                  color={MD2Colors.primary}
                />
              </View>
            ) : (
              <View style={{ padding: 20, alignItems: "center" }}>
                <Text style={{ color: "#999" }}>No transactions found</Text>
              </View>
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={refetch}
              tintColor="#007AFF"
              colors={["#007AFF"]}
            />
          }
        />
      )}

      <Portal>
        <Modal
          visible={show}
          onDismiss={() => toggleShow(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {selected && selected.TransactionNo.toLowerCase().includes("opd") ? (
            <OutPatientForm selected={selected} onToggle={toggleShow} />
          ) : (
            <AdmittedForm
              selected={selected}
              physicians={PHYSICIANS}
              diagnosis={DIAGNOSIS}
              onToggle={toggleShow}
            />
          )}
        </Modal>
      </Portal>
    </SafeView>
  );
};

export default Medical;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 18,
  },
  modalContainer: {
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: "white",
    padding: 20,
  },
});
