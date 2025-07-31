import { StyleSheet, View } from "react-native";
import ActivityIndicator from "react-native-paper/src/components/ActivityIndicator";

const LoaderSpinner = ({
  marginVertical = 15,
  size = "large",
  color = "#001C63",
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical,
      }}
    >
      <ActivityIndicator animating={true} size={size} color={color} />
    </View>
  );
};

export default LoaderSpinner;

const styles = StyleSheet.create({});
