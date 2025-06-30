import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";
import {
  Text as PaperText,
  List,
  Divider,
  IconButton,
} from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Schedule = () => {
  return (
    <SafeView safe={true}>
      <Header />
      <View style={styles.container}>
        <List.Item
          title="Pediatrics"
          description="July 21, 2025 10:00 AM"
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
          right={(props) => (
            <FontAwesome
              onPress={() => console.log("cancel")}
              name="times"
              size={24}
              color="#DD3353"
            />
          )}
        />
        <Divider />
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
