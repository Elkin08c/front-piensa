import axios from "axios";
import { tokenservice } from "../tokenservice";

const apiservice = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BACKEND,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

apiservice.interceptors.request.use(
  async (config) => {
    const accessToken = await tokenservice.getToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiservice.interceptors.response.use(
  (response) => {
    if (response.data?.accessToken) {
      tokenservice.setToken(response.data.accessToken);
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      await tokenservice.removeToken();
    }
    return Promise.reject(error);
  }
);

export default apiservice;
