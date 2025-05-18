import {prisma } from "../../lib/prisma"

export const getOrders = async (id: string) => {

    const user = await prisma.user.findFirst({
        where: {
            id
        }
    })

    if(!user){
        return new Error("Usuário não encontrado")
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: id
        }
    })
    return orders
}

export const getOrder = async (id: string, orderId: string) => {

    const user = await prisma.user.findFirst({
        where: {
            id
        }
    })

    if(!user){
        return new Error("Usuário não encontrado")
    }

    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            userId: id
        }
    })

    return order

}