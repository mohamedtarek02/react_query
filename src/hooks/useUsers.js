// src/hooks/useUsers.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../api/axiosGeneric";

export const useUsers = (options = {}) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const data = await apiRequest({ method: "get", url: `/users` });
        return data;
      } catch (error) {
        // Handle error inside the hook
        console.log("Handling error inside React query hook", error);
        throw error;
      }
    },
    retry: false, // Disable automatic retries only fetch once
    ...options,
  });
};

export const useUser = (id, enabled = true, options = {}) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => apiRequest({ method: "get", url: `/users/${id}` }),
    onError: (error) => console.log("onError triggered", error),
    enabled: !!id && enabled,
    ...options,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUser) => {
      console.log("sending data", newUser);
      return apiRequest({ method: "post", url: "/users", data: newUser });
    },
    onSuccess: () => {
      // Refresh the users list after a successful create
      queryClient.invalidateQueries(["users"]);
      console.log("User created — invalidated users query");
    },
    onError: (error) => {
      console.log("createUser error", error);
    },
  });
};
