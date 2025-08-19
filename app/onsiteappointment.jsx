import { StyleSheet, View } from "react-native";
import React from "react";
import SafeView from "../components/SafeView";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormInfo from "../components/Appointment/components/FormInfo";
import OnlineForm from "../components/Appointment/components/OnlineForm";
const OnsiteAppointment = () => {
  const { bottom } = useSafeAreaInsets();

  const handleSubmit = async (formData) => {
    console.log(formData);
  };

  return (
    <SafeView>
      <ScrollView style={{ marginBottom: bottom }}>
        <View style={styles.container}>
          <FormInfo
            content={`Reminder: Please type the reason for your consultation below. Provide clear and detailed information (e.g., description of the main concern, details of symptoms, other illnesses, available laboratory and imaging results, and any previous consultations if any) to ensure your appointment is properly scheduled and to avoid inconvenience or delays. Thank you very much.`}
          />
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
