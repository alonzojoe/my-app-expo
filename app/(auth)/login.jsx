import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Colors } from "../../constants/Colors";
import ThemedButton from "../../components/ThemedButton";

const Login = () => {
  const handleSubmit = () => {
    console.log("logged");
  };

  return (
    <View>
      <Text>Login</Text>
      <ThemedButton label="Submit" onClick={handleSubmit} />
      <Link href="/register">Register Instead</Link>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
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
