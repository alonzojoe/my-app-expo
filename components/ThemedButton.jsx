import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const ThemedButton = ({ onClick, label }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      onPress={onClick}
    >
      <Text style={{ textAlign: "center", color: "#fff" }}>{label}</Text>
    </Pressable>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    color: "#fff",
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.5,
  },
});
