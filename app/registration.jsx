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
          <>
            <View style={[styles.topHeaderItem, { marginBottom: 10 }]}>
              <PaperText
                variant="titleMedium"
                style={{
                  color: "#001C63",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Information Verification
              </PaperText>
              <MaterialIcons name="verified" size={24} color="#017BFF" />
            </View>
          </>
          <>
            <View style={[styles.headerItem, { marginTop: 20 }]}>
              <PaperText
                variant="titleMedium"
                style={{ color: "#001C63", fontWeight: "bold" }}
              >
                Hospital Number
              </PaperText>
            </View>
            <TextInput
              value={hospitalNo}
              onChangeText={(text) => setHospitalNo(text)}
              keyboardType="numeric"
              type="number"
              label=""
              mode="outlined"
              style={styles.input}
              right={
                <TextInput.Icon
                  color={showQr ? `#DD3353` : `#095185`}
                  icon={showQr ? "close" : "qrcode"}
                  onPress={() =>
                    showQr ? toggleShowQr(false) : toggleShowQr(true)
                  }
                />
              }
            />
          </>
          {showQr && (
            <QRScanner
              onScan={setHospitalNo}
              onClose={() => toggleShowQr(false)}
            />
          )}
          <>
            <View style={[styles.headerItem, { marginTop: 20 }]}>
              <PaperText
                variant="titleMedium"
                style={{ color: "#001C63", fontWeight: "bold" }}
              >
                Last Name
              </PaperText>
            </View>
            <TextInput
              type="number"
              label=""
              mode="outlined"
              style={styles.input}
            />
          </>
          <>
            <View style={[styles.headerItem, { marginTop: 20 }]}>
              <PaperText
                variant="titleMedium"
                style={{ color: "#001C63", fontWeight: "bold" }}
              >
                Birthdate (MM/DD/YYYY)
              </PaperText>
            </View>
            <MaskInput
              value={phone}
              onChangeText={(masked, unmasked) => {
                setPhone(masked);
                console.log(masked);
                console.log(unmasked);
              }}
              mask={Masks.DATE_MMDDYYYY}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              maxLength={10}
              style={[
                styles.input,
                {
                  keyboardType: "numeric",
                  backgroundColor: "#FFF",
                  borderColor: focused ? "#001C63" : "#C1BDC3",
                  borderWidth: 2,
                  borderRadius: 5,
                  padding: 15,
                  fontSize: 16,
                },
              ]}
            />
          </>
          <View style={styles.textGroup}>
            <Button
              mode="contained"
              onPress={() => {
                console.log("test");
                testAPI();
              }}
              style={styles.btn}
            >
              Verify
            </Button>
          </View>
          <Spacer />
          <Spacer />
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
