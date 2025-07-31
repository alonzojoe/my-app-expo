import { StyleSheet, Text, View } from "react-native";
import { Button, Text as PaperText } from "react-native-paper";
import React from "react";

const ErrorWithRefetch = ({ refresh }) => {
  return (
    <View
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
      }}
    >
      <PaperText
        variant="bodyLarge"
        style={{
          fontWeight: "bold",
          fontSize: 20,
          color: "#FF2245",
          marginTop: 20,
        }}
      >
        Something went wrong
      </PaperText>
      <Button
        width={120}
        icon="refresh"
        mode="contained"
        onPress={refresh}
        style={{
          marginTop: 20,
          color: "#fff",
          backgroundColor: "#001C63",
        }}
      >
        Refresh
      </Button>
    </View>
  );
};

export default ErrorWithRefetch;

const styles = StyleSheet.create({});
