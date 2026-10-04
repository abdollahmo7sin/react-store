import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../services/orders";
import type { OrderType } from "../types/order";
import { useCartStore } from "../stores/cartStore";

export const useCreateOrder = () => {
    return useMutation({
        mutationFn: (orderData: OrderType) => createOrder(orderData),
        onSuccess: () => {
            useCartStore.getState().clearCart()
        }

    })
}