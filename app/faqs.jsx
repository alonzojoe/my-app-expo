import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SafeView from "../components/SafeView";
import { Searchbar, List, Avatar, Card, IconButton } from "react-native-paper";
import { FAQS } from "../constants/global";
import FaqItem from "../components/Faq/FaqItem";
const Faqs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <SafeView>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <View style={{ paddingHorizontal: 15, marginTop: 15, gap: 10 }}>
        {FAQS.map((faq) => (
          <FaqItem faq={faq} key={faq.id} />
        ))}
      </View>
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
