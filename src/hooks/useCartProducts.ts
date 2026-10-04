import { useQueries } from "@tanstack/react-query"
import { getProduct } from "../services/products"
import { useCartStore } from "../stores/cartStore"

export const useCartProducts = () => {
    const items = useCartStore(state => state.items)

    const { data: products, isPending, isError } = useQueries({
        queries: items.map(item => ({
            queryKey: ["product", item.id],
            queryFn: () => getProduct(item.id)
        })),
        combine: (postQueries) => {
            return {
                data: postQueries.map((query) => ({ ...query.data, error: query.isError })),
                isPending: postQueries.some((query) => query.isPending),
                isError: postQueries.some((query) => query.isError),
            }
        },
    })



    const cartItems = items.map((item, index) => {
        return {
            ...item,
            title: products[index]?.title,
            price: products[index]?.price,
            stock: products[index]?.stock,
            thumbnail: products[index]?.thumbnail,
            images: products[index]?.images,
            error: products[index]?.error,
        }
    })
    const subTotal = cartItems.reduce((acc, item) => acc + ((item.price ?? 0) * item.quantity), 0)





    return { cartItems, isPending, isError, subTotal }
}