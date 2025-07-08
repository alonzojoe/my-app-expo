import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, IconButton } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
const TransactionItem = ({ transaction, transactionDate, onView }) => {
  return (
    <Card onPress={() => console.log("s")}>
      <Card.Title
        title={transaction}
        subtitle={transactionDate}
        titleStyle={{ color: "#001C63", fontWeight: "bold" }}
        subtitleStyle={{ color: "#6E7AA3" }}
        left={(props) => (
          <FontAwesome5 name="notes-medical" size={24} color="#004C82" />
        )}
        right={(props) => <IconButton {...props} icon="eye" onPress={onView} />}
      />
    </Card>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({});
