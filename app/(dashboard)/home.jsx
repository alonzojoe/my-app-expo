import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";

const Home = () => {
  return (
    <SafeView safe={true} style={styles.container}>
      <Header />
      <Text style={styles.title}>Home</Text>
    </SafeView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
