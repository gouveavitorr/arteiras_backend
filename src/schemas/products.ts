import { z } from "zod";

export const ProductCreateRequest = z.object({
    name: z.string().max(150).min(3),
    description: z.string().max(150).min(3),
    storeId: z.string().min(1),
    categoryId: z.string().min(1),
    price: z.number().min(0),
    weight: z.number().min(0),
    size: z.number().min(0),
    quantity: z.number().min(0),
})
