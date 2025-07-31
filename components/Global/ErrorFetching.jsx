import { StyleSheet, View } from "react-native";
import { Text as PaperText } from "react-native-paper";
import React from "react";

const ErrorFetching = ({
  weight = "normal",
  color = "#FF2245",
  size = 20,
  mt = 20,
  children,
}) => {
  return (
    <View
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: mt,
        padding: 15,
      }}
    >
      <PaperText
        variant="bodyLarge"
        style={{
          fontWeight: weight,
          fontSize: size,
          color: color,
        }}
      >
        {children}
      </PaperText>
    </View>
  );
};

export default ErrorFetching;

const styles = StyleSheet.create({});
