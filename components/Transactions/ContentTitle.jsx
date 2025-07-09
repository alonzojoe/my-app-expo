import { Text as PaperText } from "react-native-paper";

const ContentTitle = ({ title, mb = 10 }) => {
  return (
    <PaperText
      style={{
        color: "#004C82",
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
