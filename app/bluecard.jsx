import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import SafeView from "../components/SafeView";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BlueF from "../assets/image/bluef.jpg";
import BlueB from "../assets/image/blueb.jpg";
import Spacer from "../components/Spacer";
const BlueCard = () => {
  const { bottom } = useSafeAreaInsets;

  return (
    <SafeView>
      <ScrollView style={{ paddingBottom: bottom }}>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Image source={BlueF} style={styles.cardImage} />
          </View>
          <Spacer height={20} />
          <View style={styles.cardContainer}>
            <Image source={BlueB} style={styles.cardImage} />
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default BlueCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
    marginBottom: 5,
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
