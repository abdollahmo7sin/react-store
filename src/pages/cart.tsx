import { Link } from "react-router"
import { Quantity } from "../components/Quantity"
import { useCartStore } from "../stores/cartStore"
import { useCartProducts } from "../hooks/useCartProducts";
import { CartSkeleton } from "../components/skeleton/cart";
import { formatPrice } from "../utils/formatPrice";

export const Cart = () => {
    const removeItem = useCartStore(state => state.removeItem);
    const updateQuantity = useCartStore(state => state.updateQuantity)
    const { cartItems: products, subTotal, isPending } = useCartProducts()





    if (products?.length === 0) {
        return (
            <section className="cart-page max-w-7xl mx-auto px-4">
                <div className="bg-white border border-line rounded-2xl p-10 text-center max-w-lg mx-auto">
                    <h1 className="text-2xl font-bold mb-2">سلة التسوق فارغة</h1>
                    <p className="text-gray-500 mb-6">لم تضف أي منتجات إلى السلة بعد.</p>
                    <Link to="/products" className="inline-block bg-brand text-white px-6 py-3 rounded-xl hover:bg-ink transition-colors">
                        تصفح المنتجات
                    </Link>
                </div>
            </section>
        )
    }
    if (isPending) {
        return (
            <section className="cart-page max-w-7xl mx-auto px-4">
                <h1 className="text-2xl font-bold mb-6">سلة التسوق</h1>
                <CartSkeleton count={products.length} />
            </section>
        );
    }

    return (
        <section className="cart-page max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6">سلة التسوق</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                {/* Cart Items */}
                <div className="md:col-span-2 flex flex-col gap-4">
                    {products?.map((product) => {
                        if (product.error) {
                            return (
                                <article key={product.id} className="flex gap-4 bg-white border border-line rounded-2xl p-4">
                                    <div className="shrink-0 w-20 md:w-24 aspect-square rounded-xl overflow-hidden bg-cream border border-line">
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                            <span className="text-gray-400">صورة المنتج</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-wrap items-center justify-between gap-3 min-w-0">
                                        <div className="w-full md:w-auto md:flex-1 min-w-0">
                                            <h4 className="text-base md:text-lg font-semibold truncate">اسم المنتج</h4>
                                            <p className="text-sm font-semibold text-red-500">حدث خطأ في تحميل بيانات المنتج</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(product.id)}
                                            className="shrink-0 size-11 flex items-center justify-center rounded-lg text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </article>
                            )
                        }

                        return (
                            < article key={product.id} className="flex gap-4 bg-white border border-line rounded-2xl p-4" >
                                {/* Cart Item Image */}
                                < div className="shrink-0 w-20 md:w-24 aspect-square rounded-xl overflow-hidden bg-cream border border-line" >
                                    <img src={product?.thumbnail} alt={product?.title} loading="lazy" className="w-full h-full object-cover" />
                                </div>

                                <div className="flex flex-1 flex-wrap items-center justify-between gap-3 min-w-0">
                                    {/* Cart Item Details */}
                                    <div className="w-full md:w-auto md:flex-1 min-w-0">
                                        <h4 className="text-base md:text-lg font-semibold truncate hover:text-brand transition-colors">{product?.title}</h4>
                                        <p className="text-sm font-semibold text-brand mt-1">{formatPrice(product?.price || 0)}</p>
                                    </div>

                                    {/* Cart Item Quantity */}
                                    <div>
                                        <Quantity quantity={product.quantity} setQuantity={(newQuantity) => updateQuantity(product.id, newQuantity)} stock={product?.stock || 0} />
                                    </div>

                                    {/* Cart Item Line Total */}
                                    <p className="md:min-w-28 text-end text-lg font-bold">{formatPrice((product?.price || 0) * product.quantity)}  </p>

                                    {/* Cart Item Actions */}
                                    <button
                                        onClick={() => removeItem(product.id)}
                                        aria-label="حذف المنتج من السلة"
                                        className="shrink-0 size-11 flex items-center justify-center rounded-lg text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </article>
                        )
                    })}

                    <Link to="/products" className="self-start text-brand font-semibold py-2 hover:text-ink transition-colors">
                        → متابعة التسوق
                    </Link>
                </div>

                {/* Order Summary: sticky bottom bar on mobile, sticky side card on desktop */}
                <aside className="sticky bottom-0 -mx-4 md:mx-0 md:top-28 md:bottom-auto">
                    <div className="bg-white border-t md:border border-line md:rounded-2xl p-5 flex flex-col gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] md:shadow-none">
                        <h2 className="hidden md:block text-lg font-bold">ملخص الطلب</h2>

                        <div className="flex justify-between text-gray-600">
                            <span>المجموع الفرعي</span>
                            <span className="text-ink">
                                {formatPrice(subTotal)}
                            </span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>الشحن</span>
                            <span className="text-forest font-semibold">مجاني</span>
                        </div>

                        <div className="h-px bg-line" />

                        <div className="flex justify-between items-baseline">
                            <span className="font-semibold">الإجمالي</span>
                            <span className="text-2xl font-bold text-brand">{formatPrice(subTotal)}</span>
                        </div>

                        <Link to="/checkout" className="bg-brand text-white text-center font-semibold py-3.5 rounded-xl hover:bg-ink transition-colors">
                            إتمام الطلب
                        </Link>
                    </div>
                </aside>

            </div >
        </section >
    )
}
