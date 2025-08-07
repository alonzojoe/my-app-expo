import { StyleSheet, View, Image, Text } from "react-native";
import React from "react";
import BlueF from "../../assets/image/bluef.jpg";

const BlueCardDetails = () => {
  return (
    <View style={styles.imgcontainer}>
      <View style={styles.cardContainer}>
        <Image source={BlueF} style={styles.cardImage} />

        <Text style={styles.name}>DEANG, DELIA DIZON</Text>
        <Text style={styles.bday}>March 14, 1938</Text>
        <Text style={styles.address}>
          501 DOLORES, CITY OF SAN FERNANDO PAMPANGA
        </Text>
        <Text style={styles.gender}>FEMALE</Text>
        <Text style={styles.civil}>MARRIED</Text>
        <Text style={styles.issued}>-</Text>
      </View>
    </View>
  );
};

export default BlueCardDetails;

const styles = StyleSheet.create({
  imgcontainer: {
    marginTop: 5,
  },
  cardContainer: {
    position: "relative",
    width: "90%",
    aspectRatio: 1.6,
    alignSelf: "center",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  // overlayView: {
  //   position: "absolute",
  //   bottom: 60,
  //   left: 65,
  //   right: 10,
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
  //   // backgroundColor: "transparent",
  //   padding: 10,
  //   borderRadius: 8,
  // },
  name: {
    position: "absolute",
    bottom: 93,
    left: 70,
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  bday: {
    position: "absolute",
    bottom: 74,
    left: 70,
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  address: {
    position: "absolute",
    bottom: 60,
    left: 70,
    color: "black",
    fontSize: 10,
    fontWeight: "bold",
  },
  gender: {
    position: "absolute",
    bottom: 40,
    left: 70,
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  civil: {
    position: "absolute",
    bottom: 21,
    left: 70,
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  issued: {
    position: "absolute",
    bottom: 4,
    left: 70,
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
});
