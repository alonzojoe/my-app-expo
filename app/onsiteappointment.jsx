import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import SafeView from "../components/SafeView";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormInfo from "../components/Appointment/components/FormInfo";
import EskedForm from "../components/Appointment/components/EskedForm";
import * as WebBrowser from "expo-web-browser";
const OnsiteAppointment = () => {
  const { bottom } = useSafeAreaInsets();

  const handleSubmit = async (formData) => {
    console.log(formData);
  };

  const viewServices = async () => {
    await WebBrowser.openBrowserAsync(
      "https://online.jblmgh.info/portal/#/services"
    );
  };

  return (
    <SafeView>
      <ScrollView style={{ marginBottom: bottom }}>
        <View style={styles.container}>
          <FormInfo
            content={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>FACE TO FACE KONSULTA: </Text>

                <TouchableOpacity onPress={viewServices}>
                  <Text style={{ color: "blue" }}>SERVICES SCHEDULE</Text>
                </TouchableOpacity>
              </View>
            }
          />
          <EskedForm />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default OnsiteAppointment;

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
