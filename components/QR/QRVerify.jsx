import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Portal, Modal, Text as PaperText, Button } from "react-native-paper";
import QRScanner from "./QRScanner";
const QRVerify = ({ show, toggleQR }) => {
  return (
    <Portal>
      <Modal
        visible={show}
        onDismiss={() => toggleQR(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <PaperText
              variant="titleMedium"
              style={{ color: "#001C63", textAlign: "center" }}
            >
              VERIFY YOUR DATE OF BIRTH
            </PaperText>
          </View>
          <ScrollView>
            <View>Content Here</View>
          </ScrollView>
          <View style={{ marginVertical: 10 }} />
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Button
              width={120}
              icon="close"
              mode="contained"
              onPress={() => toggleQR(false)}
              style={{
                color: "#fff",
                backgroundColor: "#001C63",
              }}
            >
              Verify
            </Button>
            <Button
              width={120}
              icon="close"
              mode="contained"
              onPress={() => toggleQR(false)}
              style={{
                color: "#fff",
                backgroundColor: "#DD3254",
              }}
            >
              Close
            </Button>
          </View>
        </>
      </Modal>
    </Portal>
  );
};

export default QRVerify;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 18,
  },
  modalContainer: {
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: "white",
    padding: 20,
  },
});
