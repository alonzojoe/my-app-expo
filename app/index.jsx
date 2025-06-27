import { StyleSheet, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import ReactLogo from "../assets/image/react.png";
import AppLogo from "../assets/image/applogo.png";
import { useState, Fragment } from "react";
import SafeView from "../components/SafeView";
import { Badge } from "react-native-paper";
import { Text as PaperText } from "react-native-paper";
import { TextInput } from "react-native-paper";
import Spacer from "../components/Spacer";
import { Background } from "./../node_modules/@react-navigation/elements/lib/module/Background";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

const Auth = () => {
  const [visible, setVisible] = useState(true);
  const [show, setShow] = useState(false);
  const router = useRouter();
  return (
    <SafeView safe={true} style={styles.container}>
      <Spacer />
      <Spacer />
      <View style={styles.textGroup}>
        <Image source={AppLogo} style={[styles.img, styles.textGroup]} />
      </View>
      <View style={styles.textGroup}>
        <PaperText variant="headlineMedium">Welcome back!</PaperText>
        <PaperText variant="titleMedium">Login your account</PaperText>
      </View>
      <View style={styles.textGroup}>
        <TextInput
          keyboardType="numeric"
          type="number"
          label="Hospital No. eg .000446853"
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
            router.replace("/profile");
          }}
          style={styles.btn}
        >
          Login
        </Button>
      </View>
      <View style={styles.textCreate}>
        <Link href="/" style={styles.create}>
          Create an account
        </Link>
      </View>
      {/* <Text style={styles.title}>Auth</Text>
      <Text>Rendering Items</Text>
      <Link
        href="/login"
        style={{
          color: "blue",
          marginVertical: 10,
          cursor: "pointer",
        }}
      >
        Login
      </Link>
      <Link
        href="/register"
        style={{
          color: "blue",
          marginVertical: 10,
          cursor: "pointer",
        }}
      >
        Register
      </Link>
      <Link
        href="/profile"
        style={{
          color: "blue",
          marginVertical: 10,
          cursor: "pointer",
        }}
      >
        Profile
      </Link> */}
    </SafeView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",

    // backgroundColor: "#fff",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  img: {
    height: 100,
    width: 100,
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
    color: "black",
    textDecorationLine: "underline",
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
    fontSize: 16,
  },
});
