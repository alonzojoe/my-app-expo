import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { eskedSchema } from "../../../schema/schema";
import { computeAge } from "../../../libs/utils";
import { createEskedAppointment } from "./../../../services/Medical/apiCalls";
import { Toast } from "toastify-react-native";

const useEskedForm = (data) => {
  const { authUser } = useSelector((state) => state.auth);
  console.log("authuser", authUser);
  const router = useRouter();

  const defaultValues = {
    mainPhone: authUser?.ContactNo?.toString() || "",
    phone: "",
    guardian: "",
    consultation: "",
    month: "",
    experience: "",
  };

  useEffect(() => {
    if (authUser?.ContactNo) {
      reset({
        mainPhone: authUser.ContactNo.toString(),
        phone: "",
        guardian: "",
        consultation: "",
        month: "",
        experience: "",
      });
    }
  }, [authUser, reset]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(eskedSchema),
  });

  const onSubmit = async (formData) => {
    console.log("auth", authUser);
    console.log("Form Data:", formData);
    console.log("age", computeAge(authUser.birthdate));
    console.log("data", data);

    const { phone, guardian, consultation, month, experience } = formData;

    const chiefComplaint = `I would like to have a consultation for ${consultation} This started ${month} At Present. I am experiencing ${experience}.`;

    const payload = {
      patientNo: authUser?.PatientNo,
      lastName: authUser?.LastName,
      firstName: authUser?.FirstName,
      middleName: authUser?.MiddleName,
      suffix: "",
      gender: authUser?.Gender,
      civilStatus: authUser?.CivilStatus,
      nationality: authUser?.Nationality,
      pob: authUser?.PlaceofBirth,
      street: authUser?.Street,
      provinceid: authUser?.Province,
      municipalityid: authUser?.Municipality,
      barangayid: authUser?.BarangayID,
      chiefc: chiefComplaint,
      contactNo: authUser?.ContactNo,
      altContactNo: phone,
      dob: authUser?.birthdate,
      guardianname: guardian,
      preferredDate: data?.selected,
      referringDoctor: null,
    };

    console.log("updated payload", payload);
    const createApt = await createEskedAppointment(payload);
    console.log("create apt", createApt);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.replace("/(dashboard)/schedule");

    reset();
  };

  return {
    Controller,
    control,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    onSubmit,
    authUser,
  };
};

export default useEskedForm;
