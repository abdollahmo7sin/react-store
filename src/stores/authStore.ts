import { create } from "zustand"
import { persist } from "zustand/middleware";
import type { LoginResponse } from "../types/auth";

interface AuthState {
    user: LoginResponse | null
    login: (user: LoginResponse) => void
    logout: () => void
}
export const useAuthStore = create<AuthState>()(
    persist((set) => ({
        user: null,
        login: (user) => set({ user }),
        logout: () => set({ user: null })

    }), {
        name: 'auth'
    })
)
