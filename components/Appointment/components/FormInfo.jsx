import { Card, Text as PaperText } from "react-native-paper";
const FormInfo = ({ content }) => {
  return (
    <Card style={{ backgroundColor: "#E6F0FF" }}>
      <Card.Content>
        <PaperText variant="bodyMedium">{content}</PaperText>
      </Card.Content>
    </Card>
  );
};

export default FormInfo;
