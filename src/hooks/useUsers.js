// src/hooks/useUsers.js
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../api/axiosGeneric";

export const useUsers = () => {
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
  });
};

export const useUser = ({ id, enabled }) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => apiRequest({ method: "get", url: `/users/${id}` }),
    enabled: !!id && enabled,
    onError: (error) => console.log("onError triggered", error),
  });
};

// export const useCreateUser = ({ userData }) => {
//   return useMutation({
//     mutationFn: () =>
//       apiRequest({ method: "post", url: "/users", data: userData }),
//   });
// };
