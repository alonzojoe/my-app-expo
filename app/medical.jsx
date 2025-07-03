import { StyleSheet, Text, View } from "react-native";
import React, { useState, useMemo } from "react";
import SafeView from "../components/SafeView";
import { Searchbar, List, Avatar, Card, IconButton } from "react-native-paper";
import { FAQS } from "../constants/global";
import FaqItem from "../components/Faq/FaqItem";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Medical = () => {
  const { bottom } = useSafeAreaInsets;
  return (
    <SafeView safe={true}>
      <ScrollView style={{ paddingBottom: bottom }}>
        <Text>Medical Records</Text>
      </ScrollView>
    </SafeView>
  );
};

export default Medical;

const styles = StyleSheet.create({});
