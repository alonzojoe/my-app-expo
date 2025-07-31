import { StyleSheet, View, Text } from "react-native";
import { List, Divider } from "react-native-paper";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
const PhysicianItem = ({ physician, isMain }) => {
  const physicianLabel = isMain == 1 ? "Main" : "Attending";

  return (
    <>
      <List.Item
        title={physician}
        description={<Text>{`${physicianLabel} Physician`}</Text>}
        titleStyle={{ color: "#000", fontWeight: "bold", fontSize: 14 }}
        descriptionStyle={{ color: "#6E7AA3" }}
        left={(props) => (
          <View
            style={{
              backgroundColor: "#004C82",
              borderRadius: 24,
              width: 38,
              height: 38,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome6
              name="user-doctor"
              size={20}
              color="#FFF"
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
