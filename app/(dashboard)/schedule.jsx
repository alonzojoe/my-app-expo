import { StyleSheet, Text, View } from "react-native";
import React, { useState, useRef } from "react";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";
import ListItem from "../../components/Appointment/ListItem";
import { APPOINTMENTS } from "../../constants/Appointments";
import useToggle from "./../../hooks/useToggle";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text as PaperText,
} from "react-native-paper";
import TabSwitcher from "../../components/Global/Shared/TabSwitcher";
import AppointmentItem from "../../components/Appointment/AppointmentItem";
import BottomSheet from "../../components/Shared/BottomSheet";
import ConfirmDialog from "../../components/Shared/ConfirmDialog";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../../services/Medical/apiCalls";
import { useSelector } from "react-redux";

const Schedule = () => {
  const [confirmation, toggleConfirmation] = useToggle(false);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const bottomSheetRef = useRef(null);

  const { authUser } = useSelector((state) => state.auth);

  const PatientNo = authUser?.PatientNo;

  const {
    data: APPOINTMENTS_LISTS,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["appointments", PatientNo],
    queryFn: () => getAppointments(PatientNo),
  });

  console.log("appointemnts", APPOINTMENTS);

  const showDialog = () => toggleConfirmation(true);

  const hideDialog = () => toggleConfirmation(false);

  const handleCancel = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  return (
    <SafeView safe={true}>
      <Header />
      <TabSwitcher activeTab={activeTab} onSelect={setActiveTab} />
      {APPOINTMENTS.length === 0 ? (
        <>
          <View style={{ marginTop: 10 }}>
            <PaperText
              variant="titleMedium"
              style={{ textAlign: "center", color: "#FF2245" }}
            >
              You don’t have any upcoming appointments at this time.
            </PaperText>
          </View>
        </>
      ) : (
        <View style={styles.container}>
          {APPOINTMENTS.map((a) => (
            <AppointmentItem
              key={a.id}
              service={a.service}
              appointment={a.appointment}
              onCancel={showDialog}
              onPress={handleCancel}
            />
          ))}
        </View>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        enableScroll={false}
        snapPoints={["45%", "60%", "80%"]}
      >
        <ConfirmDialog />
      </BottomSheet>

      <Portal>
        <Dialog visible={confirmation} onDismiss={hideDialog}>
          <Dialog.Icon icon="alert" />
          <Dialog.Title style={styles.title}>Confirmation</Dialog.Title>
          <Dialog.Content>
            <PaperText variant="bodyMedium" style={{ textAlign: "center" }}>
              Are you sure to cancel your appointment?
            </PaperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} textColor="#DD3353">
              Cancel
            </Button>
            <Button onPress={hideDialog} textColor="#007BFF">
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeView>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,
    flexDirection: "column",

    paddingBottom: 200,

    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    textAlign: "center",
  },
});
