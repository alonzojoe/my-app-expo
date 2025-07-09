import { Text as PaperText } from "react-native-paper";
import { View } from "react-native";
const ContentData = ({ title, content, mb = 5 }) => {
  return (
    <>
      <PaperText
        style={{
          paddingLeft: 5,
          color: "#004C82",
          fontWeight: "bold",
          textDecorationLine: "underline",
          marginBottom: mb,
        }}
      >
        {title}
      </PaperText>
      <View style={{ marginBottom: 10, paddingHorizontal: 5 }}>
        <PaperText>{content}</PaperText>
      </View>
    </>
  );
};

export default ContentData;
