import { prisma } from "../../lib/prisma"

// INFO: Get all orders from an authenticated user
export const getOrders = async (userId: string) => {
    const orders = await prisma.order.findMany({
        where: {
            userId
        }
    })

    return orders
}

// INFO: Get order from an authenticated user by ID
export const getOrder = async (id: string, userId: string) => {
    const order = await prisma.order.findFirst({
        where: {
            id,
            userId
        }
    })

    return order
}
