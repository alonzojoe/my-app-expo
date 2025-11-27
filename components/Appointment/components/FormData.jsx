import { StyleSheet, Text, View } from "react-native";
import {
  Text as PaperText,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import ContentTitle from "./../../Transactions/ContentTitle";
import useOnlineAppointment from "../hooks/useOnlineAppointment";

const FormData = ({ data }) => {
  const { Controller, control, handleSubmit, errors, isSubmitting, onSubmit } =
    useOnlineAppointment();

  console.log("data", data);

  return (
    <View style={styles.container}>
      <ContentTitle title={`Complete the form to proceed`} mb={0} />

      <View style={styles.inputContainer}>
        {/* Alternate Phone Number */}
        <PaperText variant="titleSmall" style={styles.labelText}>
          Alternate Phone Number
        </PaperText>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              type="numeric"
              ewq
              placeholder="Enter alternate phone number"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="phone-pad"
              style={styles.input}
              error={!!errors.phone}
              maxLength={10}
            />
          )}
        />
        {/* {errors.phone && ( */}
        <Text style={styles.errorText}>
          {errors.phone ? errors.phone.message : ""}
        </Text>
        {/* )} */}

        {/* Chief Complaint */}
        <PaperText variant="titleSmall" style={styles.labelText}>
          Chief Complaint
        </PaperText>
        <Controller
          control={control}
          name="complaints"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              placeholder="Enter chief complaint"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
              style={[styles.input, styles.textArea]}
              error={!!errors.complaints}
            />
          )}
        />
        {/* {errors.complaints && ( */}
        <Text style={styles.errorText}>
          {errors.complaints ? errors.complaints.message : " "}
        </Text>
        {/* )} */}
      </View>

      {/* Submit Button */}
      <View style={styles.textGroup}>
        <Button
          icon="check"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.btn}
          labelStyle={styles.btnLabel}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            "Create Appointment"
          )}
        </Button>
      </View>
    </View>
  );
};

export default FormData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 100,
    gap: 5,
  },
  inputContainer: {
    paddingHorizontal: 5,
  },
  labelText: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "600",
    color: "#929292",
    fontSize: 13,
  },
  input: {
    backgroundColor: "white",
    height: 40,
    fontSize: 13,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
    fontSize: 13,
    paddingVertical: 0,
  },
  textGroup: {
    marginTop: 15,
    alignItems: "center",
  },
  btn: {
    width: "100%",
  },
  btnLabel: {
    color: "white",
    fontWeight: "normal",
  },
  errorText: {
    color: "#B3271C",
    fontSize: 12,
    marginTop: 2,
  },
});
