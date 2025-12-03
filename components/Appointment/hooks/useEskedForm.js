import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { eskedSchema } from "../../../schema/schema";
import { computeAge } from "../../../libs/utils";
import {
  checkSlots,
  createOnlineAppointment,
} from "./../../../services/Medical/apiCalls";
import { Toast } from "toastify-react-native";

const useEskedForm = (data) => {
  const { authUser } = useSelector((state) => state.auth);
  const router = useRouter();

  const defaultValues = {
    phone: "",
    guardian: "",
    consultation: "",
    month: "",
    experience: "",
  };

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
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // const createApt = await createOnlineAppointment(payload);

    // console.log("create apt", createApt);
    Toast.success("Appointment added to waitlisted!", "top");
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.replace("/schedule");

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
