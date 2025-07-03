import { useRouter } from "expo-router";

const router = useRouter();

export const PROFILEITEMS = [
  {
    id: 1,
    label: "My Account",
    color: "#3A71FA",
    onPress: () => {
      console.log("My Account clicked");
    },
    Icon: "FontAwesome5",
    iconName: "user-circle-o",
  },
  {
    id: 2,
    label: "My Virtual Blue Card",
    color: "#3A71FA",
    onPress: () => {
      console.log("My Virtual Blue Card clicked");
    },
    Icon: "FontAwesome",
    iconName: "id-card",
  },
  {
    id: 3,
    label: "Settings",
    color: "#3A71FA",
    onPress: () => {
      console.log("Settings clicked");
    },
    Icon: "FontAwesome",
    iconName: "cog",
  },
  {
    id: 4,
    label: "Rate this app",
    color: "#3A71FA",
    onPress: () => {
      console.log("Rate this app clicked");
    },
    Icon: "FontAwesome",
    iconName: "star",
  },
  {
    id: 5,
    label: "Logout",
    color: "#FF2245",
    onPress: () => {
      console.log("Logout clicked");
      router.replace("/");
    },
    Icon: "FontAwesome",
    iconName: "power-off",
  },
];
