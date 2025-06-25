import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Colors } from "../../constants/Colors";

const Login = () => {
  return (
    <View>
      <Text>Login</Text>
      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      >
        Click me!
      </Pressable>
      <Link href="/register">Register Instead</Link>
    </View>
  );
};

export default Login;

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
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.5,
  },
});
