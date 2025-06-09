import { z } from "zod";

export const AddAddressRequest = z.object({
    street: z.string().max(200).min(2),
    number: z.string(),
    neighborhood: z.string().max(200).min(2).nullish(),
    city: z.string().max(200).min(2),
    state: z.string(),
    country: z.string().max(150).min(2),
    postalCode: z.string().max(9).min(8),
    recipient: z.string(),
    reference: z.string().nullish(),
})

export const UpdateAddressRequest = z.object({
    street: z.string().max(200).min(2).nullish(),
    number: z.string().nullish(),
    neighborhood: z.string().max(200).min(2).nullish(),
    city: z.string().max(200).min(2).nullish(),
    state: z.string().nullish(),
    country: z.string().max(150).min(2).nullish(),
    postalCode: z.string().max(9).min(8).nullish(),
    recipient: z.string().nullish(),
    reference: z.string().nullish(),
})