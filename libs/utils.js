import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
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

export const trimmedName = (desc) => {
  if (!desc) return;
  const formatted = desc.length > 7 ? `${desc.slice(0, 7)}...` : desc;

  return formatted.toUpperCase();
};

const NAS_URL = process.env.EXPO_PUBLIC_NAS_URL;

export const constructURL = async (docPath) => {
  try {
    let formattedPath = docPath.replace(/\\/g, "/");

    const pathSegments = formattedPath.split("/");

    const fileName = encodeURIComponent(pathSegments.pop());

    const encodedPath = [...pathSegments, fileName].join("/");

    const finalURL = `${NAS_URL}${encodedPath}`;

    console.log("Opening URL:", finalURL);

    await WebBrowser.openBrowserAsync(finalURL);
  } catch (error) {
    console.error("Error opening document:", error);
  }
};

export const extractBeforeDash = (str) => {
  if (!str) return "";
  return str.split("-")[0].trim();
};

export const computeAge = (dateString) => {
  const birthDate = moment(dateString, "YYYY-MM-DD", true);

  if (!birthDate.isValid()) {
    throw new Error('Invalid date format. Expected format: "YYYY-MM-DD"');
  }

  return moment().diff(birthDate, "years");
};
