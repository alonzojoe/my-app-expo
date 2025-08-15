import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { Portal, Modal, Text as PaperText, Button } from "react-native-paper";
import WheelPicker from "@quidone/react-native-wheel-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const WheelPopUp = ({ show, onToggle, timeslots, onSelect }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const chooseDate = () => {
    onSelect(selectedTime);
  };

  return (
    <Portal>
      <Modal
        visible={show}
        onDismiss={() => onToggle(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <PaperText
              variant="titleMedium"
              style={{ color: "#001C63", fontWeight: "bold" }}
            >
              Select Time of Schedule
            </PaperText>
          </View>
          <ScrollView>
            <View
              style={{
                marginTop: 10,
                // backgroundColor: "#001C63",
                // borderRadius: 10,
                padding: 1.5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <View style={{ paddingHorizontal: 5 }}>
                <MaterialIcons
                  style={{ marginVertical: 5 }}
                  name="swipe-vertical"
                  size={60}
                  color="#FFF"
                />
              </View>
              <WheelPicker
                data={timeslots}
                value={selectedTime}
                onValueChanged={({ item: { value } }) => setSelectedTime(value)}
                enableScrollByTapOnItem={true}
                style={{
                  backgroundColor: "#FFF",
                  height: 100,
                  borderRadius: 9,
                  borderColor: "#001C63",
                  flex: 1,
                  flexShrink: 0,
                }}
                overlayItemStyle={{
                  backgroundColor: "#001C63",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
                itemHeight={50}
                visibleItemCount={3}
              />
              <View style={{ paddingHorizontal: 5 }}>
                <MaterialIcons
                  style={{ marginVertical: 5 }}
                  name="swipe-vertical"
                  size={60}
                  color="#001C63"
                />
              </View>
            </View>
          </ScrollView>
          <View style={{ marginVertical: 10 }} />
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            {/* <Button
              width={120}
              icon="close"
              mode="contained"
              onPress={() => onToggle(false)}
              style={{
                color: "#fff",
                backgroundColor: "#DD3254",
              }}
            >
              Close
            </Button> */}
            <Button
              width={120}
              icon="check"
              mode="contained"
              onPress={chooseDate}
              style={{
                color: "#fff",
                backgroundColor: "#001C63",
              }}
            >
              Select
            </Button>
          </View>
        </>
      </Modal>
    </Portal>
  );
};

export default WheelPopUp;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 18,
  },
  modalContainer: {
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: "white",
    padding: 20,
  },
});
