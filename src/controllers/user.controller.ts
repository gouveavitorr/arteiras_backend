import { FastifyRequest, FastifyReply } from "fastify"
import { signup } from "../usecases/user.usercases"

export class UserController {
    async createUser(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { name, email, password }: any = req.body
            const user = await signup({ name, email, password })
            
            return reply.code(200).send(user)
            
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
}