import { FastifyError, FastifyRequest } from "fastify";
import { verify } from "../configs/jwt";
import { Payload, statusCodes } from "../utils/types";

export async function isAdmin(req: FastifyRequest) {
    const token = req.cookies.token;

    if (!token) {
        throw new Error("Not logged in")
    }

    try {
        const payload = (await verify(token)) as Payload

        if (payload.role != "ADMIN")
            throw new Error("User is not an admin")

        req.user = payload;
    } catch (data) {
        const err = new Error("Invalid token") as FastifyError
        err.statusCode = statusCodes.unauthorized
        err.log = data as string
        throw err
    }
}

