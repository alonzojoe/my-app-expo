import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { IconButton, Divider } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ListItem = ({ service, appointment, onPress, onCancel }) => {
  return (
    <View style={styles.card}>
      {/* Left colored bar */}
      <View style={styles.leftBar} />

      {/* Main content */}
      <TouchableOpacity style={styles.content} onPress={onPress}>
        {/* Appointment Date */}
        <View style={styles.row}>
          <Text style={styles.appointmentTextHeader}>{`Appointment date`}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesome name="clock-o" size={16} color="#6E7AA3" />
          <Text style={styles.appointmentText}>{appointment}</Text>
        </View>
        <Divider />
        {/* Service Name */}
        <Text style={styles.serviceText}>{service}</Text>
      </TouchableOpacity>

      {/* Right menu icon */}
      <TouchableOpacity onPress={onCancel} style={styles.menu}>
        <FontAwesome name="ellipsis-v" size={20} color="#6E7AA3" />
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginVertical: 6,
    alignItems: "center",
    elevation: 1,
  },
  leftBar: {
    width: 4,
    height: "80%",
    backgroundColor: "#3AC17B",
    borderRadius: 20,
    marginRight: 12,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  appointmentTextHeader: {
    marginLeft: 0,
    color: "#6E7AA3",
    fontSize: 12,
    fontWeight: "bold",
  },
  appointmentText: {
    marginLeft: 6,
    color: "#6E7AA3",
    fontSize: 13,
  },
  serviceText: {
    color: "#001C63",
    fontWeight: "bold",
    fontSize: 16,
  },
  menu: {
    padding: 8,
  },
});
