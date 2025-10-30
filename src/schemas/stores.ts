import { z } from "zod";

export const StoreCreateRequest = z.object({
    name: z.string().max(150).min(3),
    description: z.string().min(1),
    image: z.string().optional().nullable(),
    sellerId: z.string().min(1),
    phoneNumber: z.string().nullable(),
    instagramId: z.string().nullable(),
    facebookId: z.string().nullable(),
})

export const StoreUpdateRequest = z.object({
    name: z.string().max(150).min(3),
    description: z.string().min(1),
    image: z.string(),
    sellerId: z.string().min(1),
    phoneNumber: z.string(),
    instagramId: z.string(),
    facebookId: z.string(),
})
