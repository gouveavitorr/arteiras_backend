import { z } from "zod";

export const UserSignupRequest = z.object({
    name: z.string().max(150).min(3),
    email: z.string().email(),
    password: z.string().min(8).max(50)
})

export const UserUpdateCredentialsRequest = z.object({
    email: z.string().email().nullish(),
    password: z.string().min(8).max(50).nullish(),
    old_password: z.string().min(8).max(50).nullish()
})

export const UserSignInRequest = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50)
})

