import { StyleSheet, View, Alert } from "react-native";
import React, { useState } from "react";
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
import useToggle from "../../../hooks/useToggle";
import FSLoader from "../../../components/Global/FSLoader";
import moment from "moment";

const OnlineForm = ({ onSubmit }) => {
  const defaultStyles = useDefaultStyles();
  const { isFetching, availableDates, getTimeSlots, timeslots, isLoading } =
    useAppointment(212);
  const [selected, setSelected] = useState();

  const [value, setValue] = useState(null);
  const [popUp, togglePopUp] = useToggle(false);

  const handleChooseTime = (selectedTime) => {
    setValue(selectedTime);
    togglePopUp(false);
  };

  const collateData = () => {
    const selectedSlot = timeslots.find((s) => s.id === value);

    const appointmentData = {
      serviceId: 212,
      date: moment(selected).format("YYYY-MM-DD"),
      time: value,
      selectedSlot: selectedSlot,
    };

    console.log("appointment data", appointmentData);

    console.log("selected date & time slot", selectedSlot);

    onSubmit(appointmentData);
  };

  return (
    <>
      <>
        {isFetching && <FSLoader />}
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
          items={[{ label: "TELEHEALTH", value: 212 }]}
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
        <View style={styles.activityContainer}>
          <View style={styles.headerItem}>
            <AntDesign name="clockcircle" size={24} color="#001C63" />
            <PaperText
              variant="titleMedium"
              style={{ color: "#001C63", fontWeight: "bold" }}
            >
              Time of Schedule
            </PaperText>
          </View>
          {isLoading && (
            <ActivityIndicator
              style={{ marginTop: 15 }}
              animating={true}
              size={22}
              color="#001C63"
            />
          )}
        </View>
        <DropDownPicker
          style={{ marginTop: 10, borderColor: "#001C63", marginBottom: 5 }}
          items={timeslots}
          open={false}
          value={value}
          setOpen={() => {
            if (timeslots.length === 0) {
              console.error("Please select a date first");
            } else {
              togglePopUp(true);
            }
          }}
          setValue={setValue}
        />
        <View style={styles.textGroup}>
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
      <WheelPopUp
        timeslots={timeslots}
        show={popUp}
        onToggle={togglePopUp}
        onSelect={handleChooseTime}
      />
    </>
  );
};

export default OnlineForm;

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
