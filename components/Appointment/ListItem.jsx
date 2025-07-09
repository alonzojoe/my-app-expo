import { StyleSheet, View, Text } from "react-native";
import { List, Divider, IconButton, Badge } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ListItem = ({ service, appointment, onPress, onCancel }) => {
  return (
    <>
      <List.Item
        onPress={onPress}
        title={service}
        description={<Text>{appointment}</Text>}
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
              onPress={onPress}
              icon="calendar"
              size={25}
              iconColor="#FFF"
              style={{ margin: 0 }}
            />
          </View>
        )}
        right={(props) => (
          <FontAwesome
            onPress={onCancel}
            name="times"
            size={24}
            color="#DD3353"
          />
        )}
      />
      <Divider />
    </>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
