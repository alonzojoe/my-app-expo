import { StyleSheet, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import ReactLogo from "../assets/image/react.png";
import AppLogo from "../assets/image/applogo.png";
import { useState, Fragment } from "react";
import SafeView from "../components/SafeView";
import { Badge } from "react-native-paper";
import { Text as PaperText } from "react-native-paper";
import { TextInput } from "react-native-paper";

const Auth = () => {
  const [visible, setVisible] = useState(true);
  return (
    <SafeView safe={true} style={styles.container}>
      <Image source={AppLogo} style={styles.img} />
      <View style={styles.textGroup}>
        <PaperText variant="headlineMedium">Welcome back!</PaperText>
        <PaperText variant="titleMedium">Login your account</PaperText>
      </View>
      <View style={styles.textGroup}>
        <TextInput label="Hospital No." mode="outlined" style={styles.input} />
        <TextInput label="Password" mode="outlined" style={styles.input} />
      </View>
      <Image source={AppLogo} style={styles.img} />

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

    backgroundColor: "#0545AD",
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
  input: {
    width: "80%",
    marginVertical: 8,
  },
});
