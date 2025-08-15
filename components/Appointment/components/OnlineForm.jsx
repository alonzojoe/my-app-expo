import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Card, Button, Text as PaperText } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";
import WheelPicker from "@quidone/react-native-wheel-picker";
import useAppointment from "../hooks/useAppointment";

const OnlineForm = ({ onSubmit }) => {
  const [items, setItems] = useState([{ label: "TELEHEALTH", value: 212 }]);
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState();
  const { isFetching, availableDates, getTimeSlots, timeslots } =
    useAppointment(212);

  console.log("avail", availableDates);

  console.log("time slots", timeslots);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <>
      <>
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
        <View style={styles.headerItem}>
          <AntDesign name="clockcircle" size={24} color="#001C63" />
          <PaperText
            variant="titleMedium"
            style={{ color: "#001C63", fontWeight: "bold" }}
          >
            Time of Schedule
          </PaperText>
        </View>
        {/* <View
              style={{
                marginTop: 10,
                backgroundColor: "#001C63",
                borderRadius: 10,
                padding: 1.5,
              }}
            >
              <WheelPicker
                data={timeslots}
                value={value2}
                onValueChanged={({ item: { value } }) => setValue2(value)}
                enableScrollByTapOnItem={true}
                style={{
                  backgroundColor: "#FFF",
                  height: 100,
                  borderRadius: 9,
                  borderColor: "#001C63",
                }}
                overlayItemStyle={{
                  backgroundColor: "#001C63",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
                itemHeight={50}
                visibleItemCount={1}
              />
            </View> */}
        <DropDownPicker
          style={{ marginTop: 10, borderColor: "#001C63", marginBottom: 5 }}
          items={timeslots}
          open={open}
          value={value}
          setOpen={setOpen}
          setValue={setValue}
          disabled={false}
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
  textGroup: {
    alignItems: "center",
  },
  btn: {
    width: "100%",
    marginVertical: 12,
  },
});
