import { sign } from "../configs/jwt";
import { prisma } from "../lib/prisma";
import argon2 from "argon2"
import { CPF } from "../utils/cpf"
import { PhoneNumber } from "../utils/PhoneNumber";

export interface UserSignupRequest {
    name: string,
    email: string,
    password: string
}

export interface UserEditRequest {
    name: string | null,
    email: string | null,
    password: string | null,
    old_password: string | null
}

export interface UserSignInRequest {
    email: string,
    password: string
}

export interface UserUpdateProfileRequest {
    cpf: string,
    phoneNumber: string
}

export const signUp = async (data: UserSignupRequest) => {
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

        if (checkOldPassword) {
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

export const signIn = async (data: UserSignInRequest) => {
    const user = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    })

    if (!user) {
        throw new Error("Email e/ou senha incorretos.")
    }

    const isSamePassword = await argon2.verify(user.password, data.password)

    if (!isSamePassword) {
        throw new Error("Email e/ou senha incorretos.")
    }

    const token = await sign({
        id: user.id,
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    })

    return { user, token }
}

export const getUserProfile = async (id: string) => {

    const user = await prisma.user.findFirst({
        where: {
            id,
        },
        include: {
            addresses: true,
            paymentMethods: true,
        }
    })
    if (!user) {
        throw new Error("Usuário não encontrado");
    }
    return user

}

export const updateUserProfile = async (id: string, data: UserUpdateProfileRequest) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    })

    if (!user) {
        throw new Error("User not found");
    }

    const verifiedCpf = new CPF(data?.cpf)
    const verifiedPhoneNumber = new PhoneNumber(data?.phoneNumber)

    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            cpf: verifiedCpf.toString() || user.cpf,
            phoneNumber: verifiedPhoneNumber.toString() || user.phoneNumber,
        },
    })

    if (!updatedUser) {
        throw new Error("Falha ao atualizar usuário")
    }

    return updatedUser;
}

export const getUserOrders = async (id: string) => {

    const verifiedUserId = await prisma.user.findUnique({
        where: {
            id,
        },
    })
    const orders = await prisma.order.findMany({
        where: {
            userId: verifiedUserId?.id,
        },
    })
    if (verifiedUserId?.role == "CUSTOMER" && !orders || orders.length === 0) {
        throw new Error("Nenhum pedido encontrado para esse cliente")
    }
    if (verifiedUserId?.role == "ADMIN") {
        throw new Error("Este usuário é admin e não pode possuir pedidos")
    }
    return orders

}
