import { prisma } from "../lib/prisma";
import argon2 from "argon2"

export interface UserSignupRequest {
    name: string,
    email: string,
    password: string
}

export interface UserEditRequest {
    name?: string,
    email?: string,
    password?: string,
    old_password?: string
}

export const signup = async (data: UserSignupRequest) => {
    const checkIfUserExists = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    })

    if (checkIfUserExists) {
        throw new Error("Um usuário com este email já está cadastrado.")
    }

    const hashedPassword = await argon2.hash(data.password);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword
        }
    })
    return user
}

export const edit = async (id: string, data: UserEditRequest) => {
    const user = await prisma.user.findFirst({
        where: {
            id
        }
    })
    if (!user) {
        throw new Error("Usuário não encontrado.")
    }

    const userWithUpdatedEmail = await prisma.user.findFirst({
        where: {
            email: user.email
        }
    })

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new Error("E-mail já cadastrado.")
    }

    if (data.password && !data.old_password) {
        throw new Error("Informar a senha antiga.")
    }

    if (data.password && data.old_password) {
        const checkOldPassword = await argon2.verify(user.password, data.old_password)

        if(checkOldPassword) {
            user.password = await argon2.hash(data.password)
        } else {
            throw new Error("A senha antiga não confere.")
        }
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            name: data?.name || user.name,
            email: data?.email || user.email,
            password: user?.password
        }
    })
    return updatedUser
}