import type { LoginRequest, LoginResponse } from "../types/auth";
import api from "./api";

export const loginRequest = async (user: LoginRequest) => {
    const response = await api.post<LoginResponse>('auth/login', user)
    return response.data
}

