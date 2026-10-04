export type ProductType = {
    id: number;
    title: string;
    price: number;
    images: string[];
    description: string;
    category: string;
    thumbnail: string;
    rating: number,
    stock: number,
    discountPercentage: number
}

export type ProductsResponse = {
    products: ProductType[];
    total: number;
    skip: number;
    limit: number;
}

export type ProductApiParams = {
    limit?: number;
    skip?: number;
    category?: string | null

}