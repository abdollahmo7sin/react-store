import { create } from "zustand";
import { persist } from "zustand/middleware";


interface Item {
    id: number;
    quantity: number;
}
interface CartState {
    items: Item[]
    addItem: (product: Item & { stock: number }) => number
    removeItem: (id: number) => void
    clearCart: () => void
    updateQuantity: (id: number, quantity: number) => void
}
export const useCartStore = create<CartState>()(
    persist((set, get) => ({
        items: [],
        addItem: (product) => {
            const currentQuantity = get().items.find((item) => item.id === product.id)?.quantity ?? 0
            const newQuantity = Math.min(currentQuantity + product.quantity, product.stock)

            set((state) => {
                const isInCart = state.items.some((item) => item.id === product.id)
                if (isInCart) {
                    return {
                        items: state.items.map((item) => {
                            if (item.id === product.id) {
                                return { ...item, quantity: newQuantity }
                            }
                            return item
                        })
                    }
                } else {
                    return {
                        items: [...state.items, { id: product.id, quantity: newQuantity }]
                    }
                }
            })
            return newQuantity - currentQuantity
        },
        removeItem: (id) => {
            set((state) => {
                return {
                    items: state.items.filter((item) => {
                        return item.id !== id
                    })
                }
            })
        },
        clearCart: () => {
            set({ items: [] })
        },
        updateQuantity: (id, quantity) => {
            set((state) => {
                return {
                    items: state.items.map((item) => {
                        if (item.id === id) {
                            return { ...item, quantity }
                        } else {
                            return item
                        }
                    })
                }
            })
        }


    }), {
        name: "cart",
    }))