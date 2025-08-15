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
import WheelPicker from "@quidone/react-native-wheel-picker";
import useAppointment from "../components/Appointment/hooks/useAppointment";
import FormInfo from "../components/Appointment/components/FormInfo";
import OnlineForm from "../components/Appointment/components/OnlineForm";
const OnlineAppointment = () => {
  const { bottom } = useSafeAreaInsets();
  const [items, setItems] = useState([{ label: "TELEHEALTH", value: 212 }]);
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState();
  const color = Colors["light"];
  const { isFetching, availableDates, getTimeSlots, timeslots } =
    useAppointment(212);

  console.log("avail", availableDates);

  console.log("time slots", timeslots);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(0);
  const data = [...Array(100).keys()].map((index) => ({
    value: index,
    label: index.toString(),
  }));

  return (
    <SafeView>
      <ScrollView style={{ marginBottom: bottom }}>
        <View style={styles.container}>
          <FormInfo
            content={`ONLINE KONSULTA: (ENT, FAMILY MEDICINE, GERIATRICS, IM NEPHROLOGY-DIALYSIS, INTERNAL MEDICINE, OBGYNE, OPHTHALMOLOGY, ORTHOPEDICS, PEDIATRICS, SURGERY)`}
          />
          <OnlineForm />
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
