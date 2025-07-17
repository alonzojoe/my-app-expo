import { HelperText } from "react-native-paper";

const ErrorMessage = ({ visible, children }) => {
  return (
    <HelperText
      type="error"
      visible={visible}
      style={{
        fontWeight: "bold",
        fontSize: 14,
      }}
    >
      {children}
    </HelperText>
  );
};

export default ErrorMessage;
