import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Portal, Modal, Text as PaperText, Button } from "react-native-paper";
import QRScanner from "./QRScanner";
const QRPopup = ({ show, toggleQR, onScan }) => {
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
            <PaperText variant="titleMedium" style={{ color: "#001C63" }}>
              SCAN YOUR BLUE CARD QR CODE
            </PaperText>
          </View>
          <ScrollView>
            <QRScanner onScan={onScan} />
          </ScrollView>
          <View style={{ marginVertical: 10 }} />
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
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

export default QRPopup;

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
