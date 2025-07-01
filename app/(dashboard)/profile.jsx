import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "../../components/SafeView";
import {
  Avatar,
  Card,
  Text as PaperText,
  IconButton,
  Button,
  Appbar,
  List,
  Divider,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const Profile = () => {
  return (
    <>
      <SafeView safe={true}>
        {/* <Text style={styles.title}>Profile</Text> */}

        <View style={styles.container}>
          <Card>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={LeftContent}
            />
            <Card.Content>
              <PaperText variant="titleLarge">Card title</PaperText>
              <PaperText variant="bodyMedium">Card content</PaperText>
            </Card.Content>
          </Card>
          <View style={{ paddingHorizontal: 10 }}>
            <>
              <List.Item
                title="Virtual Blue Card"
                titleStyle={{ fontWeight: "bold" }}
                left={(props) => (
                  <FontAwesome name="vcard" size={24} color="black" />
                )}
              />
              <Divider />
            </>
            <>
              <List.Item
                title="Rate this app"
                titleStyle={{ fontWeight: "bold" }}
                left={(props) => (
                  <FontAwesome name="star" size={24} color="black" />
                )}
              />
              <Divider />
            </>
            <>
              <List.Item
                title="Logout"
                titleStyle={{ color: "#FF2245", fontWeight: "bold" }}
                left={(props) => (
                  <FontAwesome name="power-off" size={24} color="#FF2245" />
                )}
              />
              <Divider />
            </>
          </View>
        </View>
      </SafeView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,
    // justifyContent: "center",
  },
  fluid: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
