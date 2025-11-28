import { StyleSheet, View, Image, Text } from "react-native";
import React from "react";
import BlueF from "../../assets/image/bluef.jpg";
import QRCode from "react-native-qrcode-svg";
import useBluecardInfo from "../../hooks/features/useBluecardInfo";

const BlueCardDetails = () => {
  const PatientInfo = useBluecardInfo();
  const [cardSize, setCardSize] = React.useState({ width: 0, height: 0 });

  return (
    <View
      style={styles.imgcontainer}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setCardSize({
          width: parseFloat(width).toFixed(2),
          height: parseFloat(height).toFixed(2),
        });
      }}
    >
      <View style={styles.cardContainer}>
        <Image source={BlueF} style={styles.cardImage} />
        <View style={styles.overlayContainer}>
          <QRCode value={PatientInfo.qrcontent} size={80} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.patientno}>{PatientInfo.patientno}</Text>
          <Text style={styles.name}>{PatientInfo.name}</Text>
          <Text style={styles.bday}>{PatientInfo.birthdate}</Text>
          <Text style={styles.address}>{PatientInfo.address}</Text>
          <Text style={styles.gender}>{PatientInfo.gender}</Text>
          <Text style={styles.civil}>{PatientInfo.civilstatus}</Text>
          <Text style={styles.issued}>
            {PatientInfo.dateissued}-{JSON.stringify(cardSize)}
          </Text>
        </View>
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
    top: "3%",
    right: "2%",
    zIndex: 10,
    backgroundColor: "white",
    padding: 4,
    borderRadius: 4,
  },
  textContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  patientno: {
    position: "absolute",
    bottom: "58%",
    left: "19.5%",
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  name: {
    position: "absolute",
    bottom: "42.5%",
    left: "21%",
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  bday: {
    position: "absolute",
    bottom: "34%",
    left: "21%",
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  address: {
    position: "absolute",
    bottom: "26%",
    left: "21%",
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  gender: {
    position: "absolute",
    bottom: "18%",
    left: "21%",
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  civil: {
    position: "absolute",
    bottom: "10%",
    left: "21%",
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  issued: {
    position: "absolute",
    bottom: "1.5%",
    left: "21%",
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
});
