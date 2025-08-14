import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text as PaperText } from "react-native-paper";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { formatName } from "../libs/utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const Header = () => {
  const router = useRouter();

  const { authUser } = useSelector((state) => state.auth);

  console.log(authUser);

  const fullName = `${formatName(authUser?.FirstName)} ${formatName(
    authUser?.LastName
  )}`;

  console.log("Gender", authUser?.Gender);

  const avatar =
    authUser?.Gender === "F" ? "face-woman-profile" : "face-man-profile";

  return (
    <View style={styles.container}>
      <View>
        <PaperText
          variant="bodyLarge"
          style={{ fontWeight: "bold", color: "#001C63" }}
        >
          Hello 👋🏻
        </PaperText>
        <PaperText
          variant="headlineSmall"
          style={{ fontWeight: "bold", color: "#001C63" }}
        >
          {fullName}
        </PaperText>
      </View>

      <View>
        <TouchableOpacity>
          {/* <FontAwesome
            onPress={() => router.replace("/profile")}
            size={35}
            name={"user-circle"}
            color={"#001C63"}
          /> */}
          <MaterialCommunityIcons
            onPress={() => router.replace("/profile")}
            name={avatar}
            size={40}
            color={"#001C63"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 16,
  },
});
