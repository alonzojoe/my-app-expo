import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
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

const Schedule = () => {
  const [confirmation, toggleConfirmation] = useToggle(false);

  const showDialog = () => toggleConfirmation(true);

  const hideDialog = () => toggleConfirmation(false);
  return (
    <SafeView safe={true}>
      <Header />
      <TabSwitcher />
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
            <ListItem
              onCancel={showDialog}
              key={a.id}
              service={a.service}
              appointment={a.appointment}
            />
          ))}
        </View>
      )}

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

    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    textAlign: "center",
  },
});
