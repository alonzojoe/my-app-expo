import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import SafeView from "../components/SafeView";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormInfo from "../components/Appointment/components/FormInfo";
import EskedForm from "../components/Appointment/components/EskedForm";
import BottomSheet from "../components/Shared/BottomSheet";
import * as WebBrowser from "expo-web-browser";
import EskedFormData from "../components/Appointment/components/EskedFormData";

const OnsiteAppointment = () => {
  const [appointmentData, setAppointmentData] = useState(null);
  const bottomSheetRef = useRef(null);
  const { bottom } = useSafeAreaInsets();

  const viewServices = async () => {
    await WebBrowser.openBrowserAsync(
      "https://online.jblmgh.info/portal/#/services"
    );
  };

  const handleSubmit = async (formData) => {
    console.log("test");
    console.log(formData);
    setAppointmentData(formData);
    handleProceed();
  };

  const handleProceed = () => {
    bottomSheetRef.current?.snapToIndex(2);
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
          <EskedForm onSubmit={handleSubmit} />
        </View>
      </ScrollView>
      <BottomSheet
        snapPoints={["30%", "60%", "80%"]}
        ref={bottomSheetRef}
        enableScroll={true}
      >
        <View>
          <EskedFormData data={appointmentData} />
        </View>
      </BottomSheet>
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
