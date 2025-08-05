import { useState } from "react";
import { apiopd } from "../../../services";
import { useQuery } from "@tanstack/react-query";
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
    const res = await apiopd.get(`/date?ServiceType=${serviceTypeID}`);
    console.log("date slots", res.data);
    return res.data;
  } catch (error) {
    console.log("error");
  }
};
