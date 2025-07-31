import api from "../index";

export const fetchTransactions = async (PatientID) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

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
    console.error("Please check your connection.");
    throw new Error(
      "Request failed or timed out—please check your connection."
    );
  }
};

export const fetchPhysicians = async (PatientHistoryID, ReferID) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

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
    console.error("Please check your connection.");
    throw new Error(
      "Request failed or timed out—please check your connection."
    );
  }
};

export const fetchDiagnosis = async (PatientHistoryID, ReferID) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

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
    console.error("Please check your connection.");
    throw new Error(
      "Request failed or timed out—please check your connection."
    );
  }
};
