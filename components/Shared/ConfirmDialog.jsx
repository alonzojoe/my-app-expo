// ConfirmDialogContent.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";

export default function ConfirmDialogContent({ onCancel, onConfirm }) {
  return (
    <View style={styles.container}>
      {/* Icon or visual indicator */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>!</Text>
        </View>
      </View>

      <Text style={styles.title}>Cancel Appointment?</Text>

      <Text style={styles.message}>
        Are you sure you want to cancel your scheduled appointment? This action
        cannot be undone.
      </Text>

      <View style={styles.buttonContainer}>
        <Button label="No, Keep it" type="secondary" onPress={onCancel} />
        <Button label="Yes, Cancel" type="primary" onPress={onConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 8,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFE5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 32,
    color: "#FF5A5F",
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 12,
  },
  message: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 28,
    color: "#6E7AA3",
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
});
