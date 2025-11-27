import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Text as PaperText,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ContentTitle from "./../../Transactions/ContentTitle";
import { eappointmentForm } from "../../../schema/schema";
import { useSelector } from "react-redux";
import { checkSlots } from "../../../services/Medical/apiCalls";

const FormData = ({ data }) => {
  console.log("data", data);
  const { authUser } = useSelector((state) => state.auth);

  const defaultValues = {
    phone: "",
    complaints: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(eappointmentForm),
  });

  const onSubmit = async (formData) => {
    console.log("auth", authUser);
    console.log("selected slot", data);
    console.log("Form Data:", formData);

    const slotPayload = {
      serviceId: data?.serviceId,
      opdtimeid: data?.selectedSlot?.opdtimeid,
      date: data?.date,
    };

    const res = await checkSlots(slotPayload);

    console.log("checkSlots", res.length);

    if (!res || res.length === 0) {
      alert("Please select another slot!");
      return;
    }

    const payload = {
      ...authUser,
      Barangay: authUser?.BarangayID,
      BirthDate: authUser?.birthdate,
      OldNew: 0,
      ChiefComplaint: formData?.complaints?.toUpperCase(),
      AltContactNo: formData?.phone,
      SelectedTime: data?.selectedSlot,
      SelectedDate: data?.selectedSlot?.date,
      SelectedDateId: data?.selectedSlot?.opddateslotsid,
      ServiceType: data?.serviceId,
    };

    console.log("updated payload", payload);

    return;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Appointment created successfully!");
    // reset();
  };

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
