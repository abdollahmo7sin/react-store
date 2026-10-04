import { useMutation } from "@tanstack/react-query"
import { loginRequest } from "../services/auth"
import { useAuthStore } from "../stores/authStore";

export const useLogin = () => {
    return useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            useAuthStore.getState().login(data);
        }
    })


}