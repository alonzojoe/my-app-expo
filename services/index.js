import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const apiopd = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_OPD,
});

export default api;
