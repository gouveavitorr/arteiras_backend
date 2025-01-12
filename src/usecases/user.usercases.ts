import { prisma } from "../lib/prisma";
import argon2 from "argon2"

export interface UserSignupRequest {
    name: string
    email: string
    password: string
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

export const updateUser = async (data: UserSignupRequest) => {
    // const user = await prisma.user.findFirst({
    //     where: {

    //     }
    // })
}