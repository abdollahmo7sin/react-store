import { Link, useLocation } from "react-router"
import { formatPrice } from "../utils/formatPrice";
import { formatNumber } from "../utils/formatNumber";
import type { OrderResponse } from "../types/order";

export const OrderSuccess = () => {
    const location = useLocation();
    const order = location.state as OrderResponse | null

    if (!order) return (
        <section className="success-page max-w-7xl mx-auto px-4 py-6 md:py-12 flex justify-center">
            <div className="w-full max-w-md bg-white border border-line rounded-2xl p-6 md:p-10 flex flex-col items-center gap-4 text-center">
                <h1 className="text-2xl font-bold">لا يوجد طلب</h1>
                <p className="text-gray-600 leading-relaxed">
                    يجب عليك اضافة منتجات للسلة أولا ثم اتمام عمليه الشراء
                </p>
                <Link to="/products" className="w-full bg-brand text-white font-semibold py-3.5 rounded-xl hover:bg-ink transition-colors mt-1">
                    متابعة التسوق
                </Link>
            </div>
        </section>
    )
    return (
        <section className="success-page max-w-7xl mx-auto px-4 py-6 md:py-12 flex justify-center">
            <div className="w-full max-w-md bg-white border border-line rounded-2xl p-6 md:p-10 flex flex-col items-center gap-4 text-center">

                {/* Success Icon */}
                <div className="size-16 rounded-full bg-green-50 flex items-center justify-center text-forest">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="size-8" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold">تم استلام طلبك</h1>
                <p className="text-gray-600 leading-relaxed">
                    هنتواصل معاك على رقم الموبايل لتأكيد الطلب قبل الشحن.
                </p>

                {/* Order Details */}
                <dl className="w-full bg-cream rounded-xl p-4 flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                        <dt className="text-gray-600">رقم الطلب</dt>
                        <dd className="font-bold"># {formatNumber(order.id)}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-gray-600">عدد القطع</dt>
                        <dd>{formatNumber(order.totalQuantity)}</dd>
                    </div>
                    <div className="flex flex-col">
                        <dt className="text-brand font-bold self-start mb-4">المنتجات</dt>
                        <dd className="flex flex-col w-full ">
                            {order.products.map((item) => (
                                <div key={item.id} className="flex justify-between w-full">

                                    <p>{item.title} x {item.quantity}</p>

                                    <p>{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </dd>
                    </div>
                    <div className="flex justify-between mt-5 bg-ink/5 py-2 px-2 rounded-md">
                        <dt className="text-gray-600">الإجمالي</dt>
                        <dd className="font-bold text-brand">{formatPrice(order.total)} </dd>
                    </div>

                </dl>

                <Link to="/products" className="w-full bg-brand text-white font-semibold py-3.5 rounded-xl hover:bg-ink transition-colors mt-1">
                    متابعة التسوق
                </Link>
            </div>
        </section>
    )
}
