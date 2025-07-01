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
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
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
        </View>
      </SafeView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
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
