import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text as PaperText } from "react-native-paper";

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const tabs = ["Upcoming", "Past"];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <PaperText
              style={[styles.tabText, isActive && styles.activeTabText]}
            >
              {tab}
            </PaperText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabSwitcher;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    padding: 4,
    marginVertical: 15,
    marginHorizontal: 18,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 50,
  },
  activeTab: {
    backgroundColor: "#F6F7FB",
  },
  tabText: {
    color: "#23233D",
    fontWeight: "500",
  },
  activeTabText: {
    fontWeight: "700",
  },
});
