import { StyleSheet, View } from "react-native";
import { Text as PaperText } from "react-native-paper";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

const Header = () => {
  const router = useRouter();

  const { authUser } = useSelector((state) => state.auth);

  console.log(authUser);

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
          {authUser?.FirstName} {authUser?.LastName}
        </PaperText>
      </View>

      <View>
        <FontAwesome
          onPress={() => router.replace("/profile")}
          size={35}
          name={"user-circle"}
          color={"#001C63"}
        />
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
