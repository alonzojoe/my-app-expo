import api from "../../../services";
import moment from "moment";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slices/auth-slice";
import { useState } from "react";
import { ToastMessage } from "../../../libs/utils";
import { storeUser } from "../../../libs/utils";
const tm = new ToastMessage();

const useVerification = () => {
  const [patientNo, setPatientNo] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleVerify = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
      if (res.data.data.length === 0) {
        tm.toast(
          "DANGER",
          "Verification Failed",
          "We couldn't verify your record. Please double-check your information."
        );

        return;
      }
      storeUser(res.data.data[0]);
      dispatch(setUser({ user: res.data.data[0] }));
      console.log("user", res.data.data[0]);
      tm.toast(
        "SUCCESS",
        "Verification Successful",
        "Your information has been verified successfully. You may now proceed to the next step."
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace("/home");
    } catch (error) {
      console.log(error);
      tm.toast("DANGER", "Something went wrong", "Please try again later.");
    }
  };

  const handleSearch = async (patientNo) => {
    try {
      const res = await api.get("/search", {
        params: {
          patientno: patientNo,
        },
      });
      console.log("api res :", res.data);
      if (res.data.data.length === 0) {
        tm.toast(
          "DANGER",
          "Verification Failed",
          "We couldn't verify your QR Code."
        );
        return;
      }
      console.log("qred", res.data.data[0]);
      tm.toast(
        "SUCCESS",
        "Verification Successful",
        "QR Code has been verified successfully. You may now proceed to verification."
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace("/home");
    } catch (error) {
      console.log(error);
      tm.toast("DANGER", "Something went wrong", "Please try again later.");
    }
  };

  const scanQR = async (data) => {
    console.log(data);
    const sanitizedData = data.split("-")[1];

    setPatientNo(sanitizedData);
    await handleSearch(sanitizedData);
  };

  return { patientNo, handleVerify, scanQR };
};

export default useVerification;
