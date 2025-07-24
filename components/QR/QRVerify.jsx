import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState } from "react";
import { Portal, Modal, Text as PaperText, Button } from "react-native-paper";
import ErrorMessage from "../Global/ErrorMessage";
import MaskInput, { Masks } from "react-native-mask-input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { qrVerifySchema } from "../../schema/schema";
import useVerification from "../Forms/hooks/useVerification";
const defaultValues = {
  birthdate: "",
};

const QRVerify = ({ show, toggleQR }) => {
  const [focused, setFocused] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(qrVerifySchema),
  });

  const { verifyQRData } = useVerification();

  const onSubmit = async (formValues) => {
    console.log("Form submitted", formValues);
    const { birthdate } = formValues;
    await verifyQRData(birthdate);
  };

  return (
    <Portal>
      <Modal
        visible={show}
        onDismiss={() => toggleQR(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <PaperText
              variant="titleMedium"
              style={{ color: "#001C63", textAlign: "center" }}
            >
              VERIFY YOUR DATE OF BIRTH
            </PaperText>
          </View>
          <ScrollView>
            <View style={{ marginHorizontal: 15 }}>
              <View style={[styles.headerItem, { marginTop: 5 }]}>
                <PaperText
                  variant="titleMedium"
                  style={[
                    styles.labelText,
                    errors.birthdate && styles.errorLabel,
                  ]}
                >
                  Birthdate (MM/DD/YYYY)
                  {errors.birthdate && (
                    <ErrorMessage> {errors.birthdate.message}</ErrorMessage>
                  )}
                </PaperText>
              </View>
              <Controller
                control={control}
                name="birthdate"
                render={({ field: { onChange, value } }) => (
                  <MaskInput
                    mode="outline"
                    label="test"
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
            </View>
          </ScrollView>
          <View style={{ marginVertical: 10 }} />
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Button
              width={120}
              icon="check"
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={{
                color: "#fff",
                backgroundColor: "#001C63",
              }}
            >
              Verify
            </Button>
            <Button
              width={120}
              icon="close"
              mode="contained"
              onPress={() => toggleQR(false)}
              style={{
                color: "#fff",
                backgroundColor: "#DD3254",
              }}
            >
              Close
            </Button>
          </View>
        </>
      </Modal>
    </Portal>
  );
};

export default QRVerify;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 18,
  },
  modalContainer: {
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: "white",
    padding: 20,
  },
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
    marginTop: 15,
    alignItems: "center",
  },
  btn: {
    width: "100%",
    marginVertical: 12,
  },
  btnLabel: {
    color: "white",
    fontWeight: "normal",
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
    fontWeight: "normal",
  },
  errorLabel: {
    color: "#B3271C",
  },
});
