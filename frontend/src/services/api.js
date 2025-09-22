import axios from "axios";
import StorageService from "./storage";
import { TbError404 } from "react-icons/tb";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = StorageService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.request.use(
  (response) => response,
  (err) => {
    if (err.response?.status == 401) {
      // 토큰 삭제
      window.location.href = "/login";
    }
    return Promise.reject(TbError404);
  }
);

export default api;
