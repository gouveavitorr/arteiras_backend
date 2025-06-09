import { FastifyRequest, FastifyReply } from "fastify"
import { signUp, editCredentials, signIn, getUserProfile, updateUserProfile, getUserOrders } from "../usecases/user.usecases"
import { UserSignupRequest, UserSignInRequest, UserUpdateCredentialsRequest, } from "../schemas/users"
import { statusCodes } from "../utils/types"

export class UserController {
    async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            const userData = UserSignupRequest.parse(req.body)
            const user = await signUp(userData)

            return reply.code(statusCodes.successful).send(user)

        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async updateCredentials(req: FastifyRequest, reply: FastifyReply) {
        try {
            const userData = UserUpdateCredentialsRequest.parse(req.body)
            const { id } = req.user!
            const user = await editCredentials(id, userData)

            return reply.code(statusCodes.successful).send(user)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async login(req: FastifyRequest, reply: FastifyReply) {
        try {
            const userData = UserSignInRequest.parse(req.body)
            const user = await signIn(userData)
            return reply.code(statusCodes.successful).send(user)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async getProfile(req: FastifyRequest, reply: FastifyReply) {
        try {
            //parse req
            const { id } = req.user!
            const profile = await getUserProfile(id)
            return reply.code(statusCodes.successful).send(profile)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async updateProfile(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const { name, cpf, phoneNumber }: any = req.body

            const updatedUser = await updateUserProfile(id, {
                name,
                cpf: cpf,
                phoneNumber,
            })

            return reply.code(statusCodes.successful).send(updatedUser)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async getOrders(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const orders = await getUserOrders(id)
            return reply.code(statusCodes.successful).send(orders)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
}
