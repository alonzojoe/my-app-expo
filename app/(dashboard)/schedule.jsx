import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useMemo } from "react";
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
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";
import TabSwitcher from "../../components/Global/Shared/TabSwitcher";
import AppointmentItem from "../../components/Appointment/AppointmentItem";
import BottomSheet from "../../components/Shared/BottomSheet";
import ConfirmDialog from "../../components/Shared/ConfirmDialog";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../../services/Medical/apiCalls";
import { useSelector } from "react-redux";
import ErrorWithRefetch from "../../components/Global/ErrorWithRefetch";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { extractBeforeDash } from "../../libs/utils";
import moment from "moment";
const Schedule = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [selected, setSelected] = useState(null);
  const bottomSheetRef = useRef(null);
  const { bottom } = useSafeAreaInsets;
  const { authUser } = useSelector((state) => state.auth);

  const PatientNo = authUser?.PatientNo;

  const {
    data: APPOINTMENTS_LISTS,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["appointments", PatientNo],
    queryFn: () => getAppointments(PatientNo),
  });

  console.log("appointemnts", APPOINTMENTS);

  const handleCancel = (item) => {
    setSelected(item);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const closeDialog = () => {
    bottomSheetRef?.current?.collapse();
  };

  const FILTERED_APPOINTMENTS = useMemo(() => {
    const now = moment();
    if (FILTERED_APPOINTMENTS?.length === 0) return [];
    return APPOINTMENTS_LISTS?.filter((appointment) => {
      const appointmentDateTime = moment(
        `${appointment.datesked} ${appointment.timeformat}`,
        "YYYY-MM-DD HH:mm:ss"
      );
      if (activeTab === "Upcoming") {
        return appointmentDateTime.isSameOrAfter(now);
      } else {
        return appointmentDateTime.isBefore(now);
      }
    });
  }, [APPOINTMENTS_LISTS, activeTab]);

  return (
    <SafeView safe={true}>
      <Header />
      <TabSwitcher activeTab={activeTab} onSelect={setActiveTab} />

      {error ? (
        <ScrollView style={{ paddingBottom: bottom }}>
          <ErrorWithRefetch refresh={() => refetch()} />
        </ScrollView>
      ) : (
        <FlatList
          style={{ marginHorizontal: 0, marginBottom: 100 }}
          data={FILTERED_APPOINTMENTS}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <AppointmentItem
              sched={item}
              key={item.id}
              service={extractBeforeDash(item.servicedesc)}
              appointment={`${item.formatted_date} ${item.timedesc}`}
              onPress={() => handleCancel(item)}
            />
          )}
          ListHeaderComponent={
            <View
              style={{
                marginHorizontal: 0,
                paddingHorizontal: 0,
                width: "100%",
              }}
            ></View>
          }
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingBottom: 200,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
          ListEmptyComponent={
            isFetching ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 15,
                }}
              >
                <ActivityIndicator
                  animating={true}
                  size="large"
                  color={MD2Colors.primary}
                />
              </View>
            ) : (
              <View style={{ padding: 20, alignItems: "center" }}>
                <PaperText style={{ color: "#999" }}>
                  No scheduled appointments found
                </PaperText>
              </View>
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={refetch}
              tintColor="#007AFF"
              colors={["#007AFF"]}
            />
          }
        />
      )}

      <BottomSheet
        ref={bottomSheetRef}
        enableScroll={false}
        snapPoints={["45%", "60%", "80%"]}
      >
        <ConfirmDialog
          refetch={refetch}
          selected={selected}
          onCancel={closeDialog}
        />
      </BottomSheet>
    </SafeView>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,
    flexDirection: "column",

    paddingBottom: 200,

    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    textAlign: "center",
  },
});
