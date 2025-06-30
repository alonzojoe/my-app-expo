import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";
import ListItem from "../../components/Appointment/ListItem";
import { APPOINTMENTS } from "../../constants/Appointments";

const Schedule = () => {
  return (
    <SafeView safe={true}>
      <Header />
      <View style={styles.container}>
        {APPOINTMENTS.map((a) => (
          <ListItem
            key={a.id}
            service={a.service}
            appointment={a.appointment}
          />
        ))}
      </View>
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
});
