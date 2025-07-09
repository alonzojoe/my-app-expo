import { StyleSheet, View, Text } from "react-native";
import { List, Divider, IconButton, Badge } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const PhysicianItem = ({ physician, type, isMain }) => {
  return (
    <>
      <List.Item
        onPress={onPress}
        title={physician}
        description={
          <Text>
            {type} | Main Physician: {isMain}
          </Text>
        }
        titleStyle={{ color: "#001C63", fontWeight: "bold" }}
        descriptionStyle={{ color: "#6E7AA3" }}
        left={(props) => (
          <View
            onPress={onPress}
            style={{
              backgroundColor: "#004C82",
              borderRadius: 24,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              icon="calendar"
              size={25}
              iconColor="#FFF"
              style={{ margin: 0 }}
            />
          </View>
        )}
      />
      <Divider />
    </>
  );
};

export default PhysicianItem;

const styles = StyleSheet.create({});
