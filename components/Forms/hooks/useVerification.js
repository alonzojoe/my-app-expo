import api from "../../../services";
import moment from "moment";

const useVerification = () => {
  const handleVerify = async (formData) => {
    try {
      const res = await api.get("/verify", {
        params: {
          ...formData,
          birthdate: moment(formData.birthdate, "MM/DD/YYYY").format(
            "YYYY-MM-DD"
          ),
        },
      });
      console.log("api res :", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleVerify };
};

export default useVerification;
