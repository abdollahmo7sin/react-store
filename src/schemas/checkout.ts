import z from "zod"

export const checkoutSchema = z.object({
    name: z.string().trim().min(1, "الاسم مطلوب"),
    phone: z.string().trim().min(1, "رقم الهاتف مطلوب").regex(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صالح"),
    governorate: z.string().min(1, "المحافظة مطلوبة"),
    address: z.string().trim().min(1, "العنوان مطلوب"),
})

export type checkoutFormType = z.infer<typeof checkoutSchema>


