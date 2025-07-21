import { Toast, ALERT_TYPE } from "react-native-alert-notification";

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
