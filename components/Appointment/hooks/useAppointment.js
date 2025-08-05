import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAppointment = (serviceID) => {
  const {
    data: availableDates,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["slots", serviceID],
    queryFn: () => getDateSlots(serviceID),
    staleTime: 5000,
  });

  return { availableDates, isFetching, error };
};

export default useAppointment;

const getDateSlots = async (serviceTypeID) => {
  try {
    const res = await axios.get(
      `${process.env.EXPO_PUBLIC_API_OPD_URL}/date?ServiceType=${serviceTypeID}`
    );
    console.log("date slots", res.data);
    return res.data.data;
  } catch (error) {
    console.error(`Error fetching date slots: ${serviceTypeID}`, error);
    return [];
  }
};
