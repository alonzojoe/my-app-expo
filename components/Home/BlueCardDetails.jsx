import { StyleSheet, View, Image } from "react-native";
import React from "react";
import BlueF from "../../assets/image/bluef.jpg";

const BlueCardDetails = () => {
  return (
    <View style={styles.imgcontainer}>
      <View style={styles.cardContainer}>
        <Image source={BlueF} style={styles.cardImage} />
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
});
