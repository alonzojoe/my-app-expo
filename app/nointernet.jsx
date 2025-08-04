import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Text as PaperText, Button } from "react-native-paper";
import SafeView from "../components/SafeView";
import Spacer from "../components/Spacer";
import Cloud from "../assets/net.png";
import { reloadAsync } from "expo-updates";

const nointernet = () => {
  const handleReload = async () => {
    console.log("clicked");
    try {
      await reloadAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeView safe={true} style={styles.container}>
      <Spacer />
      <Spacer />
      <View style={styles.textGroup}>
        <Image source={Cloud} style={[styles.img, styles.textGroup]} />
      </View>
      <View style={styles.net}>
        <PaperText
          style={{ fontWeight: "bold", color: "#7D7D7D" }}
          variant="displayMedium"
        >
          Ooops!
        </PaperText>
        <View>
          <PaperText
            style={{
              fontWeight: "normal",
              color: "#7D7D7D",
              textAlign: "center",
            }}
            variant="bodyLarge"
          >
            No internet connection found
          </PaperText>
          <PaperText
            style={{
              fontWeight: "normal",
              color: "#7D7D7D",
              textAlign: "center",
            }}
            variant="bodyLarge"
          >
            Check your connection
          </PaperText>
        </View>
      </View>
      <Spacer />
      <Spacer />
      <View style={styles.btnGroup}>
        <Button
          icon="refresh"
          mode="contained"
          onPress={handleReload}
          style={styles.btn}
          labelStyle={styles.btnLabel}
        >
          Try Again
        </Button>
      </View>
    </SafeView>
  );
};

export default nointernet;

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
    height: 200,
    width: 200,
    marginVertical: 30,
  },
  textGroup: {
    alignItems: "center",
  },
  btnGroup: {
    marginHorizontal: 50,
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
    width: "100%",
    marginVertical: 12,
  },
  btnLabel: {
    color: "white",
    fontWeight: "normal",
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
  net: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
