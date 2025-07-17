import { StyleSheet, View } from "react-native";
import React from "react";
import SafeView from "../components/SafeView";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import VerificationForm from "../components/Forms/VerificationForm";
import { AlertNotificationRoot } from "react-native-alert-notification";

const Registration = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <AlertNotificationRoot theme="dark">
      <SafeView>
        <ScrollView style={{ marginBottom: bottom }}>
          <View style={styles.container}>
            <VerificationForm />
          </View>
        </ScrollView>
      </SafeView>
    </AlertNotificationRoot>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  topHeaderItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});
