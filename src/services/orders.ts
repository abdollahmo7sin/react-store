import { type OrderResponse, type OrderType } from "../types/order";
import api from "./api";


export const createOrder = async (orderData: OrderType) => {
    const res = await api.post<OrderResponse>("carts/add", orderData);
    return res.data;
}