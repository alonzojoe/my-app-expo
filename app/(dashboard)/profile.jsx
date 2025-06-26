import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "../../components/SafeView";
import { StatusBar } from "expo-status-bar";
const Profile = () => {
  return (
    <>
      <StatusBar style="auto" />
      <SafeView safe={true} style={styles.container}>
        <Text style={styles.title}>Profile</Text>
      </SafeView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
