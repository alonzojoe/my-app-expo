import { StyleSheet, View, Text } from "react-native";
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

const defaultValues = {
  patientno: "",
  lastname: "",
  birthdate: "",
};

const VerificationForm = () => {
  const [focused, setFocused] = useState(false);
  const [showQr, toggleShowQr] = useToggle(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (formValues) => {
    console.log("Form submitted", formValues);
  };

  return (
    <View>
      <View style={[styles.topHeaderItem, { marginBottom: 10 }]}>
        <PaperText
          variant="titleMedium"
          style={{
            color: "#001C63",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Information Verification
        </PaperText>
        <MaterialIcons name="verified" size={24} color="#017BFF" />
      </View>

      {/* Hospital Number */}
      <View style={[styles.headerItem, { marginTop: 20 }]}>
        <PaperText
          variant="titleMedium"
          style={{
            color: errors.patientno ? "#B3271C" : "#001C63",
            fontWeight: "bold",
          }}
        >
          Hospital Number
        </PaperText>
      </View>
      <Controller
        control={control}
        name="patientno"
        render={({ field }) => (
          <TextInput
            {...field}
            keyboardType="numeric"
            label=""
            mode="outlined"
            error={!!errors.patientno}
            style={styles.input}
            right={
              <TextInput.Icon
                color={showQr ? `#DD3353` : `#095185`}
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
        <QRScanner
          onScan={(value) => field.onChange(value)}
          onClose={() => toggleShowQr(false)}
        />
      )}

      {/* Last Name */}
      <View style={[styles.headerItem, { marginTop: 20 }]}>
        <PaperText
          variant="titleMedium"
          style={{
            color: errors.lastname ? "#B3271C" : "#001C63",
            fontWeight: "bold",
          }}
        >
          Last Name
        </PaperText>
      </View>
      <Controller
        control={control}
        name="lastname"
        render={({ field }) => (
          <TextInput
            {...field}
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
          style={{
            color: errors.birthdate ? "#B3271C" : "#001C63",
            fontWeight: "bold",
          }}
        >
          Birthdate (MM/DD/YYYY)
        </PaperText>
      </View>
      <Controller
        control={control}
        name="birthdate"
        render={({ field }) => (
          <MaskInput
            keyboardType="numeric"
            value={field.value}
            onChangeText={(masked, unmasked) => field.onChange(masked)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            mask={Masks.DATE_MMDDYYYY}
            maxLength={10}
            style={[
              styles.input,
              {
                keyboardType: "numeric",
                backgroundColor: "#FFF",
                borderColor: errors.birthdate
                  ? "#B3271C"
                  : focused
                  ? "#001C63"
                  : "#C1BDC3",
                borderWidth: 2,
                borderRadius: 5,
                padding: 15,
                fontSize: 16,
              },
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
        >
          Verify
        </Button>
      </View>

      <Spacer />
      <Spacer />
    </View>
  );
};

export default VerificationForm;

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
  input: {
    width: "100%",
    marginVertical: 5,
  },
});
