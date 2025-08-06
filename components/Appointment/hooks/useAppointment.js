import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services";
import moment from "moment";

const useAppointment = (serviceID) => {
  const [timeslots, setTimeslots] = useState([]);

  const {
    data: availableDates,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["slots", serviceID],
    queryFn: () => getDateSlots(serviceID),
    staleTime: 5000,
  });

  const getTimeSlots = async (selectedDate) => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    console.log("Formatted date:", formattedDate);

    try {
      const res = await api.get(`/time`, {
        params: {
          ServiceType: serviceID,
          Date: formattedDate,
        },
      });
      console.log("res timeslots", res.data);
    } catch (error) {
      console.error(`Error fetching time slots`);
    }
  };

  return { availableDates, isFetching, error, getTimeSlots };
};

export default useAppointment;

const getDateSlots = async (serviceTypeID) => {
  try {
    const res = await api.get(`/date?ServiceType=${serviceTypeID}`);
    console.log("date slots", res.data);
    return res.data;
  } catch (error) {
    console.error(`Error fetching date slots: ${serviceTypeID}`, error);
    return [];
  }
};
