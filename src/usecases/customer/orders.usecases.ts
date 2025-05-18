import {prisma } from "../../lib/prisma"

export const getOrders = async (userId: string) => {

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })

    if(!user){
        return new Error("Usuário não encontrado")
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: userId
        }
    })
    return orders
}

export const getOrder = async (userId: string, orderId: string) => {

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })

    if(!user){
        return new Error("Usuário não encontrado")
    }

    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            userId: userId
        }
    })

    return order

}