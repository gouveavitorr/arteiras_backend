import { z } from "zod";

export const CategoryCreateRequest = z.object({
    name: z.string().max(150).min(3),
})

export const CategoryUpdateRequest = z.object({
    name: z.string().max(150).min(3),
})
