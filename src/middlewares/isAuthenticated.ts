import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "../configs/jwt";

export async function isAuthenticated(req: FastifyRequest, reply: FastifyReply) {
    const rawToken = req.headers.authorization
    if (!rawToken) {
        throw new Error("Invalid token")
    }
    const tokenParts = rawToken.split("Bearer ")
    const accessToken = tokenParts?.[1]

    const payload = await verify(accessToken)

    if (!payload) {
        throw new Error("Invalid token")
    }
}