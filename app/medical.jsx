import { StyleSheet, Text, View } from "react-native";
import React, { useState, useMemo } from "react";
import SafeView from "../components/SafeView";
import { Searchbar } from "react-native-paper";
import TransactionItem from "../components/Transactions/TransactionItem";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MEDICAL_RECORDS } from "../constants/global";
import useDebounce from "./../hooks/useDebounce";
const Medical = () => {
  const { bottom } = useSafeAreaInsets;
  const [searchQuery, setSearchQuery] = useState("");
  const debounceValue = useDebounce(searchQuery);

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
              key={medical.id}
              transaction={medical.transactionNo}
              transactionDate={medical.transactionDate}
            />
          ))}
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Medical;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
});
