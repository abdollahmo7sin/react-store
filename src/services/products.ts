import api from "./api";
import type { ProductType, ProductsResponse, ProductApiParams } from "../types/product";


export const getProducts = async (params: ProductApiParams = {}) => {
    const { category, ...rest } = params;
    const res = await api.get<ProductsResponse>(`${category ? `products/category/${category}` : 'products'}`, { params: rest });
    return res.data;
}

export const getProduct = async (id: number) => {
    const res = await api.get<ProductType>(`products/${id}`);
    return res.data;

}

export const getCategoriesList = async () => {
    const res = await api.get<string[]>(`products/category-list`);
    return res.data;

}
 