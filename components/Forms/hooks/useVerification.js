import api from "../../../services";
import moment from "moment";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setUser, setScanQR } from "../../../store/slices/auth-slice";
import { useState } from "react";
import { ToastMessage } from "../../../libs/utils";
import { storeUser } from "../../../libs/utils";
import { useSelector } from "react-redux";
const tm = new ToastMessage();

const useVerification = (toggleShowVerify, toggleShowQr) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { scannedQR } = useSelector((state) => state.auth);

  const handleVerify = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const res = await api.get("/verify/v2", {
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
      storeUser(res.data.data);
      dispatch(setUser({ user: res.data.data }));
      console.log("user", res.data.data);
      tm.toast(
        "SUCCESS",
        "Verification Successful",
        "Your information has been verified successfully."
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace("/(dashboard)/home");
    } catch (error) {
      console.log(error);
      tm.toast("DANGER", "Something went wrong", "Please try again later.");
    }
  };

  const handleSearch = async (pn) => {
    console.log("patt", pn);
    try {
      const res = await api.get("/search", {
        params: {
          patientno: pn,
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
      toggleShowQr(false);
      toggleShowVerify(true);
      dispatch(setScanQR({ qr: pn }));
    } catch (error) {
      console.log(error);
      tm.toast("DANGER", "Something went wrong", "Please try again later.");
    }
  };

  const verifyQRData = async (bday) => {
    try {
      const res = await api.get("/verifybday/v2", {
        params: {
          patientno: scannedQR,
          birthdate: moment(bday, "MM/DD/YYYY").format("YYYY-MM-DD"),
        },
      });
      console.log("api res :", res.data);
      if (res.data.data.length === 0) {
        tm.toast(
          "DANGER",
          "Verification Failed",
          "We couldn't verify your record. Please double-check your birthdate."
        );

        return;
      }
      storeUser(res.data.data);
      dispatch(setUser({ user: res.data.data }));
      console.log("user", res.data.data);
      tm.toast(
        "SUCCESS",
        "Verification Successful",
        "Your information has been verified successfully. You may now proceed to the next step."
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace("/(dashboard)/home");
    } catch (error) {
      console.log(error);
      tm.toast("DANGER", "Something went wrong", "Please try again later.");
    }
  };

  const scanQR = async (data) => {
    console.log("unsanitized", data);
    const sanitizedData = data.toString().includes("-")
      ? data.toString().split("-")[1]
      : data.toString();
    console.log("sanitized", sanitizedData);
    await handleSearch(sanitizedData);
  };

  return { handleVerify, scanQR, verifyQRData };
};

export default useVerification;
