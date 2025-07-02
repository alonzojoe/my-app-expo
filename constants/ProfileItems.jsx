import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export const PROFILEITEMS = [
  {
    id: 1,
    label: "My Account",
    color: "#3A71FA",
    onPress: () => {
      console.log("My Account clicked");
    },
    Icon: <FontAwesome5 name="user-alt" size={24} color="#3A71FA" />,
  },
  {
    id: 2,
    label: "My Virtual Blue Card",
    color: "#3A71FA",
    onPress: () => {
      console.log("My Virtual Blue Card clicked");
    },
    Icon: <FontAwesome name="vcard" size={24} color="#3A71FA" />,
  },
  {
    id: 3,
    label: "Settings",
    color: "#3A71FA",
    onPress: () => {
      console.log("Settings clicked");
    },
    Icon: <FontAwesome name="vcard" size={24} color="#3A71FA" />,
  },
  {
    id: 4,
    label: "Rate this app",
    color: "#3A71FA",
    onPress: () => {
      console.log("Rate this app clicked");
    },
    Icon: <FontAwesome name="star" size={24} color="#3A71FA" />,
  },
  {
    id: 5,
    label: "Logout",
    color: "#FF2245",
    onPress: () => {
      console.log("Logout clicked");
    },
    Icon: <FontAwesome name="power-off" size={24} color="#FF2245" />,
  },
];
