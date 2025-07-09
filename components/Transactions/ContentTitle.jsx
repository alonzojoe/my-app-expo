import { Text as PaperText } from "react-native-paper";

const ContentTitle = ({ title, mb = 10 }) => {
  return (
    <PaperText
      style={{
        backgroundColor: "#004C82",
        padding: 5,
        color: "#FFF",
        fontWeight: "bold",
        marginBottom: mb,
      }}
      variant="titleSmall"
    >
      {title}
    </PaperText>
  );
};

export default ContentTitle;
