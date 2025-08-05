import { useState } from "react";
import { apiopd } from "../../../services";
const useAppointment = () => {
  const [availableDates, setAvailableDates] = useState([]);

  const getDateSlots = async () => {
    try {
      const res = await apiopd.get("/date?ServiceType=212");
      console.log("ddddddddd", res.data);
      setAvailableDates(res.data);
    } catch (error) {
      console.log("error");
    }
  };

  return { availableDates, getDateSlots };
};

export default useAppointment;
