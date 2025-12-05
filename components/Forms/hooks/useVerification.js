import api from "../../../services";
import moment from "moment";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setUser, setScanQR } from "../../../store/slices/auth-slice";
import { storeUser } from "../../../libs/utils";
import { useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import { useRef } from "react";

const useVerification = (toggleShowVerify, toggleShowQr) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { scannedQR } = useSelector((state) => state.auth);

  const handleVerify = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

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
        Toast.error("Login Failed.", "top");

        return;
      }
      storeUser(res.data.data);
      dispatch(setUser({ user: res.data.data }));
      console.log("user", res.data.data);
      Toast.success("Logged in successfully.", "top");
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.replace("/(dashboard)/home");
    } catch (error) {
      console.log(error);
      Toast.error("Login Failed.", "top");
    }
  };

  const isProcessing = useRef(false);
  const lastScannedCode = useRef(null);

  const handleSearch = async (pn) => {
    if (isProcessing.current) {
      return;
    }

    if (lastScannedCode.current === pn) {
      console.log("Same QR code, ignoring...");
      return;
    }

    isProcessing.current = true;
    lastScannedCode.current = pn;
    console.log("patt", pn);

    try {
      const res = await api.get("/search", {
        params: {
          patientno: pn,
        },
      });
      console.log("api res :", res.data);
      if (res.data.data.length === 0) {
        Toast.error("We couldn't verify your QR Code.", "top");
        lastScannedCode.current = null;
        return;
      }
      console.log("qred", res.data.data[0]);
      Toast.success("QR Code verified successfully.", "top");
      await new Promise((resolve) => setTimeout(resolve, 500));
      toggleShowQr(false);
      toggleShowVerify(true);
      dispatch(setScanQR({ qr: pn }));
    } catch (error) {
      console.log(error);
      Toast.error("We couldn't verify your QR Code.", "top");
      lastScannedCode.current = null;
    } finally {
      isProcessing.current = false;
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
        Toast.error("Verification Failed.", "top");

        return;
      }
      storeUser(res.data.data);
      dispatch(setUser({ user: res.data.data }));
      console.log("user", res.data.data);
      Toast.success("Logged in successfully.", "top");
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.replace("/(dashboard)/home");
    } catch (error) {
      console.log(error);
      Toast.error("Verification Failed.", "top");
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
