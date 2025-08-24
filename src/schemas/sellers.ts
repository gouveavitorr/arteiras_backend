import { z } from "zod";

export const SellerCreateRequest = z.object({
    name: z.string().max(150).min(3),
    cpf: z.string().max(11),
    phoneNumber: z.string(),
})

export const SellerUpdateRequest = z.object({
    name: z.string().max(150).min(3),
    cpf: z.string().max(11),
    phoneNumber: z.string(),
})
