import { StyleSheet, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import ReactLogo from "../assets/image/react.png";
import React from "react";

const Auth = () => {
  return (
    <View style={styles.container}>
      <Image source={ReactLogo} style={styles.img} />
      <Text style={styles.title}>Auth</Text>
      <Text>Rendering Items</Text>
      <Link
        href="/login"
        style={{
          color: "blue",
          marginVertical: 10,
          cursor: "pointer",
        }}
      >
        Login
      </Link>
      <Link
        href="/register"
        style={{
          color: "blue",
          marginVertical: 10,
          cursor: "pointer",
        }}
      >
        Register
      </Link>
    </View>
  );
};

export default Auth;

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
  img: {
    height: 50,
    width: 50,
    marginVertical: 20,
  },
});
