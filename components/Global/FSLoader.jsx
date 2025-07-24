import React from "react";
import { StyleSheet, View, Modal } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const FSLoader = ({ visible = true }) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={MD2Colors.primary}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FSLoader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    padding: 20,
    // backgroundColor: "white",
    borderRadius: 10,
  },
});
