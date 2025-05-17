import { FastifyRequest, FastifyReply } from "fastify"
import { signup, edit, signin } from "../usecases/user.usercases"
import { UserSignupRequest, UserSignIn, UserEditRequest } from "../schemas/users"

export class UserController {
    async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            UserSignupRequest.parse(req.body)
            const { name, email, password }: any = req.body
            const user = await signup({ name, email, password })

            return reply.code(200).send(user)

        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async update(req: FastifyRequest, reply: FastifyReply) {
        try {
            UserEditRequest.parse(req.body)
            const { id } = req.user
            const { name, email, old_password, password }: any = req.body
            const user = await edit(id, { name, email, old_password, password })

            return reply.code(200).send(user)
            
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async login(req: FastifyRequest, reply: FastifyReply) {
        try {
            UserSignIn.parse(req.body)
            const { email, password }: any = req.body
            const user = await signin({ email, password })
            return reply.code(200).send(user)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
}