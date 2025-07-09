import { StyleSheet, Text, View } from "react-native";
import React, { useState, useMemo } from "react";
import SafeView from "../components/SafeView";
import {
  Searchbar,
  Portal,
  Modal,
  Text as PaperText,
} from "react-native-paper";
import TransactionItem from "../components/Transactions/TransactionItem";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MEDICAL_RECORDS } from "../constants/global";
import useDebounce from "./../hooks/useDebounce";
import useToggle from "../hooks/useToggle";
const Medical = () => {
  const { bottom } = useSafeAreaInsets;
  const [searchQuery, setSearchQuery] = useState("");
  const debounceValue = useDebounce(searchQuery);
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
          <>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <PaperText variant="titleSmall">FAQ Title</PaperText>
            </View>
            <ScrollView>
              <PaperText>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Blanditiis, ducimus quo animi sunt enim aperiam! Totam fugit
                illum voluptatem ullam, iusto culpa sit necessitatibus earum
                ipsum nulla cum ipsam velit. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Blanditiis, ducimus quo animi sunt
                enim aperiam! Totam fugit illum voluptatem ullam, iusto culpa
                sit necessitatibus earum ipsum nulla cum ipsam velit. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis,
                ducimus quo animi sunt enim aperiam! Totam fugit illum
                voluptatem ullam, iusto culpa sit necessitatibus earum ipsum
                nulla cum ipsam velit.
              </PaperText>
            </ScrollView>
            <View style={{ marginVertical: 10 }} />
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                alignContent: "center",
                justifyContent: "flex-end",
              }}
            >
              <PaperText
                style={{ color: "#DD3254", fontWeight: "bold" }}
                onPress={() => toggleShow(false)}
              >
                Close
              </PaperText>
            </View>
          </>
        </Modal>
      </Portal>
    </SafeView>
  );
};

export default Medical;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  modalContainer: {
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: "white",
    padding: 20,
  },
});
