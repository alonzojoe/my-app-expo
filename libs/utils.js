import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
};
