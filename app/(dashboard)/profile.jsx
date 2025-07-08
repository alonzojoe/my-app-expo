import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "../../components/SafeView";
import {
  Avatar,
  Portal,
  Dialog,
  Button,
  List,
  Divider,
  Text as PaperText,
} from "react-native-paper";

import { PROFILEITEMS } from "./../../constants/ProfileItems";
import ProfileItem from "./../../components/Profile/ProfileItem";
import ProfileImg from "../../assets/image/Default_pfp.jpg";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import useToggle from "../../hooks/useToggle";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
const Profile = () => {
  const [confirm, setConfirm] = useToggle(false);
  const router = useRouter();

  const { authUser } = useSelector((state) => state.auth);

  return (
    <>
      <SafeView safe={true}>
        <View style={styles.container}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Avatar.Image size={90} source={ProfileImg} />
            <View style={{ alignItems: "center" }}>
              <PaperText
                variant="headlineSmall"
                style={{ fontWeight: "bold", color: "#091D63" }}
              >
                {authUser?.name}
              </PaperText>
              <PaperText
                variant="bodyMedium"
                style={{ fontWeight: "bold", color: "#6E7AA3" }}
              >
                Patient
              </PaperText>
            </View>
          </View>
          <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
            <List.Item
              title={authUser?.hospitalNo}
              titleStyle={{ color: "#6E7AA3" }}
              left={(props) => (
                <FontAwesome5
                  name="hospital-symbol"
                  size={24}
                  color="#6E7AA3"
                />
              )}
            />
            <List.Item
              title={authUser?.phone}
              titleStyle={{ color: "#6E7AA3" }}
              left={(props) => (
                <FontAwesome name="phone" size={24} color="#6E7AA3" />
              )}
            />
          </View>
          <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
            <Divider />
            {PROFILEITEMS.map((prof) => (
              <ProfileItem
                key={prof.id}
                label={prof.label}
                color={prof.color}
                onPress={() => {
                  if (prof.id === 5) {
                    setConfirm(true);
                    return;
                  }
                  prof.onPress();
                }}
                Icon={prof.Icon}
                iconName={prof.iconName}
              />
            ))}
          </View>
        </View>
        <Portal>
          <Dialog visible={confirm} onDismiss={() => setConfirm(false)}>
            <Dialog.Icon icon="alert" />
            <Dialog.Title style={styles.dialogTitle}>Confirmation</Dialog.Title>
            <Dialog.Content>
              <PaperText variant="bodyMedium" style={styles.dialogTitle}>
                Are you sure to logout your account?
              </PaperText>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setConfirm(false)} textColor="#DD3353">
                Cancel
              </Button>
              <Button onPress={() => router.replace("/")}>Yes</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 16,
  },
  fluid: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  dialogTitle: {
    textAlign: "center",
  },
});
