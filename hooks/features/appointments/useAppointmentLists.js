import { useState, useMemo, useCallback } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import {
  createAppointmentQueryOptions,
  createWaitlistedQueryOptions,
} from "./queryOptions/appointmentQueryOptions";
import { getAppointments } from "../../../services/Medical/apiCalls";
import { useSelector } from "react-redux";
import { useFocusEffect } from "expo-router";
import moment from "moment";

const useAppointmentLists = () => {
  const [activeTab, setActiveTab] = useState("Upcoming"); // Upcoming | Past | Pending
  const [refreshing, setRefreshing] = useState(false);
  const { authUser } = useSelector((state) => state.auth);

  const PatientNo = authUser?.PatientNo;

  const [appointments, waitlists] = useQueries({
    queries: [
      createAppointmentQueryOptions(PatientNo),
      createWaitlistedQueryOptions(authUser),
    ],
  });

  const { data: APPOINTMENTS_LISTS, isFetching, error, refetch } = appointments;
  const {
    data: WAITLISTED_LISTS,
    isFetching: isFetchingv2,
    error: error2,
    refetch: refetch2,
  } = waitlists;

  useFocusEffect(
    useCallback(() => {
      handleRefresh();
      console.log("effect");
    }, [refetch])
  );

  const FILTERED_APPOINTMENTS = useMemo(() => {
    const now = moment();

    if (activeTab === "Pending") {
      if (!WAITLISTED_LISTS || WAITLISTED_LISTS.length === 0) return [];

      return WAITLISTED_LISTS.map((data) => ({
        ...data,
        isPending: true,
      }));
    } else {
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
        isPending: false,
      }));
    }
  }, [APPOINTMENTS_LISTS, WAITLISTED_LISTS, activeTab]);

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

    WAITLISTED_LISTS,
    isFetchingv2,
    error2,
    refetch2,
  };
};

export default useAppointmentLists;
