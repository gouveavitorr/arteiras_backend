import { FastifyRequest } from "fastify";
import { verify } from "../configs/jwt";
import { Payload } from "../utils/types";

// export async function isAuthenticated(req: FastifyRequest) {
//     const rawToken = req.headers.authorization
//     if (!rawToken) {
//         throw new Error("Token not provided")
//     }
//
//     const tokenParts = rawToken.split("Bearer ")
//
//     if (!tokenParts[1]) {
//         throw new Error("Invalid token")
//     }
//
//     const accessToken = tokenParts[1]
//
//     const payload = await verify(accessToken)
//
//     if (!payload) {
//         throw new Error("Invalid token")
//     }
//
//     req.user = payload as Payload
// }

export async function isAuthenticated(req: FastifyRequest) {
    const token = req.cookies.token;
    if (!token) {
        throw new Error("Not logged in")
    }

    try {
        const payload = await verify(token);

        req.user = payload as Payload;
    } catch (err) {
        throw new Error("Invalid token")
    }
}
