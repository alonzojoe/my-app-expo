import { StyleSheet, Text, View } from "react-native";
import React, { useState, useMemo } from "react";
import SafeView from "../components/SafeView";
import { Searchbar, List, Avatar, Card, IconButton } from "react-native-paper";
import { FAQS } from "../constants/global";
import FaqItem from "../components/Faq/FaqItem";
import { ScrollView } from "react-native";

import useDebounce from "./../hooks/useDebounce";
const Faqs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debounceValue = useDebounce(searchQuery);

  const filteredFaqs = useMemo(() => {
    const safeQuery = (debounceValue || "").toLowerCase();

    return FAQS.filter((f) =>
      (f.question || "").toLowerCase().includes(safeQuery)
    );
  }, [debounceValue]);

  return (
    <SafeView>
      <ScrollView>
        <View style={styles.container}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        <View style={{ paddingHorizontal: 15, marginTop: 15, gap: 10 }}>
          {filteredFaqs.map((faq) => (
            <FaqItem faq={faq} key={faq.id} />
          ))}
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Faqs;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
});
