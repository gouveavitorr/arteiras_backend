import jwt from "jsonwebtoken"
import { Payload } from "../utils/types"

export async function verify(token: string) {
    try {
        return jwt.verify(token, process.env.AUTH_SECRET!)
    } catch (error) {
        throw new Error(`Erro: ${error}`)
    }
}

export async function sign(payload: Payload) {
    return jwt.sign(payload, process.env.AUTH_SECRET!, {
        expiresIn: "1h"
    })
}
