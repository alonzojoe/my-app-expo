import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Card, IconButton } from "react-native-paper";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
const TransactionItem = ({ transaction, transactionDate, onView }) => {
  return (
    <Card onPress={onView}>
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

export const MedicalItem = ({ transaction, transactionDate, onView }) => {
  return (
    <View style={styles.card}>
      {/* Left colored bar */}
      <View style={styles.leftBar} />

      {/* Main content */}
      <TouchableOpacity style={styles.content} onPress={onPress}>
        {/* Appointment Date */}
        <View
          style={[
            styles.row,
            { justifyContent: "space-between", alignItems: "start" },
          ]}
        >
          <View style={styles.col}>
            <Text
              style={styles.appointmentTextHeader}
            >{`Appointment date`}</Text>
            <View style={[styles.row]}>
              <FontAwesome name="clock-o" size={16} color="#000000" />
              <Text style={styles.appointmentText}>{transactionDate}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={onCancel} style={styles.menu}>
            {/* <FontAwesome name="ellipsis-v" size={20} color="#6E7AA3" /> */}
            <FontAwesome6 name="times-circle" size={23} color="#DD3353" />
          </TouchableOpacity>
        </View>

        <Divider style={{ marginVertical: "3" }} />
        {/* Service Name */}
        <View style={[styles.row]}>
          {/* <View
            onPress={onPress}
            style={{
              backgroundColor: "#004C82",
              borderRadius: 24,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onPress={onPress}
              icon="medical"
              size={25}
              iconColor="#FFF"
              style={{ margin: 0 }}
            />
          </View> */}
          <Text style={styles.serviceText}>{transaction}</Text>
        </View>
      </TouchableOpacity>

      {/* Right menu icon */}
      {/* <TouchableOpacity onPress={onCancel} style={styles.menu}>
        <FontAwesome name="ellipsis-v" size={20} color="#6E7AA3" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginVertical: 6,
    alignItems: "center",
    elevation: 1,
  },
  leftBar: {
    width: 4,
    height: "80%",
    backgroundColor: "#3AC17B",
    borderRadius: 20,
    marginRight: 12,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  col: {
    flexDirection: "column",
    gap: 5,
  },
  appointmentTextHeader: {
    marginLeft: 0,
    color: "#6E7AA3",
    fontSize: 12,
    fontWeight: "bold",
  },
  appointmentText: {
    marginLeft: 6,
    color: "#000000",
    fontSize: 13,
  },
  serviceText: {
    color: "#001C63",
    fontWeight: "bold",
    fontSize: 16,
  },
  menu: {
    padding: 8,
  },
});
