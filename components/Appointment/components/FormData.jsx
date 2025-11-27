import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Text as PaperText,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import ContentTitle from "./../../Transactions/ContentTitle";

const FormData = () => {
  const [phone, setPhone] = useState("");
  const [complaints, setComplaints] = useState("");

  return (
    <View style={styles.container}>
      <ContentTitle title={`Complete the form`} mb={0} />

      {/* Alternate Phone Number */}
      <PaperText variant="titleSmall" style={styles.labelText}>
        Alternate Phone Number
      </PaperText>
      <TextInput
        mode="outlined"
        placeholder="Enter alternate phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />

      {/* Chief Complaints */}
      <PaperText variant="titleSmall" style={styles.labelText}>
        Chief Complaint
      </PaperText>
      <TextInput
        mode="outlined"
        placeholder="Enter chief complaint"
        value={complaints}
        onChangeText={setComplaints}
        multiline
        numberOfLines={4}
        style={[styles.input, styles.textArea]}
      />

      <View style={styles.textGroup}>
        <Button
          icon="check"
          mode="contained"
          onPress={() => console.log("test")}
          style={styles.btn}
          labelStyle={styles.btnLabel}
          disabled={false}
        >
          {false ? <ActivityIndicator size={20} /> : "Create Appointment"}
        </Button>
      </View>
    </View>
  );
};

export default FormData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: "#F9FAFB",
    paddingBottom: 100,
    gap: 5,
  },
  header: {
    marginBottom: 20,
    fontWeight: "bold",
  },
  labelText: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "600",
    color: "#929292",
    fontSize: 13,
  },
  input: {
    backgroundColor: "white",
    height: 40,
    fontSize: 13,
    paddingVertical: 3,
    paddingHorizontal: 2,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
    fontSize: 13,
    paddingVertical: 1,
  },
  textGroup: {
    marginTop: 15,
    alignItems: "center",
  },
  btn: {
    width: "100%",
  },
  btnLabel: {
    color: "white",
    fontWeight: "normal",
  },
});
