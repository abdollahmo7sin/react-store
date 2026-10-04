import { useState } from "react"
type Props = {
    quantity: number
    setQuantity: (quantity: number) => void
    stock: number
}
export const Quantity = ({ stock, quantity, setQuantity }: Props) => {
    const [error, setError] = useState<string>("")
    const increase = () => {
        if (quantity < stock) {
            setError("")
            setQuantity(quantity + 1)
        }
    }
    const decrease = () => {
        if (quantity > 1) {
            setError("")
            setQuantity(quantity - 1)
        }
    }
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = Number(e.target.value)

        if (num >= 1 && num <= stock) {
            setQuantity(num)
            setError("")
        } else {
            setError("الكمية غير صحيحة")
        }
    }
    return (
        <>
            <div className="flex gap-2 bg-white border-gray-200 border rounded-xl items-center ">
                <button className="inline-block px-3 text-2xl text-brand cursor-pointer" onClick={increase}>+</button>
                <input className="w-10 border-none text-center outline-none" type="number" min={1} max={stock} value={quantity} onChange={handleInput} />
                <button className="inline-block px-3 text-2xl text-brand cursor-pointer" onClick={decrease}>-</button>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </>
    )

}