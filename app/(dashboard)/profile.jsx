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
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { PROFILEITEMS } from "./../../constants/ProfileItems";
import ProfileItem from "./../../components/Profile/ProfileItem";
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
            {PROFILEITEMS.map((prof) => (
              <ProfileItem
                key={prof.id}
                label={prof.label}
                color={prof.color}
                onPress={prof.onPress}
                Icon={prof.Icon}
                iconName={prof.iconName}
              />
            ))}
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
