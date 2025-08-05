import axios from "axios";

const apiopd = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_OPD_URL,
});

export default apiopd;
