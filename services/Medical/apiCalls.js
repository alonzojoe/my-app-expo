import api from "../index";
import apiopd from "../opd";
import { Toast } from "toastify-react-native";

export const fetchTransactions = async (PatientID) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await api.get("/transactions", {
      params: { PatientID },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    console.log("res", res);
    return res.data.data;
  } catch (error) {
    clearTimeout(timeout);
    Toast.error("Please try again later.", "top");
    return [];
    // console.error("Please check your connection.");
    // throw new Error(
    //   "Request failed or timed out—please check your connection."
    // );
  }
};

export const fetchPhysicians = async (PatientHistoryID, ReferID) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await api.get("/physicians", {
      params: { PatientHistoryID, ReferID },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    console.log("res", res);
    return res.data.data;
  } catch (error) {
    clearTimeout(timeout);
    Toast.error("Please try again later.", "top");
    // console.error("Please check your connection.");
    // throw new Error(
    //   "Request failed or timed out—please check your connection."
    // );
  }
};

export const fetchDiagnosis = async (PatientHistoryID, ReferID) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await api.get("/diagnosis", {
      params: { PatientHistoryID, ReferID },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    console.log("res", res);
    return res.data.data[0];
  } catch (error) {
    clearTimeout(timeout);
    Toast.error("Please try again later.", "top");
    // console.error("Please check your connection.");
    // throw new Error(
    //   "Request failed or timed out—please check your connection."
    // );
  }
};

export const fetchLabResults = async (PatientHistoryID) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await api.get(`/lab/${PatientHistoryID}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    console.log("res lab resutlts", res.data.data);
    return res.data.data;
  } catch (error) {
    clearTimeout(timeout);
    Toast.error("Please try again later.", "top");
    // console.error("Please check your connection.");
    // throw new Error(
    //   "Request failed or timed out—please check your connection."
    // );
  }
};

export const checkSlots = async (payload) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  const {
    serviceId: ServiceType,
    opdtimeid: SelectedTime,
    date: SelectedDate,
  } = payload;

  try {
    const res = await apiopd.get(`/telehealth`, {
      params: {
        ServiceType,
        SelectedTime,
        SelectedDate,
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    console.log("slots", res.data);
    return res.data;
  } catch (error) {
    clearTimeout(timeout);
    console.error("Please check your connection.");

    return [];
  }
};

export const createOnlineAppointment = async (payload) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await apiopd.post(`/opdschedule`, payload, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    console.log("create appointment response", res.data);
    Toast.success("Appointment created successfully!", "top");
    return res.data;
  } catch (error) {
    clearTimeout(timeout);
    Toast.error("Please try again later.", "top");

    return [];
  }
};

export const getAppointments = async (PatientNo) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await api.get(`/appointments`, {
      params: { patientno: PatientNo },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    console.log("appointments", res.data);
    return res.data;
  } catch (error) {
    clearTimeout(timeout);
    Toast.error("Please try again later.", "top");
    return [];
  }
};

export const cancelAppointment = async (appointmentId) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  const payload = {
    pid: appointmentId,
  };

  try {
    const res = await apiopd.post("/cancelappointment", payload, {
      signal: controller.signal,
    });

    clearTimeout(timeout);
    console.log("cancel", res.data);
    Toast.success("Appointment cancelled succesfully!", "top");
  } catch (error) {
    clearTimeout(timeout);
    Toast.error("Please try again later.", "top");
  }
};

export const createEskedAppointment = async (payload) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await apiopd.post(`/insertappointment`, payload, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    Toast.success("Appointment added to waitlisted!", "top");
    return res.data;
  } catch (error) {
    clearTimeout(timeout);
    Toast.error("Please try again later.", "top");

    return [];
  }
};

export const getWaitlisted = async (payload) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  const { birthdate, ContactNo } = payload;

  console.log("payload", payload);

  try {
    const res = await apiopd.get(`/waitlisted`, {
      params: { mobileno: ContactNo, birthday: birthdate },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    console.log("waitlisted", res.data.data);
    return res.data.data;
  } catch (error) {
    clearTimeout(timeout);
    Toast.error("Please try again later.", "top");
    return [];
  }
};

export const getLabHistory = async (referId) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await api.get(`/lab-history/${referId}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    console.log("lab history", res.data.data);
    return res.data.data;
  } catch (error) {
    clearTimeout(timeout);
    Toast.error("Please try again later.", "top");
    return [];
  }
};

export const getPrescriptionHistory = async (referId) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await api.get(`/presc-history/${referId}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    console.log("prescription history", res.data.data);
    return res.data.data;
  } catch (error) {
    clearTimeout(timeout);
    Toast.error("Please try again later.", "top");
    return [];
  }
};

export const getRadHistory = async (referId) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await api.get(`/rad-history/${referId}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    console.log("rad history", res.data.data);
    return res.data.data;
  } catch (error) {
    clearTimeout(timeout);
    Toast.error("Please try again later.", "top");
    return [];
  }
};
