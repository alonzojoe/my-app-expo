import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Text as PaperText, TextInput, Button } from "react-native-paper";
import QRScanner from "../QR/QRScanner";
import useToggle from "../../hooks/useToggle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaskInput, { Masks } from "react-native-mask-input";
import Spacer from "../Spacer";
import ErrorMessage from "../Global/ErrorMessage";
import { verifySchema } from "../../schema/schema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useVerification from "./hooks/useVerification";
import { ActivityIndicator } from "react-native-paper";

const defaultValues = {
  patientno: "",
  lastname: "",
  birthdate: "",
};

const SetupPasswordForm = () => {
  const [focused, setFocused] = useState(false);
  const [showQr, toggleShowQr] = useToggle(false);
  const { handleVerify } = useVerification();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (formValues) => {
    console.log("Form submitted", formValues);
    await handleVerify(formValues);
  };

  const handleQRScan = (value) => {
    setValue("patientno", value);
    toggleShowQr(false);
  };

  return (
    <View>
      <View style={[styles.topHeaderItem, { marginBottom: 10 }]}>
        <PaperText variant="titleMedium" style={styles.titleText}>
          Information Verification
        </PaperText>
        <MaterialIcons name="verified" size={24} color="#017BFF" />
      </View>

      {/* Hospital Number */}
      <View style={[styles.headerItem, { marginTop: 20 }]}>
        <PaperText
          variant="titleMedium"
          style={[styles.labelText, errors.patientno && styles.errorLabel]}
        >
          Hospital Number
        </PaperText>
      </View>
      <Controller
        control={control}
        name="patientno"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="numeric"
            label=""
            mode="outlined"
            error={!!errors.patientno}
            style={styles.input}
            right={
              <TextInput.Icon
                color={showQr ? "#DD3353" : "#095185"}
                icon={showQr ? "close" : "qrcode"}
                onPress={() => toggleShowQr(!showQr)}
              />
            }
          />
        )}
      />
      {errors.patientno && (
        <ErrorMessage>{errors.patientno.message}</ErrorMessage>
      )}
      {showQr && (
        <QRScanner onScan={handleQRScan} onClose={() => toggleShowQr(false)} />
      )}

      {/* Last Name */}
      <View style={[styles.headerItem, { marginTop: 20 }]}>
        <PaperText
          variant="titleMedium"
          style={[styles.labelText, errors.lastname && styles.errorLabel]}
        >
          Last Name
        </PaperText>
      </View>
      <Controller
        control={control}
        name="lastname"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            label=""
            mode="outlined"
            error={!!errors.lastname}
            style={styles.input}
          />
        )}
      />
      {errors.lastname && (
        <ErrorMessage>{errors.lastname.message}</ErrorMessage>
      )}

      {/* Birthdate */}
      <View style={[styles.headerItem, { marginTop: 20 }]}>
        <PaperText
          variant="titleMedium"
          style={[styles.labelText, errors.birthdate && styles.errorLabel]}
        >
          Birthdate (MM/DD/YYYY)
        </PaperText>
      </View>
      <Controller
        control={control}
        name="birthdate"
        render={({ field: { onChange, value } }) => (
          <MaskInput
            value={value}
            onChangeText={(masked) => onChange(masked)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            keyboardType="numeric"
            mask={Masks.DATE_MMDDYYYY}
            maxLength={10}
            style={[
              styles.input,
              styles.maskInput,
              errors.birthdate && styles.errorInput,
              focused && styles.focusedInput,
            ]}
          />
        )}
      />
      {errors.birthdate && (
        <ErrorMessage>{errors.birthdate.message}</ErrorMessage>
      )}

      <View style={styles.textGroup}>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.btn}
          labelStyle={styles.btnLabel}
          disabled={isSubmitting}
        >
          {isSubmitting ? <ActivityIndicator size={20} /> : "Verify"}
        </Button>
      </View>

      <Spacer />
      <Spacer />
    </View>
  );
};

export default SetupPasswordForm;

const styles = StyleSheet.create({
  topHeaderItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  headerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  textGroup: {
    marginBottom: 15,
    marginTop: 15,
    alignItems: "center",
  },
  btn: {
    width: "100%",
    marginVertical: 12,
  },
  btnLabel: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginVertical: 5,
    backgroundColor: "#FFF",
  },
  maskInput: {
    borderColor: "#C1BDC3",
    borderWidth: 2,
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
  },
  focusedInput: {
    borderColor: "#001C63",
  },
  errorInput: {
    borderColor: "#B3271C",
  },
  titleText: {
    color: "#001C63",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  labelText: {
    color: "#001C63",
    fontWeight: "bold",
  },
  errorLabel: {
    color: "#B3271C",
  },
});
