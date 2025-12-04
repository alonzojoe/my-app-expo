import { useQuery } from "@tanstack/react-query";
import apiopd from "../../../services/opd";

const useEskedAppointment = () => {
  const {
    data: holidays,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["holidays"],
    queryFn: () => getDateSlots(),
    staleTime: 5000,
  });

  return {
    holidays,
    isFetching,
    error,
  };
};

export default useEskedAppointment;

const getDateSlots = async () => {
  try {
    const res = await apiopd.get(`/holidays`);
    console.log("holidays dates", res.data.data);
    return res.data.data;
  } catch (error) {
    Toast.error("Please try again later.", "top");
    return [];
  }
};
