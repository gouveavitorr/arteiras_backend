import { Role } from '@prisma/client'

export interface Payload {
    id: string,
    userId: string, // duplicated
    name: string,
    email: string,
    role: Role
}

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
export const statusCodes = {
    successful: 200,
    created: 201,
    accepted: 202,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    serverError: 500,
}

declare module 'fastify' {
    interface FastifyRequest {
        user?: Payload
    }
}

