import { StyleSheet, Stack, useColorScheme } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import ToastManager from "toastify-react-native/components/ToastManager";
const DashboardLayout = () => {
  const colorScheme = useColorScheme();

  const theme = Colors["light"];

  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          title: "",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.navBackground,
            // backgroundColor: '#D1E1E2',
            // paddingTop: 5,
            paddingVertical: 10,
            height: 105,
          },
          tabBarActiveTintColor: theme.iconColourFocused,
          tabBarInactiveTintColor: theme.iconColour,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "home" : "home-outline"}
                color={focused ? theme.iconColourFocused : theme.iconColour}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="schedule"
          options={{
            title: "Appointment",
            tabBarStyle: { display: "none" },
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "calendar" : "calendar-outline"}
                color={focused ? theme.iconColourFocused : theme.iconColour}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: "Map",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "map" : "map-outline"}
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
      <ToastManager />
    </>
  );
};

export default DashboardLayout;

const styles = StyleSheet.create({});
