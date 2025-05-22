import { FastifyRequest } from "fastify";
import { verify } from "../configs/jwt";
import { JwtPayload } from "jsonwebtoken";

export async function isAuthenticated(req: FastifyRequest<{Body: { user: string | JwtPayload }}>) {
    const rawToken = req.headers.authorization
    if (!rawToken) {
        throw new Error("Invalid token")
    }
    const tokenParts = rawToken.split("Bearer ")
    const accessToken = tokenParts?.[1]

    const payload = await verify(accessToken)

    req.body.user = payload

    if (!payload) {
        throw new Error("Invalid token")
    }
}
