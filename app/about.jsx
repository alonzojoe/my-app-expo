import React from "react";
import { StyleSheet, View, Text } from "react-native";

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Page</Text>
    </View>
  );
};

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
});

export default About;
