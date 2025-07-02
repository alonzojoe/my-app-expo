import { StyleSheet } from "react-native";
import { List, Divider } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ProfileItem = ({ label, color, Icon, iconName, onPress }) => {
  const style = {
    marginRight: iconName == "id-card" ? 5 : 10,
  };
  return (
    <>
      <List.Item
        title={label}
        titleStyle={{ color, fontWeight: "bold" }}
        left={(props) => (
          <FontAwesome name={iconName} size={24} color={color} style={style} />
        )}
        onPress={onPress}
      />
      <Divider />
    </>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({});
