import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "../../components/SafeView";

const Todos = () => {
  return (
    <SafeView style={styles.container}>
      <Text style={styles.title}>Todos</Text>
    </SafeView>
  );
};

export default Todos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
