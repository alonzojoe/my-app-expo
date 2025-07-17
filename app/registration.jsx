import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SafeView from "../components/SafeView";
import { Card, Text as PaperText, Button, TextInput } from "react-native-paper";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import QRScanner from "../components/QR/QRScanner";
import Spacer from "../components/Spacer";
import useToggle from "./../hooks/useToggle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaskInput, { Masks } from "react-native-mask-input";
import api from "../services";
import VerificationForm from "../components/Forms/VerificationForm";
const Registration = () => {
  const { bottom } = useSafeAreaInsets();
  const [hospitalNo, setHospitalNo] = useState("");
  const [phone, setPhone] = React.useState("");
  const [focused, setFocused] = useState(false);
  const [showQr, toggleShowQr] = useToggle(false);
  const color = Colors["light"];

  const testAPI = async () => {
    try {
      const res = await api.get("/verify", {
        params: {
          patientno: "01352296",
          lastname: "DEANG",
          birthdate: "03-14-1938",
        },
      });
      console.log("API RES:", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeView>
      <ScrollView style={{ marginBottom: bottom }}>
        <View style={styles.container}>
          <VerificationForm />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  topHeaderItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  headerItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  textGroup: {
    marginBottom: 15,
    marginTop: 15,
    alignItems: "center",
  },
  btn: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    width: "100%",
    marginVertical: 5,
  },
});
