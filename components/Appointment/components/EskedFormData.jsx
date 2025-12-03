import { StyleSheet, Text, View } from "react-native";
import {
  Text as PaperText,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import ContentTitle from "./../../Transactions/ContentTitle";
import ToastManager from "toastify-react-native/components/ToastManager";
import useEskedForm from "../hooks/useEskedForm";
import { computeAge } from "../../../libs/utils";

const EskedFormData = ({ data }) => {
  const {
    Controller,
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    authUser,
  } = useEskedForm(data);

  console.log("data", data);

  const age = computeAge(authUser.birthdate);

  return (
    <View style={styles.container}>
      <ToastManager />
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

        {age > 18 && (
          <>
            <PaperText variant="titleSmall" style={styles.labelText}>
              Guardian
            </PaperText>
            <Controller
              control={control}
              name="guardian"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  ewq
                  placeholder="Enter guardian name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                />
              )}
            />
            <Text style={styles.errorText}>{""}</Text>
          </>
        )}

        {/* Consulatation */}
        <PaperText variant="titleSmall" style={styles.labelText}>
          I would like to have a consulatation for
        </PaperText>
        <Controller
          control={control}
          name="consultation"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="flat"
              placeholder=""
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={[styles.input]}
              error={!!errors.consultation}
            />
          )}
        />
        {/* {errors.phone && ( */}
        <Text style={styles.errorText}>
          {errors.consultation ? errors.consultation.message : ""}
        </Text>
        {/* )} */}

        {/* Started */}
        <PaperText variant="titleSmall" style={styles.labelText}>
          This started
        </PaperText>
        <Controller
          control={control}
          name="month"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="flat"
              ewq
              placeholder=""
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              error={!!errors.month}
            />
          )}
        />
        {/* {errors.month && ( */}
        <Text style={styles.errorText}>
          {errors.month ? errors.month.message : ""}
        </Text>
        {/* )} */}

        {/* Started */}
        <PaperText variant="titleSmall" style={styles.labelText}>
          At Present, I am experiencing
        </PaperText>
        <Controller
          control={control}
          name="experience"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="flat"
              placeholder=""
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              error={!!errors.experience}
            />
          )}
        />
        {/* {errors.phone && ( */}
        <Text style={styles.errorText}>
          {errors.experience ? errors.experience.message : ""}
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

export default EskedFormData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 150,
    gap: 5,
  },
  inputContainer: {
    paddingHorizontal: 5,
  },
  labelText: {
    marginTop: 5,
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
    // textAlign: "center",
    color: "#B3271C",
    fontSize: 12,
    marginTop: 3,
  },
});
