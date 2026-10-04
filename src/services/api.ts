import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { toast } from "sonner";

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        'Content-Type': 'application/json'
    },
})

api.interceptors.request.use(config => {
    const token = useAuthStore.getState().user?.accessToken
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout()
            toast.error('تم تسجيل خروجك')
        }
        return Promise.reject(error)
    }
)


export default api