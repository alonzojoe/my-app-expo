import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";
import {
  Avatar,
  Button,
  Card,
  Text as PaperText,
  List,
  Divider,
  MD3Colors,
  IconButton,
} from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const Schedule = () => {
  return (
    <SafeView safe={true}>
      <Header />
      <View style={styles.container}>
        <List.Item
          title="First Item"
          description="Item description"
          left={(props) => (
            <View
              style={{
                backgroundColor: "#e0e0e0",
                borderRadius: 24,
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                icon="calendar"
                size={25}
                iconColor="black"
                style={{ margin: 0 }}
              />
            </View>
          )}
          right={(props) => <List.Icon {...props} icon="" />}
        />
        <Divider />
        {/* <Card>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
          />
          <Card.Content>
            <PaperText variant="titleLarge">Card title</PaperText>
            <PaperText variant="bodyMedium">Card content</PaperText>
          </Card.Content>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card> */}
      </View>
    </SafeView>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,

    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
