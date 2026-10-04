import { Link } from "react-router";
import type { ProductType } from "../types/product";
import { useCartStore } from "../stores/cartStore";
import { formatPrice } from "../utils/formatPrice";
import { toast } from "sonner";
import { formatNumber } from "../utils/formatNumber";



function ProductCard({ product }: { product: ProductType }) {
    const addItem = useCartStore((state) => state.addItem)
    const handleAddToCart = () => {

        const addedQuantity = addItem({ id: product.id, quantity: 1, stock: product.stock })
        if (addedQuantity === 0) {
            toast.warning('⚠️ في سلتك أقصى كمية متاحة من المنتج ده')
        } else {
            toast.success(`تم إضافة ${formatNumber(addedQuantity)} قطعة من المنتج`)
        }
    }
    return (
        <div className="single-product-card rounded-2xl overflow-hidden border border-line hover:shadow-md transition-all hover:-translate-y-1">

            <div className="img-wrapper">
                <Link to={`/product/${product.id}`}>
                    <img src={product.images[0]} alt={product.title} loading="lazy" className="w-full aspect-square object-cover" />
                </Link>
            </div>
            <div className="p-4">
                <div className="product-info flex flex-col justify-between gap-2 h-full  ">
                    <div className="category">
                        <Link to={`/products?category=${product.category}`} className="text-link text-gray-500 text-sm  block hover:text-forest">{product.category}</Link>
                    </div>
                    <div className="title">
                        <Link to={`/product/${product.id}`} className="text-lg font-medium text-link hover:text-brand">{product.title}</Link>
                    </div>
                    <div className="price font-bold text-brand text-xl">
                        {formatPrice(product.price)}

                    </div>


                </div>
                <div className="product-actions mt-4">
                    <button className='add-to-cart-btn transition-colors  flex gap-3 items-center cursor-pointer bg-line p-3 rounded-3xl w-full justify-center hover:bg-brand hover:text-white disabled:bg-red-100 disabled:cursor-not-allowed disabled:text-red-700 disabled:hover:bg-red-100 disabled:hover:text-red-700' disabled={product.stock === 0} onClick={handleAddToCart}>
                        {product.stock > 0 ? 'إضافة إلى السلة' : 'نفذت الكمية'}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </button>

                </div>
            </div>

        </div>
    );
}

export default ProductCard;