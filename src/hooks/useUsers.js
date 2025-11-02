// src/hooks/useUsers.js
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../api/axiosGeneric";

export const useUsers = (filters = {}) => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => apiRequest({ method: "get", url: "/users" }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUser = ({ id, enabled }) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => apiRequest({ method: "get", url: `/users/${id}` }),
    enabled: !!id && enabled,
  });
};
