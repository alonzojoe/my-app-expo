import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "../components/SafeView";
import { Card, Text as PaperText } from "react-native-paper";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
const OnlineAppointment = () => {
  const { bottom } = useSafeAreaInsets();
  const color = Colors["light"];

  return (
    <SafeView>
      <ScrollView style={{ marginBottom: bottom }}>
        <View style={styles.container}>
          <Card style={{ backgroundColor: "#E6F0FF" }}>
            <Card.Content>
              <PaperText variant="bodyMedium">Rate</PaperText>
            </Card.Content>
          </Card>
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
    alignItems: "center",
  },
  btn: {
    width: "100%",
    marginVertical: 12,
  },
});
