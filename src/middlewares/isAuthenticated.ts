import { FastifyRequest, FastifyError } from "fastify";
import { verify } from "../configs/jwt";
import { Payload, statusCodes } from "../utils/types";

export async function isAuthenticated(req: FastifyRequest) {
    const token = req.cookies.token;
    if (!token) {
        const err = new Error("Token not provided") as FastifyError
        err.statusCode = statusCodes.unauthorized
        throw err
    }

    try {
        const payload = await verify(token);

        req.user = payload as Payload;
    } catch (_err) {
        const err = new Error("Invalid token") as FastifyError
        err.statusCode = statusCodes.unauthorized
        throw err
    }
}
