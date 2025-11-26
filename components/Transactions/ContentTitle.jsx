import { Text as PaperText } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const ContentTitle = ({ title, mb = 10 }) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftBar} />
      <PaperText
        style={{
          // backgroundColor: "#004C82",
          padding: 5,
          color: "#000000",
          fontWeight: "bold",
        }}
        variant="titleSmall"
      >
        {title}
      </PaperText>
    </View>
  );
};

export default ContentTitle;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    elevation: 1,
    marginBottom: 0,
  },
  leftBar: {
    width: 4,
    height: "80%",
    backgroundColor: "#3AC17B",
    borderRadius: 20,
    marginRight: 3,
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

export const MedicalItem = ({ transaction, transactionDate, onView }) => {
  return (
    <View style={styles.card}>
      {/* Left colored bar */}
      <View style={styles.leftBar} />

      {/* Main content */}
      <TouchableOpacity style={styles.content} onPress={onView}>
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
            >{`Transaction date`}</Text>
            <View style={[styles.row]}>
              <FontAwesome name="calendar-o" size={16} color="#000000" />
              <Text style={styles.appointmentText}>{transactionDate}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={onView} style={styles.menu}>
            {/* <FontAwesome name="ellipsis-v" size={20} color="#6E7AA3" /> */}
            <FontAwesome6 name="eye" size={20} color="#004C82" />
          </TouchableOpacity>
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
          <Text style={styles.serviceText}>{transaction}</Text>
        </View>
      </TouchableOpacity>

      {/* Right menu icon */}
      {/* <TouchableOpacity onPress={onCancel} style={styles.menu}>
        <FontAwesome name="ellipsis-v" size={20} color="#6E7AA3" />
      </TouchableOpacity> */}
    </View>
  );
};
