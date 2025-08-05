import { StyleSheet, View, Image } from "react-native";
import { Link } from "expo-router";
import AppLogo from "../assets/lingadcare.png";
import SafeView from "../components/SafeView";
import { Text as PaperText } from "react-native-paper";
import Spacer from "../components/Spacer";
import { Button } from "react-native-paper";
import VerificationForm from "../components/Forms/VerificationForm";
import { AlertNotificationRoot } from "react-native-alert-notification";
import QRPopup from "../components/QR/QRPopup";
import QRVerify from "../components/QR/QRVerify";
import useToggle from "../hooks/useToggle";
import useAuthentication from "../hooks/useAuthentication";
import FSLoader from "../components/Global/FSLoader";
import useVerification from "../components/Forms/hooks/useVerification";
import useNetInfo from "../hooks/useNetInfo";
const Auth = () => {
  const hasNet = useNetInfo();
  const [showQr, toggleShowQr] = useToggle(false);
  const [showVerify, toggleShowVerify] = useToggle(false);
  const { isLoading } = useAuthentication();
  const { scanQR } = useVerification(toggleShowVerify, toggleShowQr);

  if (isLoading) return <FSLoader />;

  return (
    <SafeView safe={true} style={styles.container}>
      <AlertNotificationRoot theme="dark" style={{ marginVertical: 20 }}>
        <Spacer />
        <View style={styles.textGroup}>
          <Image source={AppLogo} style={[styles.img, styles.textGroup]} />
        </View>
        <View style={styles.textGroup}>
          <PaperText variant="headlineMedium" style={{ color: "#001C63" }}>
            Welcome back!
          </PaperText>
          <PaperText
            variant="titleMedium"
            style={{ color: "#48444E", marginBottom: 10 }}
          >
            Login your account
          </PaperText>
        </View>
        <View style={{ marginHorizontal: 40 }}>
          <VerificationForm />
          <QRPopup onScan={scanQR} show={showQr} toggleQR={toggleShowQr} />
          <QRVerify show={showVerify} toggleQR={toggleShowVerify} />
        </View>
        <View style={styles.textCreate}>
          <Link href="/nointernet" style={styles.create}>
            OR
          </Link>
        </View>
        <View style={styles.textGroup}>
          <Button
            icon="qrcode"
            mode="contained"
            onPress={() => toggleShowQr(true)}
            style={[styles.btn, { backgroundColor: "#3A71FA", marginTop: 18 }]}
          >
            Login using QR
          </Button>
        </View>
      </AlertNotificationRoot>
    </SafeView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",

    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  img: {
    height: 100,
    width: 250,
    marginVertical: 20,
  },
  textGroup: {
    alignItems: "center",
  },
  textForgot: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "80%",
    alignSelf: "center",
    marginVertical: 10,
  },
  forgot: {
    textDecorationLine: "underline",
    color: "#48444E",
  },
  input: {
    width: "80%",
    marginVertical: 8,
  },
  btn: {
    width: "80%",
    marginVertical: 12,
  },
  textCreate: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
    marginTop: 0,
  },
  create: {
    // color: "white",
    marginTop: 10,
    fontSize: 16,
    color: "#001C63",
  },
});
