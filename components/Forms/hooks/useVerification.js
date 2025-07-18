import api from "../../../services";
import moment from "moment";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slices/auth-slice";
const useVerification = () => {
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
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Verification Failed",
          textBody:
            "We couldn't verify your record. Please double-check your information.",
          button: "Close",
        });

        return;
      }
      dispatch(setUser({ user: res.data.data[0] }));
      console.log("user", res.data.data[0]);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Verification Successful",
        textBody:
          "Your information has been verified successfully. You may now proceed to the next step.",
        button: "Continue",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace("/home");
    } catch (error) {
      console.log(error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Something went wrong",
        textBody: "Please try again later.",
        button: "Close",
      });
    }
  };

  return { handleVerify };
};

export default useVerification;
