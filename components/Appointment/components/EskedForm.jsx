import { StyleSheet, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Button,
  Text as PaperText,
  ActivityIndicator,
} from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";
import WheelPopUp from "./WheelPopUp";
import useAppointment from "../hooks/useAppointment";
import useEskedAppointment from "../hooks/useEskedAppointment";
import useToggle from "../../../hooks/useToggle";
import FSLoader from "../../../components/Global/FSLoader";
import moment from "moment";
import ToastManager, { Toast } from "toastify-react-native";
import dayjs from "dayjs";

const EskedForm = ({ onSubmit }) => {
  const defaultStyles = useDefaultStyles();

  const { holidays, isFetching, error } = useEskedAppointment();

  console.log("holidays");

  const [selected, setSelected] = useState();

  useEffect(() => {
    console.log("selected date effect", selected);
  }, [selected]);

  const handleSelectDate = (selectedDate) => {
    const formatted = dayjs(selectedDate).format("YYYY-MM-DD");
    setSelected(formatted);
    console.log("Selected date:", formatted);
  };

  const collateData = () => {
    const appointmentData = {
      selected,
    };

    if (!selected) {
      return Toast.error("Please select date of schedule.", "top");
    }

    console.log("appointment data", appointmentData);

    // onSubmit(appointmentData);
  };

  return (
    <>
      <>
        {isFetching && <FSLoader />}
        <ToastManager />
        <View style={styles.headerItem}>
          <FontAwesome5 name="briefcase-medical" size={24} color="#001C63" />
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
          items={[{ label: "eSKED - TBD", value: 212 }]}
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
        <Card style={{ marginTop: 10, backgroundColor: "#001C63", padding: 1 }}>
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
              handleSelectDate(date);
            }}
            styles={{
              ...defaultStyles,
              today: { borderColor: "#001C63", borderWidth: 1 },
              selected: { backgroundColor: "#001C63" },
              selected_label: { color: "white" },
            }}
            disabledDates={(date) => {
              const d = dayjs(date).startOf("day");
              const today = dayjs().startOf("day");

              const isPast = d.isBefore(today, "day");

              const isWeekend = [0, 6].includes(d.day());

              const isHoliday = holidays?.some((h) =>
                dayjs(h).isSame(d, "day")
              );

              return isPast || isWeekend || isHoliday;
            }}
          />
        </Card>
      </>
      <>
        <View style={[styles.textGroup, { marginTop: 10 }]}>
          <Button
            mode="contained"
            onPress={collateData}
            style={styles.btn}
            disabled={isFetching}
          >
            Proceed
          </Button>
        </View>
      </>
    </>
  );
};

export default EskedForm;

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
  activityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textGroup: {
    alignItems: "center",
  },
  btn: {
    width: "100%",
    marginVertical: 12,
  },
});
