import { FastifyRequest, FastifyError } from "fastify";
import { verify } from "../configs/jwt";
import { Payload, statusCodes } from "../utils/types";

export async function isAuthenticated(req: FastifyRequest) {
    const rawToken = req.headers.authorization
    if (!rawToken) {
        const err = new Error("Token not provided") as FastifyError
        err.statusCode = statusCodes.unauthorized
        throw err
    }

    const tokenParts = rawToken.split("Bearer ")

    if (!tokenParts[1]) {
        const err = new Error("Invalid token") as FastifyError
        err.statusCode = statusCodes.unauthorized
        throw err
    }

    const accessToken = tokenParts[1]

    const payload = await verify(accessToken)

    if (!payload) {
        const err = new Error("Invalid token") as FastifyError
        err.statusCode = statusCodes.unauthorized
        throw err
    }

    req.user = payload as Payload
}
