import axios from "axios";
import { ApiError } from "./ApiError";

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:55116",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    if (response.data?.error) {
      return Promise.reject(new ApiError(response.data.error));
    }
    return response;
  },
  (error) => {
    console.log(error.response.data.error);
    if (error.response.data.error != null) {
      return Promise.reject(new ApiError(error.response.data.error));
    }
    // Let actual network errors (timeouts, no response, etc.) bubble up
    return Promise.reject(error);
  }
);

export default api;

// // Add request interceptor for auth tokens
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Add response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle common errors (401, 403, etc.)
//     if (error.response?.status === 401) {
//       // Handle unauthorized
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );
