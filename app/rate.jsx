import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "../components/SafeView";
import { Card, Text as PaperText, Button, TextInput } from "react-native-paper";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
const OnlineAppointment = () => {
  const { bottom } = useSafeAreaInsets();
  const color = Colors["light"];

  return (
    <SafeView>
      <ScrollView style={{ marginBottom: bottom }}>
        <View style={styles.container}>
          <PaperText
            variant="titleMedium"
            style={{ fontWeight: "400", fontSize: 20, textAlign: "center" }}
          >
            Share us your experience!
          </PaperText>

          <View
            style={{
              marginTop: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <AntDesign name="star" size={30} color="#FFCC00" />
            <AntDesign name="star" size={30} color="#FFCC00" />
            <AntDesign name="star" size={30} color="#FFCC00" />
            <AntDesign name="star" size={30} color="#C0C0C0" />
            <AntDesign name="star" size={30} color="#C0C0C0" />
          </View>
          <View style={{ paddingHorizontal: 15, marginTop: 15 }} mult>
            <TextInput multiline={true} label="Feedback" />
          </View>
          <View style={styles.textGroup}>
            <Button
              mode="contained"
              onPress={() => {
                console.log("test");
              }}
              style={styles.btn}
            >
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default OnlineAppointment;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 18,
  },
  headerItem: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  textGroup: {
    paddingHorizontal: 15,
    marginTop: 15,
    alignItems: "center",
  },
  btn: {
    width: "100%",
    marginVertical: 12,
  },
});
