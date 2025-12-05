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

    onSubmit(appointmentData);
  };

  const forcedLightStyles = {
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    headerTextColor: "#000000",
    monthTitleColor: "#000000",
    dayLabelColor: "#000000",

    selectedBackgroundColor: "#001C63",
    selectedTextColor: "#FFFFFF",

    todayBorderColor: "#001C63",
    todayBorderRadius: 10,
  };

  console.log("default styles", defaultStyles);

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
          items={[{ label: "eSKED", value: 212 }]}
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
            Preferred Date
          </PaperText>
        </View>
        <Card style={{ marginTop: 10, backgroundColor: "#001C63", padding: 1 }}>
          <DateTimePicker
            style={{
              marginTop: 0,
              backgroundColor: forcedLightStyles.backgroundColor,
              borderRadius: 10,
              borderColor: forcedLightStyles.todayBorderColor,
              borderWidth: 0.5,
            }}
            mode="single"
            date={selected}
            onChange={({ date }) => {
              handleSelectDate(date);
            }}
            styles={{
              header: {
                backgroundColor: "white",
                marginVertical: 8,
              },

              button_prev_image: { tintColor: "black" },
              button_next_image: { tintColor: "black" },

              headerTitle: {
                fontSize: 20,
                color: "red",
                fontWeight: "600",
              },

              headerTextContainerStyle: {
                backgroundColor: "white",
                paddingVertical: 8,
              },

              headerTextStyle: {
                fontSize: 20,
                color: forcedLightStyles.textColor,
                fontWeight: "600",
              },

              weekdaysContainer: {
                paddingVertical: 10,
              },
              calendarTextStyle: {
                color: forcedLightStyles.dayLabelColor,
                fontSize: 14,
                fontWeight: "500",
              },

              text: {
                color: forcedLightStyles.textColor,
                fontSize: 15,
              },
              month: {
                color: forcedLightStyles.monthTitleColor,
              },
              year: {
                color: forcedLightStyles.monthTitleColor,
              },

              day: {
                color: forcedLightStyles.textColor,
              },

              day_label: {
                padding: 1.5,
              },

              weekday_label: {
                fontSize: 12,
                marginBottom: 5,
                textTransform: "uppercase",
              },

              month_label: {
                fontSize: 15,
              },

              today: {
                borderColor: forcedLightStyles.todayBorderColor,
                borderWidth: 1,
                borderRadius: 8,
              },

              selected: {
                backgroundColor: forcedLightStyles.selectedBackgroundColor,
                borderRadius: 8,
              },

              selected_label: {
                color: "#FFFFFF",
                fontWeight: "bold",
              },

              selectedItemText: {
                color: "#FFFFFF",
                fontWeight: "bold",
              },

              disabled: {
                opacity: 0.3,
              },

              disabled_text: {
                color: "#999999",
                textDecorationLine: "line-through",
              },

              month_item: {
                backgroundColor: forcedLightStyles.backgroundColor,
                borderRadius: 8,
                borderWidth: 0.5,
                borderColor: forcedLightStyles.todayBorderColor,
              },

              month_item_label: {
                color: forcedLightStyles.textColor,
              },

              selected_month: {
                backgroundColor: forcedLightStyles.selectedBackgroundColor,
                borderRadius: 8,
              },

              selected_month_label: {
                color: "#FFFFFF",
                fontWeight: "bold",
              },

              year_item: {
                backgroundColor: forcedLightStyles.backgroundColor,
                borderRadius: 8,
                borderWidth: 0.5,
                borderColor: forcedLightStyles.todayBorderColor,
                paddingVertical: 6,
              },

              year_item_label: {
                color: forcedLightStyles.textColor,
              },

              selected_year: {
                backgroundColor: forcedLightStyles.selectedBackgroundColor,
                borderRadius: 8,
              },

              selected_year_label: {
                color: "#FFFFFF",
                fontWeight: "bold",
              },
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
