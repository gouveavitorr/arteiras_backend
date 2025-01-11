import {prisma } from "../../lib/prisma"

export const getOrders = async () => {
    try {
        const orders = await prisma.order.findMany()
        return orders

    } catch (error) {
        throw new Error(`Erro: ${error.message}`)
    }
}

export const getOrder = async (orderId:string) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        })

        return order
    } catch (error) {
        throw new Error(`Erro: ${error.message}`)
    }
}