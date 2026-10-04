import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getProducts } from "../services/products"
import type { ProductApiParams } from "../types/product";

export const useProducts = (params: ProductApiParams = {}) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getProducts(params),
        placeholderData: keepPreviousData
        
    })
}