import { StyleSheet, StatusBar, Stack, useColorScheme } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";

const DashboardLayout = () => {
  const colorScheme = useColorScheme();

  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <>
      <Tabs
        screenOptions={{
          headerTitle: "",
          tabBarStyle: {
            backgroundColor: theme.navBackground,
            paddingTop: 10,
            height: 90,
          },
          tabBarActiveTintColor: theme.iconColourFocused,
          tabBarInactiveTintColor: theme.iconColour,
        }}
      >
        <Tabs.Screen name="create" options={{ title: "Create" }} />
        <Tabs.Screen name="todos" options={{ title: "Todos" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </>
  );
};

export default DashboardLayout;

const styles = StyleSheet.create({});
