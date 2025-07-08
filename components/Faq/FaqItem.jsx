import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, IconButton } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
const FaqItem = ({ faq, onPress }) => {
  return (
    <Card onPress={onPress}>
      <Card.Title
        title={faq.question}
        titleNumberOfLines={3}
        left={(props) => (
          <FontAwesome name="question-circle" size={24} color="#3A71FA" />
        )}
        right={(props) => (
          <IconButton {...props} icon="eye" onPress={() => {}} />
        )}
      />
    </Card>
  );
};

export default FaqItem;

const styles = StyleSheet.create({});
