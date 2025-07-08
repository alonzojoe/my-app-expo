import { StyleSheet, Text, View } from "react-native";
import React, { useState, useMemo } from "react";
import SafeView from "../components/SafeView";
import {
  Searchbar,
  List,
  Avatar,
  Card,
  IconButton,
  Portal,
  Modal,
  Text as PaperText,
} from "react-native-paper";
import { FAQS } from "../constants/global";
import FaqItem from "../components/Faq/FaqItem";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useDebounce from "./../hooks/useDebounce";
import useToggle from "../hooks/useToggle";

const Faqs = () => {
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
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        <View style={{ paddingHorizontal: 15, marginTop: 15, gap: 10 }}>
          {filteredFaqs.map((faq) => (
            <FaqItem faq={faq} key={faq.id} onPress={viewItem} />
          ))}
        </View>
      </ScrollView>
      <Portal>
        <Modal
          visible={show}
          onDismiss={() => toggleShow(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <PaperText>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Blanditiis, ducimus quo animi sunt enim aperiam! Totam fugit illum
            voluptatem ullam, iusto culpa sit necessitatibus earum ipsum nulla
            cum ipsam velit.
          </PaperText>
        </Modal>
      </Portal>
    </SafeView>
  );
};

export default Faqs;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  modalContainer: {
    marginHorizontal: 20,
    backgroundColor: "white",
    padding: 20,
  },
});
