import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Text as PaperText } from "react-native-paper";
import React from "react";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";
import { Avatar, Button, Card } from "react-native-paper";
import Banner from "../../assets/banner.jpg";
import Subtitle from "../../components/Subtitle";
import Consultation from "../../assets/image/consult.png";
import Records from "../../assets/image/medical-record.png";
import Health from "../../assets/image/haelth.png";
import Appointment from "../../assets/image/calendar.png";
import Profile from "../../assets/image/account.png";
import ServiceItem from "./../../components/Services/ServiceItem";
import BlankImg from "../../assets/image/blank.png";

const ITEMS = Array.from({ length: 2 }).map((_, index) => index + 1);

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const Home = () => {
  return (
    <SafeView safe={true}>
      <Header />

      <View style={styles.container}>
        <Card.Cover source={Banner} />
      </View>

      <Subtitle label={`Services`} style={{ marginVertical: 15 }} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1 }}
      >
        <View style={styles.serviceContainer}>
          <ServiceItem
            onClick={() => console.log("service item")}
            label="Consultation"
            icon={Consultation}
          />
          <ServiceItem
            onClick={() => console.log("Records")}
            label="Medical Records"
            icon={Health}
          />
          <ServiceItem
            onClick={() => console.log("Records")}
            label="Appointment"
            icon={Appointment}
          />
          <ServiceItem
            onClick={() => console.log("Profile")}
            label="Profile"
            icon={Profile}
          />
          {ITEMS.map((i) => (
            <Card key={i} style={styles.card}>
              <Card.Cover source={BlankImg} />
            </Card>
          ))}
        </View>
      </ScrollView>
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
