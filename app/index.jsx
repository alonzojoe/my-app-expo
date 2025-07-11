import { StyleSheet, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import ReactLogo from "../assets/image/react.png";
import AppLogo from "../assets/lingadcare.png";
import { useState, Fragment } from "react";
import SafeView from "../components/SafeView";
import { Badge } from "react-native-paper";
import { Text as PaperText } from "react-native-paper";
import { TextInput } from "react-native-paper";
import Spacer from "../components/Spacer";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { Provider } from "react-native-paper";
import { AUTH_USER } from "../constants/global";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/auth-slice";
const Auth = () => {
  const [visible, setVisible] = useState(true);
  const [show, setShow] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  return (
    <SafeView safe={true} style={styles.container}>
      <Spacer />
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
      <View style={styles.textGroup}>
        <TextInput
          keyboardType="numeric"
          type="number"
          label="Hospital No"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          secureTextEntry={!show}
          label="Password"
          mode="outlined"
          style={styles.input}
          right={
            <TextInput.Icon
              icon={!show ? "eye" : "eye-off"}
              onPress={() => setShow((prev) => !prev)}
            />
          }
        />
      </View>
      <View style={styles.textForgot}>
        <Link href="/" style={styles.forgot}>
          Forgot Password
        </Link>
      </View>
      <View style={styles.textGroup}>
        <Button
          icon="login"
          mode="contained"
          onPress={() => {
            dispatch(setUser({ user: AUTH_USER }));
            router.replace("/home");
          }}
          style={styles.btn}
        >
          Login
        </Button>
      </View>
      <View style={styles.textCreate}>
        <Link href="/registration" style={styles.create}>
          Create an account
        </Link>
      </View>
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
    marginTop: 4,
  },
  create: {
    // color: "white",
    marginTop: 10,
    fontSize: 16,
    color: "#001C63",
  },
});
