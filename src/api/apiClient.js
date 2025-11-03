// src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Example: Add auth token automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Interceptor caught error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
