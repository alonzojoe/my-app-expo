import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import af from "dayjs/locale/af";
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
  try {
    await AsyncStorage.setItem("auth-user", JSON.stringify(userData));
  } catch (error) {
    console.log(`Error while storing data: ${error || error?.message}`);
  }
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem("auth-user");
};
