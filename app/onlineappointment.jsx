import { StyleSheet, View } from "react-native";
import React from "react";
import SafeView from "../components/SafeView";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormInfo from "../components/Appointment/components/FormInfo";
import OnlineForm from "../components/Appointment/components/OnlineForm";
const OnlineAppointment = () => {
  const { bottom } = useSafeAreaInsets();

  const handleSubmit = async (formData) => {
    console.log(formData);
  };

  return (
    <SafeView>
      <ScrollView style={{ marginBottom: bottom }}>
        <View style={styles.container}>
          <FormInfo
            content={`ONLINE KONSULTA: (ENT, FAMILY MEDICINE, GERIATRICS, IM NEPHROLOGY-DIALYSIS, INTERNAL MEDICINE, OBGYNE, OPHTHALMOLOGY, ORTHOPEDICS, PEDIATRICS, SURGERY)`}
          />
          <OnlineForm onSubmit={handleSubmit} />
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
