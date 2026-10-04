import { Link, useParams } from "react-router"
import { useProduct } from "../hooks/useProduct"
import { useState } from "react"
import { ProductSkeleton } from "../components/skeleton/product"
import { ErrorPage } from "./404"
import { Quantity } from "../components/Quantity"
import { useCartStore } from "../stores/cartStore"
import { formatPrice } from "../utils/formatPrice"
import { formatNumber } from "../utils/formatNumber"
import { toast } from "sonner"

export const ProductPage = () => {
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)
    const { data: product, isLoading, isError } = useProduct(Number(id))
    const addItem = useCartStore((state) => state.addItem)

    if (isLoading) {
        return (
            <section className="product-page max-w-7xl mx-auto px-4 min-h-100dvh">
                <ProductSkeleton />
            </section>
        )
    }

    if (isError) {

        return <ErrorPage />
    }
    if (!product) return <ErrorPage />
    const handleAddToCart = () => {
        const addedQuantity = addItem({ id: product.id, quantity, stock: product.stock })
        if (addedQuantity === 0) {
            toast.warning('في سلتك أقصى كمية متاحة من المنتج')
        } else if (addedQuantity < quantity) {
            toast.warning(`الكمية المطلوبة اكبر من المتاحة ، تم اضافة ${formatNumber(addedQuantity)} قطعة فقط`)
        } else {
            toast.success(`تم إضافة ${formatNumber(addedQuantity)} قطعة من المنتج`)
        }
        
    }

    return (
        <section className="product-page max-w-7xl mx-auto px-4 min-h-100dvh">

            <div className="md:grid grid-cols-3 gap-10">
                <div className="product-image overflow-hidden rounded-xl border border-gray-200 bg-white ">
                    <img src={product.images[0]} loading="lazy" alt={product.title} className="w-full" />
                </div>
                <div className="product-info col-span-2 mt-5 md:mt-0">
                    <div className="category">
                        <Link to={`/products?category=${product.category}`} className="text-link text-gray-500 text-sm  block hover:text-forest capitalize">{product.category}</Link>
                    </div>

                    <h1 className="text-4xl font-semibold mt-2">{product?.title}</h1>
                    <div className="flex items-center gap-3 mt-4">
                        <div className="rating flex items-center gap-2 ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#C9902B" className="size-5">
                                <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xl font-semibold">{formatNumber(product.rating)}</p>
                        </div>
                        |
                        <p className={`${product.stock === 0 ? 'text-red-500' : 'text-green-700'}`}>
                            {product.stock === 0 ? 'نفذت الكمية' : `متبقي : ${formatNumber(product.stock)} قطعه`}
                        </p>

                    </div>
                    <p className="text-4xl font-semibold text-brand mt-5 flex gap-3 items-center"> {formatPrice(product?.price || 0)}
                        {product.discountPercentage > 0 && <span className="text-sm bg-red-100 p-1 rounded text-brand">خصم : {formatNumber(product.discountPercentage)}%</span>}

                    </p>
                    <div className="mt-3">
                        <h3 className="font-semibold text-lg mb-2">الوصف</h3>
                        <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
                    </div>

                    {product.stock > 0 &&
                        <div className="add-to-cart flex gap-3 mt-5">

                            <Quantity stock={product.stock} quantity={quantity} setQuantity={setQuantity} />
                            <button className="bg-brand grow text-white px-6 py-3 rounded-xl hover:bg-ink cursor-pointer transition-colors inline-block" onClick={handleAddToCart}>
                                إضافة إلى السلة
                            </button>

                        </div>
                    }

                </div>
            </div>
        </section>
    )
}