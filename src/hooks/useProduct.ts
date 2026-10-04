import { useQuery } from "@tanstack/react-query"
import { getProduct } from "../services/products"

export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProduct(id),
        enabled: !Number.isNaN(id)
    })

}