import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type loginFormType } from "../schemas/auth"
import { useLogin } from "../hooks/useAuth"
import { Navigate, useLocation } from "react-router"
import { useAuthStore } from "../stores/authStore"
const inputClass = "w-full bg-white border border-line rounded-lg px-3 py-3 outline-none aria-invalid:border-red-600 focus:border-brand transition-colors"
const labelClass = "block text-sm font-medium text-gray-600 mb-1.5"

export const Login = () => {
    const user = useAuthStore((state) => state.user)
    const location = useLocation()

    const { mutate: loginMutation, isPending, isError } = useLogin()
    const { register, handleSubmit, formState: { errors } } = useForm<loginFormType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })
    const onSubmit = (data: loginFormType) => {
        loginMutation(data)
    }
    if (user) return <Navigate to={location.state?.from || "/"} replace />

    return (
        <section className="login-page max-w-7xl mx-auto px-4 py-6 md:py-12 flex justify-center">
            <div className="w-full max-w-md flex flex-col gap-5">

                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">تسجيل الدخول</h1>
                    <p className="text-sm text-gray-600">ادخل بياناتك عشان تكمل الطلب</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-line rounded-2xl p-5 md:p-6 flex flex-col gap-4">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className={labelClass}>اسم المستخدم</label>
                        <input
                            {...register("username")}
                            id="username"
                            type="text"
                            aria-invalid={!!errors.username}
                            aria-describedby="usernameError"
                            autoComplete="username"
                            dir="ltr"
                            placeholder="emilys"
                            className={`${inputClass} text-end`}
                        />
                        {errors.username && (
                            <p id="usernameError" className="text-sm text-red-700 mt-1.5">{errors.username.message}</p>
                        )}

                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className={labelClass}>كلمة المرور</label>
                        <input
                            {...register("password")}
                            id="password"
                            type="password"
                            aria-invalid={!!errors.password}
                            aria-describedby="passwordError"
                            autoComplete="current-password"
                            dir="ltr"
                            placeholder="••••••••"
                            className={`${inputClass} text-end`}
                        />
                        {errors.password && (
                            <p id="passwordError" className="text-sm text-red-700 mt-1.5">{errors.password.message}</p>
                        )}
                    </div>

                    {isError && (
                        <div role="alert" className="flex items-center gap-2 bg-red-50 rounded-lg px-3 py-2.5 text-sm text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 shrink-0" aria-hidden="true">
                                <circle cx="12" cy="12" r="9" />
                                <path strokeLinecap="round" d="M12 8v5M12 16h.01" />
                            </svg>
                            <span>اسم المستخدم أو كلمة المرور غير صحيحة</span>
                        </div>
                    )}

                    <button disabled={isPending} type="submit" className="bg-brand text-white font-semibold py-3.5 rounded-xl hover:bg-ink transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isPending ? "جاري الدخول" : "دخول"}
                    </button>
                </form>

                <p className="bg-cream rounded-lg px-4 py-3 text-xs text-gray-600 text-center leading-relaxed">
                    حساب للتجربة: <span dir="ltr">emilys / emilyspass</span>
                </p>
            </div>
        </section>
    )
}
