import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "../components/SafeView";

const nointernet = () => {
  return (
    <SafeView safe={true} style={styles.container}>
      <Text>No Internet</Text>
    </SafeView>
  );
};

export default nointernet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",

    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  img: {
    height: 100,
    width: 250,
    marginVertical: 20,
  },
  textGroup: {
    alignItems: "center",
  },
  textForgot: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "80%",
    alignSelf: "center",
    marginVertical: 10,
  },
  forgot: {
    textDecorationLine: "underline",
    color: "#48444E",
  },
  input: {
    width: "80%",
    marginVertical: 8,
  },
  btn: {
    width: "80%",
    marginVertical: 12,
  },
  textCreate: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
    marginTop: 0,
  },
  create: {
    // color: "white",
    marginTop: 10,
    fontSize: 16,
    color: "#001C63",
  },
});
