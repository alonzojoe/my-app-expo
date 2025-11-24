import { useMemo } from "react";
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
import SafeView from "../components/SafeView";
import { MedicalItem } from "../components/Transactions/TransactionItem";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useToggle from "../hooks/useToggle";
import { PHYSICIANS, DIAGNOSIS, SOAP } from "../constants/global";
import AdmittedForm from "../components/Transactions/AdmittedForm";
import OutPatientForm from "../components/Transactions/OutPatientForm";
import { formatDate } from "../libs/utils";
import ErrorWithRefetch from "../components/Global/ErrorWithRefetch";
import useMedicalrecords from "./../hooks/features/medical-records/useMedicalrecords";

const Medical = () => {
  const { bottom } = useSafeAreaInsets;
  const {
    searchQuery,
    setSearchQuery,
    isFetching,
    error,
    refetch,
    filteredRecords,
    selected,
    selectRecord,
  } = useMedicalrecords();

  const [show, toggleShow] = useToggle(false);

  const SearchHeader = useMemo(() => {
    return (
      <View style={{ marginTop: 15, marginBottom: 15 }}>
        <Searchbar
          style={{ backgroundColor: "#FFFFFFFF" }}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
    );
  }, [searchQuery]);

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
            <MedicalItem
              onView={() => {
                selectRecord(item);
                toggleShow(true);
              }}
              transaction={item.TransactionNo}
              transactionDate={formatDate(item.AdmissionDateTime)}
            />
          )}
          ListHeaderComponent={SearchHeader}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingBottom: 100,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
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
                <PaperText style={{ color: "#999" }}>
                  No transactions found
                </PaperText>
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
