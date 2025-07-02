import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "../../components/SafeView";
import {
  Avatar,
  Card,
  List,
  Divider,
  Text as PaperText,
} from "react-native-paper";

import { PROFILEITEMS } from "./../../constants/ProfileItems";
import ProfileItem from "./../../components/Profile/ProfileItem";
import ProfileImg from "../../assets/image/Default_pfp.jpg";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const Profile = () => {
  return (
    <>
      <SafeView safe={true}>
        <View style={styles.container}>
          {/* <Card
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={LeftContent}
            />
            <Card.Content>
              <PaperText variant="titleLarge">Card title</PaperText>
              <PaperText variant="bodyMedium">Card content</PaperText>
            </Card.Content>
          </Card> */}
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Avatar.Image size={90} source={ProfileImg} />
            <View style={{ alignItems: "center" }}>
              <PaperText
                variant="headlineSmall"
                style={{ fontWeight: "bold", color: "#091D63" }}
              >
                Joe Alonzo
              </PaperText>
              <PaperText
                variant="bodyMedium"
                style={{ fontWeight: "bold", color: "#6E7AA3" }}
              >
                Patient
              </PaperText>
            </View>
          </View>
          <View>
            <List.Item
              title="000590599"
              left={(props) => <List.Icon {...props} icon="card" />}
            />
            <List.Item
              title="095632145896"
              left={(props) => <List.Icon {...props} icon="phone" />}
            />
          </View>
          <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
            <Divider />
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
