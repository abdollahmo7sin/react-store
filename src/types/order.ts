export type OrderType = {
    userId: number;
    products: {
        id: number;
        quantity: number;
    }[];
}

export type OrderResponse = {
    id: number;
    products: {
        id: number;
        title: string;
        price: number;
        quantity: number;
    }[];
    totalQuantity: number;
    total: number;
}
