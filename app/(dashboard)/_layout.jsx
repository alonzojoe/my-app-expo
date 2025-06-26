import { StyleSheet, StatusBar, Stack } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const DashboardLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerTitle: "",
        }}
      />
    </>
  );
};

export default DashboardLayout;

const styles = StyleSheet.create({});
