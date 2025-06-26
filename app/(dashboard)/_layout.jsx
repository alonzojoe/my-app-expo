import { StyleSheet, StatusBar, Stack, useColorScheme } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { name } from "./../../node_modules/ajv/dist/compile/codegen/code";

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
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "create" : "create-outline"}
                color={focused ? theme.iconColourFocused : theme.iconColour}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="todos"
          options={{
            title: "Todos",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "list" : "list-outline"}
                color={focused ? theme.iconColourFocused : theme.iconColour}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "person" : "person-outline"}
                color={focused ? theme.iconColourFocused : theme.iconColour}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default DashboardLayout;

const styles = StyleSheet.create({});
