import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, IconButton } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
const TransactionItem = ({ transaction, transactionDate, onView }) => {
  return (
    <Card>
      <Card.Title
        title={transaction}
        subtitle={transactionDate}
        left={(props) => (
          <FontAwesome5 name="notes-medical" size={24} color="#3A71FA" />
        )}
        right={(props) => <IconButton {...props} icon="eye" onPress={onView} />}
      />
    </Card>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({});
