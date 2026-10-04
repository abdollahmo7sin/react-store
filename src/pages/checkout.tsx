import { formatPrice } from "../utils/formatPrice";
import { useCreateOrder } from "../hooks/useOrder";
import { Link, useNavigate } from "react-router";
import { formatNumber } from "../utils/formatNumber";
import { useCartProducts } from "../hooks/useCartProducts";
import { checkoutSchema, type checkoutFormType } from "../schemas/checkout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../stores/authStore";


const inputClass = "w-full bg-white border border-line rounded-lg px-3 py-3 outline-none aria-invalid:border-red-600 focus:border-brand transition-colors"
const labelClass = "block text-sm font-medium text-gray-600 mb-1.5"



export const Checkout = () => {
    const { mutate: createOrderMutation, isPending, isError } = useCreateOrder()
    const navigate = useNavigate();
    const { cartItems: products, subTotal,isError:productsError } = useCartProducts()
    const user = useAuthStore((state) => state.user)

    const { register, handleSubmit, formState: { errors } } = useForm<checkoutFormType>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            name: "",
            phone: "",
            governorate: "",
            address: ""
        }
    })


    const onSubmit = () => {
        if (!user) return
        createOrderMutation({
            userId: user.id,
            products: products.map(product => ({ id: product.id, quantity: product.quantity }))
        }, {
            onSuccess: data => navigate('/success', { state: data }),

        })
    }
    if (products.length === 0) return (
        <section className="checkout-page max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center gap-4 py-20">
                <h1 className="text-2xl font-bold">لا يمكن اتمام طلب لسلة فارغة</h1>
                <Link to="/" className="bg-brand text-white font-semibold py-3.5 px-5 rounded-xl hover:bg-ink transition-colors cursor-pointer">اذهب للتسوق</Link>
            </div>
        </section>
    )

    return (
        <section className="checkout-page max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6">إتمام الطلب</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                {/* Shipping Details */}
                <div className="md:col-span-2 bg-white border border-line rounded-2xl p-5 md:p-6 flex flex-col gap-4">
                    <h2 className="text-lg font-bold">بيانات الشحن</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className={labelClass}>الاسم بالكامل</label>
                            <input {...register("name")} id="name" type="text" autoComplete="name" aria-invalid={!!errors.name} placeholder="مثال: أحمد محمد" className={inputClass} />
                            {errors.name && <p className="text-sm text-red-700 mt-1.5">{errors.name.message}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className={labelClass}>رقم الموبايل</label>
                            <input
                                {...register("phone")}
                                id="phone"
                                type="tel"
                                inputMode="numeric"
                                autoComplete="tel"
                                dir="ltr"
                                placeholder="01xxxxxxxxx"
                                aria-invalid={!!errors.phone}
                                aria-describedby="phone-error"
                                className={`${inputClass} text-end `}
                            />
                            {errors.phone && <p id="phone-error" className="text-sm text-red-700 mt-1.5">{errors.phone.message}</p>}
                        </div>
                    </div>

                    {/* Governorate */}
                    <div>
                        <label htmlFor="governorate" className={labelClass}>المحافظة</label>
                        <select
                            {...register("governorate")}
                            aria-invalid={!!errors.governorate}
                            className={inputClass}
                            id="governorate"
                        >
                            <option value="" disabled>اختر المحافظة</option>
                            <option value="cairo">القاهرة</option>
                            <option value="giza">الجيزة</option>
                            <option value="alexandria">الإسكندرية</option>
                            <option value="dakahlia">الدقهلية</option>
                            <option value="sharqia">الشرقية</option>
                            <option value="qalyubia">القليوبية</option>
                        </select>
                        {errors.governorate && <p id="governorate-error" className="text-sm text-red-700 mt-1.5">{errors.governorate.message}</p>}

                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className={labelClass}>العنوان بالتفصيل</label>
                        <input
                            {...register("address")}
                            id="address"
                            type="text"
                            autoComplete="street-address"
                            placeholder="الشارع، رقم المبنى، الشقة"
                            aria-invalid={!!errors.address}
                            className={inputClass}
                        />
                        {errors.address && <p id="address-error" className="text-sm text-red-700 mt-1.5">{errors.address.message}</p>}

                    </div>

                    <div className="h-px bg-line my-1" />

                    {/* Payment Method */}
                    <fieldset>
                        <legend className="font-semibold mb-3">طريقة الدفع</legend>
                        <label className="flex items-center gap-3 p-4 border-2 border-brand bg-red-50 rounded-xl cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                defaultChecked
                                className="size-5 accent-brand" />
                            <span className="font-semibold">الدفع عند الاستلام</span>
                        </label>
                    </fieldset>
                </div>

                {/* Order Summary: sticky bottom bar on mobile, sticky side card on desktop */}
                <aside className="sticky bottom-0 -mx-4 md:mx-0 md:top-28 md:bottom-auto">
                    <div className="bg-white border-t md:border border-line md:rounded-2xl p-5 flex flex-col gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] md:shadow-none">
                        <h2 className="hidden md:block text-lg font-bold">ملخص الطلب</h2>

                        {/* Order Items */}
                        <ul className="hidden md:flex flex-col gap-2 text-sm text-gray-600">
                            {products.map((product) => (
                                <li key={product.id} className="flex justify-between gap-3">
                                    <span className="truncate">{product.title} × {formatNumber(product.quantity)}</span>
                                    <span className="shrink-0 text-ink">{formatPrice((product.price || 0) * product.quantity)}</span>
                                </li>
                            ))}

                        </ul>

                        <div className="hidden md:block h-px bg-line" />

                        <div className="flex justify-between text-gray-600">
                            <span>الشحن</span>
                            <span className="text-forest font-semibold">مجاني</span>
                        </div>

                        <div className="flex justify-between items-baseline">
                            <span className="font-semibold">الإجمالي</span>
                            <span className="text-2xl font-bold text-brand">{formatPrice(subTotal)}</span>
                        </div>

                        <p className="bg-cream rounded-lg px-3 py-2.5 text-xs text-gray-600 leading-relaxed">
                            الإجمالي النهائي يتأكد من الخادم عند إرسال الطلب.
                        </p>
                        <button type="submit" disabled={isPending || products.length === 0 || productsError} className="bg-brand text-white font-semibold py-3.5 rounded-xl hover:bg-ink transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isPending ? "جاري التنفيذ..." : "تأكيد الطلب"}
                        </button>
                        {isError && <p className="text-sm text-red-700 mt-1.5">حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.</p>}
                    </div>
                </aside>

            </form>
        </section>
    )
}
