import { StyleSheet } from "react-native";
import React from "react";
import { Card, Text as PaperText, Avatar } from "react-native-paper";

const ServiceItem = ({ onClick, label, icon }) => {
  return (
    <Card onPress={onClick} style={[styles.cardIcon, { padding: 0 }]}>
      <Card.Content style={styles.cardContent}>
        <Avatar.Image size={120} source={icon} />
        <PaperText variant="bodyMedium" style={{ fontWeight: "bold" }}>
          {label}
        </PaperText>
      </Card.Content>
    </Card>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,

    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  serviceContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "space-between", // or 'center' or 'space-around'
    paddingHorizontal: 0,
    paddingBottom: 100,
  },
  card: {
    width: "48%",
  },
  cardIcon: {
    width: "48%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  press: {
    width: "48%",
    backgroundColor: "red",
    padding: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  pressed: {
    opacity: 0.5,
  },
});
