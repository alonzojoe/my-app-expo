import { StyleSheet, View } from "react-native";
import { Text as PaperText } from "react-native-paper";

const Subtitle = ({ label, style, ...props }) => {
  return (
    <View style={[styles.container, style]}>
      <PaperText variant="headlineSmall" style={{ fontWeight: "bold" }}>
        {label}
      </PaperText>
    </View>
  );
};

export default Subtitle;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,

    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
