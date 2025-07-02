import { StyleSheet } from "react-native";
import { List, Divider } from "react-native-paper";

const ProfileItem = ({ label, color, Icon, onPress }) => {
  return (
    <>
      <List.Item
        title={label}
        titleStyle={{ color, fontWeight: "bold" }}
        left={(props) => <Icon {...props} />}
        onPress={onPress}
      />
      <Divider />
    </>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({});
