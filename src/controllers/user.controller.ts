import { FastifyRequest, FastifyReply } from "fastify"
import { signUp, edit, signIn, getUserProfile, updateUserProfile, getUserOrders } from "../usecases/user.usecases"
import { UserSignupRequest, UserSignInRequest, UserEditRequest, } from "../schemas/users"

export class UserController {
    async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            UserSignupRequest.parse(req.body)
            const { name, email, password }: any = req.body
            const user = await signUp({ name, email, password })

            return reply.code(200).send(user)

        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async update(req: FastifyRequest, reply: FastifyReply) {
        try {
            const userData = UserEditRequest.parse(req.body)
            const { id } = req.user
            const user = await edit(id, userData)

            return reply.code(200).send(user)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async login(req: FastifyRequest, reply: FastifyReply) {
        try {
            UserSignInRequest.parse(req.body)
            const { email, password }: any = req.body
            const user = await signIn({ email, password })
            return reply.code(200).send(user)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async getProfile(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id }: any = req.user
            const profile = await getUserProfile(id)
            return reply.code(200).send(profile)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async updateProfile(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id }: any = req.user
            const { cpf, phoneNumber }: any = req.body

            const updatedUser = await updateUserProfile(id, {
                cpf: cpf,
                phoneNumber,
            })

            return reply.code(200).send(updatedUser)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async getOrders(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id }: any = req.user
            const orders = await getUserOrders(id)
            return reply.code(200).send(orders)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
}
