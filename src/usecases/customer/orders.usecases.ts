import {prisma } from "../../lib/prisma"

export const getOrders = async () => {

        const orders = await prisma.order.findMany()
        return orders

}

export const getOrder = async (orderId:string) => {

        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        })

        return order

}