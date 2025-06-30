import { StyleSheet, View, Text } from "react-native";
import { List, Divider, IconButton, Badge } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ListItem = ({ service, appointment, onCancel }) => {
  return (
    <>
      <List.Item
        title={service}
        description={<Text>{appointment}</Text>}
        left={(props) => (
          <View
            style={{
              backgroundColor: "#e0e0e0",
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
              iconColor="black"
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
