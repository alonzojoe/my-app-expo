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
const Registration = () => {
  const { bottom } = useSafeAreaInsets();
  const [hospitalNo, setHospitalNo] = useState("");
  const [showQr, toggleShowQr] = useToggle(false);
  const color = Colors["light"];

  return (
    <SafeView>
      <ScrollView style={{ marginBottom: bottom }}>
        <View style={styles.container}>
          <>
            <View style={styles.topHeaderItem}>
              <PaperText
                variant="titleMedium"
                style={{
                  color: "#001C63",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                Information Verification
              </PaperText>
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
                  icon={"qrcode"}
                  onPress={() => toggleShowQr(true)}
                />
              }
            />
          </>
          {showQr && <QRScanner onScan={setHospitalNo} />}
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
                Birthdate
              </PaperText>
            </View>
            <TextInput
              keyboardType="numeric"
              type="number"
              label="(DD/MM/YY)"
              mode="outlined"
              mask="[00]/[00]/[00]"
              style={styles.input}
            />
          </>
          <View style={styles.textGroup}>
            <Button
              mode="contained"
              onPress={() => {
                console.log("test");
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
