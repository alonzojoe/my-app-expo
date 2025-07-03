import { StyleSheet, Text, View } from "react-native";
import React, { useState, useMemo } from "react";
import SafeView from "../components/SafeView";
import { Searchbar, List, Avatar, Card, IconButton } from "react-native-paper";
import { FAQS } from "../constants/global";
import TransactionItem from "../components/Transactions/TransactionItem";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Medical = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { bottom } = useSafeAreaInsets;

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
          <TransactionItem
            transaction={`IN-72025-428087`}
            transactionDate={`July 2, 2025 1:44 PM`}
          />
          <TransactionItem
            transaction={`IN-72025-428087`}
            transactionDate={`July 2, 2025 1:44 PM`}
          />
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
