import jwt from "jsonwebtoken"

export async function verify(token: any) {
    try {
        return jwt.verify(token, process.env.AUTH_SECRET!)
    } catch (error) {
        throw new Error(`Erro: ${error}`)
    }
}

export async function sign(payload: any) {
    return jwt.sign(payload, process.env.AUTH_SECRET!, {
        expiresIn: "1h"
    })
}
