import { StyleSheet, View, Image, Text } from "react-native";
import React from "react";
import BlueF from "../../assets/image/bluef.jpg";
import QRCode from "react-native-qrcode-svg";

const BlueCardDetails = () => {
  return (
    <View style={styles.imgcontainer}>
      <View style={styles.cardContainer}>
        <Image source={BlueF} style={styles.cardImage} />
        <View style={styles.overlayContainer}>
          <QRCode value="01352296" size={80} />
        </View>
        <Text style={styles.patientno}>01352296</Text>
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
  overlayContainer: {
    position: "absolute",
    top: 7,
    right: 7,
    zIndex: 10,
    backgroundColor: "white", // optional: add contrast
    padding: 4,
    borderRadius: 4,
  },
  name: {
    position: "absolute",
    bottom: 94,
    left: 70,
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  bday: {
    position: "absolute",
    bottom: 75,
    left: 70,
    color: "black",
    fontSize: 13,
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
    bottom: 41,
    left: 70,
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  civil: {
    position: "absolute",
    bottom: 22,
    left: 70,
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  issued: {
    position: "absolute",
    bottom: 4,
    left: 70,
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  patientno: {
    position: "absolute",
    bottom: 128,
    left: 67,
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  qr: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 99999,
  },
});
