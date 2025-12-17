import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../../../services/Medical/apiCalls";
import { useSelector } from "react-redux";
import { useFocusEffect } from "expo-router";
import moment from "moment";

const useAppointmentLists = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [refreshing, setRefreshing] = useState(false);
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
    refetchOnMount: "always",
  });

  useFocusEffect(
    useCallback(() => {
      handleRefresh();
      console.log("effect");
    }, [refetch])
  );

  const FILTERED_APPOINTMENTS = useMemo(() => {
    const now = moment();
    if (!APPOINTMENTS_LISTS || APPOINTMENTS_LISTS.length === 0) return [];

    return APPOINTMENTS_LISTS.filter((appointment) => {
      const appointmentDateTime = moment(
        `${appointment.datesked} ${appointment.timeformat}`,
        "YYYY-MM-DD HH:mm:ss"
      );

      if (activeTab === "Upcoming") {
        return appointmentDateTime.isSameOrAfter(now);
      } else {
        return appointmentDateTime.isBefore(now);
      }
    }).map((appointment) => ({
      ...appointment,
      isPast: activeTab !== "Upcoming",
    }));
  }, [APPOINTMENTS_LISTS, activeTab]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return {
    activeTab,
    setActiveTab,
    refreshing,
    isFetching,
    error,
    FILTERED_APPOINTMENTS,
    handleRefresh,
  };
};

export default useAppointmentLists;
