// src/api/request.js
import apiClient from "./apiClient";

export const apiRequest = async ({
  method = "get",
  url,
  data = {},
  params = {},
}) => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    // Prefer response body if available
    throw error?.response?.data ?? error;
  }
};
