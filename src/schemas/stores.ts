import { z } from "zod";

export const StoreCreateRequest = z.object({
    name: z.string().max(150).min(3),
    description: z.string().min(1),
    image: z.string().min(1),
    sellerId: z.string().min(1),
    phoneNumber: z.string(),
    instagramId: z.string(),
    facebookId: z.string(),
})

export const StoreUpdateRequest = z.object({
    name: z.string().max(150).min(3),
    description: z.string().min(1),
    image: z.string().min(1),
    sellerId: z.string().min(1),
    phoneNumber: z.string(),
    instagramId: z.string(),
    facebookId: z.string(),
})
