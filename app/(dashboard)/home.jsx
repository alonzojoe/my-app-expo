import { StyleSheet, Text, View } from "react-native";
import { Text as PaperText } from "react-native-paper";
import React from "react";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";
import { Avatar, Button, Card } from "react-native-paper";
import Banner from "../../assets/banner.jpg";
import Subtitle from "../../components/Subtitle";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const Home = () => {
  return (
    <SafeView safe={true}>
      <Header />

      <View style={styles.container}>
        <Card.Cover source={Banner} />
      </View>

      <Subtitle label="Services" />
    </SafeView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,

    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
