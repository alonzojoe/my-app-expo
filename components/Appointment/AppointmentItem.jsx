import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { IconButton, Divider } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const ListItem = ({ sched, service, appointment, onPress, onCancel }) => {
  const { id, status } = sched;
  console.log("sched id status", { id, status });
  return (
    <View style={styles.card}>
      {/* Left colored bar */}
      <View
        style={[
          styles.leftBar,
          {
            backgroundColor: status == 0 ? "#3AC17B" : "#DD3353",
          },
        ]}
      />

      {/* Main content */}
      <TouchableOpacity style={styles.content} onPress={onPress}>
        {/* Appointment Date */}
        <View
          style={[
            styles.row,
            { justifyContent: "space-between", alignItems: "start" },
          ]}
        >
          <View style={styles.col}>
            <Text
              style={styles.appointmentTextHeader}
            >{`Appointment date`}</Text>
            <View style={[styles.row]}>
              <FontAwesome name="clock-o" size={16} color="#000000" />
              <Text style={styles.appointmentText}>{appointment}</Text>
            </View>
          </View>

          {status === 0 && (
            <TouchableOpacity onPress={onCancel} style={styles.menu}>
              {/* <FontAwesome name="ellipsis-v" size={20} color="#6E7AA3" /> */}
              <FontAwesome6 name="times-circle" size={23} color="#DD3353" />
            </TouchableOpacity>
          )}
        </View>

        <Divider style={{ marginVertical: "3" }} />
        {/* Service Name */}
        <View style={[styles.row]}>
          {/* <View
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
              icon="medical"
              size={25}
              iconColor="#FFF"
              style={{ margin: 0 }}
            />
          </View> */}
          <Text style={styles.serviceText}>{service}</Text>
        </View>
      </TouchableOpacity>

      {/* Right menu icon */}
      {/* <TouchableOpacity onPress={onCancel} style={styles.menu}>
        <FontAwesome name="ellipsis-v" size={20} color="#6E7AA3" />
      </TouchableOpacity> */}
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
  col: {
    flexDirection: "column",
    gap: 5,
  },
  appointmentTextHeader: {
    marginLeft: 0,
    color: "#6E7AA3",
    fontSize: 12,
    fontWeight: "bold",
  },
  appointmentText: {
    marginLeft: 6,
    color: "#000000",
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
