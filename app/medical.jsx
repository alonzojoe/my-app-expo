import { StyleSheet, View } from "react-native";
import React, { useState, useMemo } from "react";
import SafeView from "../components/SafeView";
import { Searchbar, Portal, Modal } from "react-native-paper";
import TransactionItem from "../components/Transactions/TransactionItem";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MEDICAL_RECORDS } from "../constants/global";
import useDebounce from "./../hooks/useDebounce";
import useToggle from "../hooks/useToggle";
import { PHYSICIANS, DIAGNOSIS } from "../constants/global";
import AdmittedForm from "../components/Transactions/AdmittedForm";

const Medical = () => {
  const { bottom } = useSafeAreaInsets;
  const [searchQuery, setSearchQuery] = useState("");
  const [show, toggleShow] = useToggle(false);

  const searchDebounce = useDebounce(searchQuery);

  const filteredRecords = useMemo(() => {
    const query = (searchDebounce || "").trim().toLowerCase();

    return MEDICAL_RECORDS.filter(
      (record) =>
        (record.transactionNo || "").toLowerCase().includes(query) ||
        (record.transactionDate || "").toLowerCase().includes(query)
    );
  }, [searchDebounce]);

  return (
    <SafeView>
      <ScrollView style={{ paddingBottom: bottom }}>
        <View style={styles.container}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            marginTop: 15,
            gap: 10,
            marginBottom: 5,
          }}
        >
          {filteredRecords.map((medical) => (
            <TransactionItem
              onView={() => toggleShow(true)}
              key={medical.id}
              transaction={medical.transactionNo}
              transactionDate={medical.transactionDate}
            />
          ))}
        </View>
      </ScrollView>
      <Portal>
        <Modal
          visible={show}
          onDismiss={() => toggleShow(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <AdmittedForm
            physicians={PHYSICIANS}
            diagnosis={DIAGNOSIS}
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
