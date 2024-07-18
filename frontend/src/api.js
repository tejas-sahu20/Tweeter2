import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Base URL of your API
const apiUrl = "http://localhost:8000";

// Create an axios instance
const api = axios.create({
  baseURL: apiUrl,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
