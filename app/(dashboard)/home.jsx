import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Text as PaperText } from "react-native-paper";
import React from "react";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";
import { Avatar, Button, Card } from "react-native-paper";
import Banner from "../../assets/banner.jpg";
import Subtitle from "../../components/Subtitle";
import Consultation from "../../assets/image/consult.png";

const ITEMS = Array.from({ length: 6 }).map((_, index) => index + 1);

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
          {/* <Pressable
            style={styles.press}
            onPress={() => console.log("clicked")}
          > */}
          <Card
            onPress={({ pressed }) => console.log("card")}
            style={[styles.cardIcon, { padding: 0 }]}
          >
            <Card.Content style={styles.cardContent}>
              <Avatar.Image size={120} source={Consultation} />
              <PaperText variant="bodyMedium" style={{ fontWeight: "bold" }}>
                Consultation
              </PaperText>
            </Card.Content>
          </Card>
          {/* </Pressable> */}
          {ITEMS.map((i) => (
            <Card key={i} style={styles.card}>
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
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
