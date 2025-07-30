import {
  Searchbar,
  Portal,
  Modal,
  ActivityIndicator,
  MD2Colors,
  Text as PaperText,
  Button,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import React, { useState, useMemo } from "react";
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

  return (
    <SafeView>
      <ScrollView style={{ paddingBottom: bottom }}>
        {error ? (
          <View
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
            }}
          >
            <PaperText
              variant="bodyLarge"
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#FF2245",
                marginTop: 20,
              }}
            >
              Something went wrong
            </PaperText>
            <Button
              width={120}
              icon="refresh"
              mode="contained"
              onPress={() => refetch()}
              style={{
                marginTop: 20,
                color: "#fff",
                backgroundColor: "#001C63",
              }}
            >
              Refresh
            </Button>
          </View>
        ) : (
          <>
            <View style={styles.container}>
              <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
            </View>
            {isFetching ? (
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
              <View
                style={{
                  paddingHorizontal: 15,
                  marginTop: 15,
                  gap: 10,
                  marginBottom: 5,
                  paddingBottom: 50,
                }}
              >
                {filteredRecords.map((medical) => (
                  <TransactionItem
                    onView={() => {
                      setSelected(medical);
                      toggleShow(true);
                    }}
                    key={medical.PatientHistoryID}
                    transaction={medical.TransactionNo}
                    transactionDate={formatDate(medical.AdmissionDateTime)}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
      <Portal>
        <Modal
          visible={show}
          onDismiss={() => toggleShow(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {/* <AdmittedForm
            selected={selected}
            physicians={PHYSICIANS}
            diagnosis={DIAGNOSIS}
            onToggle={toggleShow}
          /> */}
          <OutPatientForm
            selected={selected}
            physicians={PHYSICIANS}
            soap={SOAP}
            onToggle={toggleShow}
          />
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
