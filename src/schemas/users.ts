import { z } from "zod";


export const UserSignupRequest = z.object({
    name: z.string().max(150).min(3),
    email: z.string().email(),
    password: z.string().min(8).max(50)
})

export const UserEditRequest = z.object({
    name: z.string().max(150).min(3).nullable(),
    email: z.string().email().nullable(),
    password: z.string().min(8).max(50).nullable(),
    old_password: z.string().min(8).max(50).nullable()
})

export const UserSignInRequest = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50)
})

