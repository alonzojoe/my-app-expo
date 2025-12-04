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
import useToggle from "../../../hooks/useToggle";
import FSLoader from "../../../components/Global/FSLoader";
import moment from "moment";
import ToastManager, { Toast } from "toastify-react-native";

const OnlineForm = ({ onSubmit }) => {
  const defaultStyles = useDefaultStyles();
  const { isFetching, availableDates, getTimeSlots, timeslots, isLoading } =
    useAppointment(212);
  const [selected, setSelected] = useState();

  const [value, setValue] = useState(null);
  const [popUp, togglePopUp] = useToggle(false);

  useEffect(() => {
    if (availableDates?.length > 0) {
      const firstDay = availableDates[0]?.datesched;

      handleSelectDate(firstDay);
    }
  }, [availableDates]);

  useEffect(() => {
    console.log("selected date effect", selected);
    console.log("value", value);
  }, [selected, value]);

  const handleChooseTime = (selectedTime) => {
    setValue(selectedTime);
    togglePopUp(false);
  };

  const handleSelectDate = (date) => {
    setSelected(date);
    getTimeSlots(date);
    setValue(null);
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

    if (!selectedSlot || !value) {
      return Toast.error("Please select time of schedule.", "top");
    }

    console.log("selected date & time slot", selectedSlot);
    onSubmit(appointmentData);
  };

  console.log("timeslots", timeslots);

  const lightModeStyles = {
    backgroundColor: "#FFF",
    borderColor: "#001C63",
    selectedBackgroundColor: "#001C63",
    selectedTextColor: "white",
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
              backgroundColor: lightModeStyles.backgroundColor,
              borderRadius: 10,
              borderColor: lightModeStyles.borderColor,
              border: 1,
            }}
            mode="single"
            date={selected}
            onChange={({ date }) => {
              handleSelectDate(date);
            }}
            styles={{
              ...defaultStyles,
              today: {
                borderColor: lightModeStyles.borderColor,
                borderWidth: 1,
              },
              selected: {
                backgroundColor: lightModeStyles.selectedBackgroundColor,
              },
              selected_label: { color: lightModeStyles.selectedTextColor },
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
              Toast.error("Please select a date with available slots.", "top");
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
