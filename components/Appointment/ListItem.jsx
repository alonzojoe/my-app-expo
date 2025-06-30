import { StyleSheet, View } from "react-native";
import { List, Divider, IconButton } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ListItem = ({ service, appointment }) => {
  return (
    <>
      <List.Item
        title={service}
        description={appointment}
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
            onPress={() => console.log("cancel")}
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
