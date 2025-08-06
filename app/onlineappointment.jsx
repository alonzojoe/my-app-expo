import { StyleSheet, Text, View } from "react-native";
import React, { useState, useMemo } from "react";
import SafeView from "../components/SafeView";
import {
  Searchbar,
  List,
  Avatar,
  Card,
  IconButton,
  Button,
  Portal,
  Modal,
  Text as PaperText,
} from "react-native-paper";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../constants/Colors";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";

import useAppointment from "../components/Appointment/hooks/useAppointment";
const OnlineAppointment = () => {
  const { bottom } = useSafeAreaInsets();
  const [items, setItems] = useState([{ label: "TELEHEALTH", value: 212 }]);
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState();
  const color = Colors["light"];
  const { isFetching, availableDates, getTimeSlots } = useAppointment(212);

  console.log("avail", availableDates);

  return (
    <SafeView>
      <ScrollView style={{ marginBottom: bottom }}>
        <View style={styles.container}>
          <Card style={{ backgroundColor: "#E6F0FF" }}>
            <Card.Content>
              <PaperText variant="bodyMedium">
                ONLINE KONSULTA: (ENT, FAMILY MEDICINE, GERIATRICS, IM
                NEPHROLOGY-DIALYSIS, INTERNAL MEDICINE, OBGYNE, OPHTHALMOLOGY,
                ORTHOPEDICS, PEDIATRICS, SURGERY)
              </PaperText>
            </Card.Content>
          </Card>
          <>
            <View style={styles.headerItem}>
              <FontAwesome5
                name="briefcase-medical"
                size={24}
                color="#001C63"
              />
              <PaperText
                variant="titleMedium"
                style={{ color: "#001C63", fontWeight: "bold" }}
              >
                Type of Service
              </PaperText>
            </View>
            <DropDownPicker
              style={{ marginTop: 10, borderColor: "#001C63", marginBottom: 5 }}
              value={212}
              items={items}
              setItems={setItems}
              disabled={true}
            />
          </>
          <>
            <View style={styles.headerItem}>
              <FontAwesome5 name="calendar-day" size={24} color="#001C63" />
              <PaperText
                variant="titleMedium"
                style={{ color: "#001C63", fontWeight: "bold" }}
              >
                Date of Schedule
              </PaperText>
            </View>
            <Card
              style={{ marginTop: 10, backgroundColor: "#001C63", padding: 1 }}
            >
              <DateTimePicker
                style={{
                  marginTop: 0,
                  backgroundColor: "#FFF",
                  borderRadius: 10,
                  borderColor: "#001C63",
                  border: 1,
                }}
                mode="single"
                date={selected}
                onChange={({ date }) => {
                  setSelected(date);
                  getTimeSlots(date);
                }}
                styles={{
                  ...defaultStyles,
                  today: { borderColor: "#001C63", borderWidth: 1 },
                  selected: { backgroundColor: "#001C63" },
                  selected_label: { color: "white" },
                }}
                enabledDates={availableDates?.map((d) => d.datesched || [])}
              />
            </Card>
          </>
          <>
            <View style={styles.headerItem}>
              <AntDesign name="clockcircle" size={24} color="#001C63" />
              <PaperText
                variant="titleMedium"
                style={{ color: "#001C63", fontWeight: "bold" }}
              >
                Time of Schedule
              </PaperText>
            </View>
            <DropDownPicker
              style={{ marginTop: 10, borderColor: "#001C63", marginBottom: 5 }}
              value={212}
              items={items}
              setItems={setItems}
              disabled={true}
            />
            <View style={styles.textGroup}>
              <Button
                mode="contained"
                onPress={() => {
                  console.log("test");
                }}
                style={styles.btn}
                disabled={isFetching}
              >
                Create Appointment
              </Button>
            </View>
          </>
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
