import { useQuery } from "@tanstack/react-query"
import { getCategoriesList } from "../services/products"

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategoriesList
    })
}