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
    throw error?.response?.data ?? error;
  }
};
