import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import moment from "moment";

const router = useRouter();
export class ToastMessage {
  toast(type, title, body) {
    Toast.show({
      type: ALERT_TYPE[type],
      title,
      textBody: body,
      button: "Close",
    });
  }
}

export const storeUser = async (userData) => {
  let storedUser = null;
  try {
    storedUser = await AsyncStorage.setItem(
      "auth-user",
      JSON.stringify(userData)
    );
  } catch (error) {
    console.log(`Error while storing data: ${error || error?.message}`);
    storedUser = null;
  }

  return storeUser;
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem("auth-user");
  // alert("logged out");
  router.replace("/");
};

export const formatName = (name) => {
  if (!name) return "";
  return `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`;
};

export const formatDate = (val) => {
  return moment(val).format("LL");
};
