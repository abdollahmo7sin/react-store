export const formatPrice = (price: number) => {
    return price.toLocaleString('ar-EG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }) + " ج.م"
}