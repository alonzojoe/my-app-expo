// Button.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ label, onPress, type = "primary" }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "secondary" ? styles.secondary : styles.primary,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.label,
          type === "secondary" ? styles.secondaryLabel : styles.primaryLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primary: {
    backgroundColor: "#FF5A5F",
  },
  secondary: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryLabel: {
    color: "#fff",
  },
  secondaryLabel: {
    color: "#333",
  },
});
