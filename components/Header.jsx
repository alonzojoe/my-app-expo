import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text as PaperText } from "react-native-paper";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Header = () => {
  return (
    <View style={styles.container}>
      <View>
        <PaperText
          variant="bodyLarge"
          style={{ fontWeight: "bold", color: "#2F344E" }}
        >
          Hello 👋🏻
        </PaperText>
        <PaperText
          variant="headlineSmall"
          style={{ fontWeight: "bold", color: "#2F344E" }}
        >
          Joenell Alonzo
        </PaperText>
      </View>

      <View>
        <FontAwesome size={35} name={"user-circle"} color={"#2F344E"} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 16,
  },
});
