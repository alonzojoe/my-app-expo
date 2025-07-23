import { useRouter } from "expo-router";

const router = useRouter();

export const PROFILEITEMS = [
  {
    id: 1,
    label: "My Account",
    color: "#004C82",
    onPress: () => {
      console.log("My Account clicked");
    },
    Icon: "FontAwesome5",
    iconName: "user-circle-o",
  },
  {
    id: 2,
    label: "My Virtual Blue Card",
    color: "#004C82",
    onPress: () => {
      console.log("My Virtual Blue Card clicked");
      router.replace("/bluecard");
    },
    Icon: "FontAwesome",
    iconName: "id-card",
  },
  {
    id: 3,
    label: "Settings",
    color: "#004C82",
    onPress: () => {
      console.log("Settings clicked");
    },
    Icon: "FontAwesome",
    iconName: "cog",
  },
  {
    id: 4,
    label: "Rate this app",
    color: "#004C82",
    onPress: () => {
      console.log("Rate this app clicked");
      router.replace("/rate");
    },
    Icon: "FontAwesome",
    iconName: "star",
  },
  {
    id: 5,
    label: "Logout",
    color: "#FF2245",
    onPress: async () => {
      console.log("Logout clicked");
    },
    Icon: "FontAwesome",
    iconName: "power-off",
  },
];
