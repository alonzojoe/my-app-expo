import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Text as PaperText } from "react-native-paper";
import React from "react";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";
import { Avatar, Button, Card } from "react-native-paper";
import Banner from "../../assets/banner.jpg";
import Subtitle from "../../components/Subtitle";

const ITEMS = Array.from({ length: 6 }).map((_, index) => index + 1);

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const Home = () => {
  return (
    <SafeView safe={true}>
      <Header />

      <View style={styles.container}>
        <Card.Cover source={Banner} />
      </View>

      <Subtitle
        label={`Services: ${ITEMS.length}`}
        style={{ marginVertical: 15 }}
      />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1 }}
      >
        <View style={styles.serviceContainer}>
          {ITEMS.map((i) => (
            <Card key={i} style={styles.card}>
              {/* <Card.Title
                title="Card Title"
                subtitle="Card Subtitle"
                left={LeftContent}
              /> */}
              {/* <Card.Content>
                <PaperText variant="titleLarge">Card title</PaperText>
                <PaperText variant="bodyMedium">Card content</PaperText>
              </Card.Content> */}
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
              {/* <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions> */}
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
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
