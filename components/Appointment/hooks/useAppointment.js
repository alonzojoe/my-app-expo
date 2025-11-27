import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services";
import moment from "moment";

const useAppointment = (serviceID) => {
  const [timeslots, setTimeslots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
      const times =
        res.data.map((d) => ({
          label: moment(d.opdtime, "HH:mm:ss").format("hh:mm A"),
          value: d.id,
          ...d,
        })) ?? [];
      setTimeslots(times);
    } catch (error) {
      console.error(`Error fetching time slots`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    availableDates,
    isFetching,
    error,
    getTimeSlots,
    timeslots,
    isLoading,
  };
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
