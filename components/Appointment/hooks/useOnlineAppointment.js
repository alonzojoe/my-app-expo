import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { eappointmentForm } from "../../../schema/schema";
import {
  checkSlots,
  createOnlineAppointment,
} from "./../../../services/Medical/apiCalls";
import { Toast } from "toastify-react-native";

const useOnlineAppointment = (data) => {
  const { authUser } = useSelector((state) => state.auth);
  const router = useRouter();

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

    // await new Promise((resolve) => setTimeout(resolve, 500));

    const createApt = await createOnlineAppointment(payload);

    // console.log("create apt", createApt);
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
  };
};

export default useOnlineAppointment;
