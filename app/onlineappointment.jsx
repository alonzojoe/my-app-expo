import { StyleSheet, Text, View } from "react-native";
import React, { useState, useMemo } from "react";
import SafeView from "../components/SafeView";
import {
  Searchbar,
  List,
  Avatar,
  Card,
  IconButton,
  Button,
  Portal,
  Modal,
  Text as PaperText,
} from "react-native-paper";
import { FAQS } from "../constants/global";
import FaqItem from "../components/Faq/FaqItem";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useDebounce from "../hooks/useDebounce";
import useToggle from "../hooks/useToggle";

const OnlineAppointment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debounceValue = useDebounce(searchQuery);
  const [show, toggleShow] = useToggle(false);

  const filteredFaqs = useMemo(() => {
    const safeQuery = (debounceValue || "").toLowerCase();

    return FAQS.filter((f) =>
      (f.question || "").toLowerCase().includes(safeQuery)
    );
  }, [debounceValue]);

  const { bottom } = useSafeAreaInsets();

  const viewItem = () => toggleShow(true);

  return (
    <SafeView>
      <ScrollView style={{ paddingBottom: bottom }}>
        <View style={styles.container}>
          <Text>Content</Text>
        </View>
        <View style={{ paddingHorizontal: 15, marginTop: 15, gap: 10 }}>
          <Text>Content</Text>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default OnlineAppointment;

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
