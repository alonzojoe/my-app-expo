import { StyleSheet, View, Text } from "react-native";
import React, { useRef, useState } from "react";
import SafeView from "../components/SafeView";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormInfo from "../components/Appointment/components/FormInfo";
import OnlineForm from "../components/Appointment/components/OnlineForm";
import BottomSheet from "../components/Shared/BottomSheet";
import VerificationForm from "../components/Forms/VerificationForm";
import FormData from "../components/Appointment/components/FormData";
const OnlineAppointment = () => {
  const [appointmentData, setAppointmentData] = useState(null);
  const bottomSheetRef = useRef(null);
  const { bottom } = useSafeAreaInsets();

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
            content={`ONLINE KONSULTA: (ENT, FAMILY MEDICINE, GERIATRICS, IM NEPHROLOGY-DIALYSIS, INTERNAL MEDICINE, OBGYNE, OPHTHALMOLOGY, ORTHOPEDICS, PEDIATRICS, SURGERY)`}
          />
          <OnlineForm onSubmit={handleSubmit} />
        </View>
      </ScrollView>
      <BottomSheet
        snapPoints={["30%", "60%", "80%"]}
        ref={bottomSheetRef}
        enableScroll={true}
      >
        <View>
          <FormData data={appointmentData} />
        </View>
      </BottomSheet>
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
