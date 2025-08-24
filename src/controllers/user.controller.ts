import { FastifyRequest, FastifyReply } from "fastify"
import { signUp, editCredentials, signIn, getUserProfile, updateUserProfile, getUserOrders, getUsersQty, deleteUser, getUser, getUsers, getUserOrdersQty } from "../usecases/user.usecases"
import { UserSignupRequest, UserSignInRequest, UserUpdateCredentialsRequest, } from "../schemas/users"
import { statusCodes } from "../utils/types"
import { verify } from "../configs/jwt"
import { JwtPayload } from "jsonwebtoken"

export class UserController {
    async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            const userData = UserSignupRequest.parse(req.body)

            const user = await signUp(userData)

            reply.setCookie("token", user.token, {
                partitioned: true,
                httpOnly: true,
                sameSite: "none",
                secure: true, // true in production with HTTPS
                path: "/",
                maxAge: 60 * 60, // 1h
            });

            return reply.code(statusCodes.successful).send(user)

        } catch (error) {
            throw error
        }
    }

    async updateCredentials(req: FastifyRequest, reply: FastifyReply) {
        try {
            const userData = UserUpdateCredentialsRequest.parse(req.body)
            const { id } = req.user!
            const user = await editCredentials(id, userData)

            return reply.code(statusCodes.successful).send(user)
        } catch (error) {
            throw error
        }
    }

    async login(req: FastifyRequest, reply: FastifyReply) {
        try {
            const userData = UserSignInRequest.parse(req.body)
            const user = await signIn(userData)

            reply.setCookie("token", user.token, {
                partitioned: true,
                httpOnly: true,
                sameSite: "none",
                secure: true, // true in production with HTTPS
                path: "/",
                maxAge: 60 * 60, // 1h
            });

            return reply.code(statusCodes.successful).send(user)
        } catch (error) {
            throw error
        }
    }


    async me(req: FastifyRequest, reply: FastifyReply) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return reply.status(401).send({ error: "Missing token" });
            }

            const decoded = await verify(token) as JwtPayload

            const user = await getUserProfile(decoded.id)
            if (!user) {
                return reply.status(401).send({ error: "Invalid token" });
            }

            return reply.code(statusCodes.successful).send(user)
        } catch (err) {
            return reply.status(401).send({ error: "Unauthorized" });
        }
    }

    async logout(_: FastifyRequest, reply: FastifyReply) {
        try {
            reply.clearCookie("token", {
                partitioned: true,
                httpOnly: true,
                sameSite: "none",
                secure: true,
                path: "/",
            });
            return reply.code(statusCodes.successful).send({ message: "Logged out" })
        } catch (error) {
            throw error
        }
    }

    async getProfile(req: FastifyRequest, reply: FastifyReply) {
        try {
            //parse req
            const { id } = req.user!
            const profile = await getUserProfile(id)
            return reply.code(statusCodes.successful).send(profile)
        } catch (error) {
            throw error
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
            throw error
        }
    }

    async getOrdersQty(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const qty = await getUserOrdersQty(id)
            return reply.code(statusCodes.successful).send(qty)
        } catch (error) {
            throw error
        }
    }

    async getOrders(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const orders = await getUserOrders(id)
            return reply.code(statusCodes.successful).send(orders)
        } catch (error) {
            throw error
        }
    }

    async getUsersQty(_: FastifyRequest, reply: FastifyReply) {
        try {
            const qty = await getUsersQty()
            return reply.code(statusCodes.successful).send(qty)
        } catch (error) {
            return reply.code(statusCodes.serverError).send(error)
        }
    }

    async getUsers(_: FastifyRequest, reply: FastifyReply) {
        try {
            const users = await getUsers()
            return reply.code(statusCodes.successful).send(users)
        } catch (error) {
            return reply.code(statusCodes.serverError).send(error)
        }
    }

    async getUserById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const user = await getUser(id)

            return reply.code(statusCodes.successful).send(user)
        } catch (error) {
            return reply.code(statusCodes.serverError).send(error)
        }
    }

    async deleteUser(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            await deleteUser(id)

            return reply.code(statusCodes.successful).send("User successfully deleted")
        } catch (error) {
            return reply.code(statusCodes.serverError).send("Server Error")
        }
    }
}
