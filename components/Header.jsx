import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text as PaperText } from "react-native-paper";
import React from "react";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const Header = () => {
  return (
    <>
      <View>
        <PaperText variant="headlineMedium">Welcome back!</PaperText>
        <PaperText variant="titleMedium">Login your account</PaperText>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
