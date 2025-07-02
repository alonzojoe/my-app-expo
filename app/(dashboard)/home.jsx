import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import {
  Text as PaperText,
  Card,
  Modal,
  Portal,
  Button,
  IconButton,
  Avatar,
  Divider,
} from "react-native-paper";
import React from "react";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";
import Banner from "../../assets/banner.jpg";
import Subtitle from "../../components/Subtitle";
import ServiceItem from "./../../components/Services/ServiceItem";
import BlankImg from "../../assets/image/blank.png";
import { MENUS } from "../../constants/Menus";
import Spacer from "../../components/Spacer";
import useToggle from "../../hooks/useToggle";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
const ITEMS = Array.from({ length: 2 }).map((_, index) => index + 1);

const Home = () => {
  const [show, toggleShow] = useToggle(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const showConsultation = () => {
    toggleShow(true);
  };

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
          {MENUS.map((menu) => (
            <ServiceItem
              key={menu.id}
              onClick={menu.id != 1 ? menu.fn : showConsultation}
              label={menu.name}
              icon={menu.Icon}
            />
          ))}
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          {/* {ITEMS.map((i) => (
            <Card key={i} style={styles.card}>
              <Card.Cover source={BlankImg} />
            </Card>
          ))} */}
        </View>
      </ScrollView>
      <Portal>
        <Modal
          visible={show}
          onDismiss={() => toggleShow(false)}
          contentContainerStyle={containerStyle}
        >
          <>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PaperText variant="titleMedium">
                SELECT APPOINTMENT TYPE
              </PaperText>
            </View>
            <View style={{ marginVertical: 10 }} />
            <View>
              <Card
                onPress={() => console.log("online")}
                style={{ backgroundColor: "#0066ED" }}
              >
                <Card.Title
                  titleStyle={{ color: "#fff" }}
                  subtitleStyle={{ color: "#fff" }}
                  title="ONLINE CONSULTATION"
                  subtitle="(OK-OPD)"
                  left={(props) => (
                    <View
                      style={{
                        backgroundColor: "#FFF",
                        borderRadius: 24,
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome
                        name="video-camera"
                        size={24}
                        color="#0066ED"
                      />
                    </View>
                  )}
                />
              </Card>
            </View>
            <View style={{ marginVertical: 10 }} />
            <View>
              <Card
                onPress={() => console.log("face to face")}
                style={{ backgroundColor: "#3CA4E6" }}
              >
                <Card.Title
                  titleStyle={{ color: "#fff" }}
                  subtitleStyle={{ color: "#fff" }}
                  title="FACE TO FACE CONSULTATION"
                  subtitle="(OPD APPOINTMENT)"
                  left={(props) => (
                    <View
                      style={{
                        backgroundColor: "#FFF",
                        borderRadius: 24,
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome5
                        name="head-side-mask"
                        size={24}
                        color="#3CA4E6"
                      />
                    </View>
                  )}
                />
              </Card>
            </View>
            <View style={{ marginVertical: 10 }} />
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                alignContent: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                width={120}
                icon="close"
                mode="contained"
                onPress={() => toggleShow(false)}
                style={{
                  color: "#fff",
                  backgroundColor: "#DD3254",
                }}
              >
                Cancel
              </Button>
            </View>
          </>
        </Modal>
      </Portal>
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
