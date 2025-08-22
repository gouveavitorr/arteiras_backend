import { prisma } from "../../lib/prisma"

export interface CustomOrderFormInterface {
    title: string,
    description: string
    categoryId: string
    storeId: string
}

export const getCustomOrders = async () => {
    const customOrders = await prisma.customOrder.findMany()
    return customOrders
}

export const createCustomOrder = async (userId: string, data: CustomOrderFormInterface) => {
    const customOrder = await prisma.customOrder.create({
        data: {
            ...data,
            userId,
            price: 0,
            deliveryExpenses: 0,
            orderStatus: "PENDING",
            trackingCode: "",
        }
    })
    return customOrder
}

export const getCustomOrderById = async (id: string) => {
    const customOrder = await prisma.customOrder.findFirst({
        where: {
            id
        }
    })
    return customOrder
}

export const getCustomOrdersByUserId = async (userId: string) => {
    const customOrders = await prisma.customOrder.findMany({
        where: {
            userId
        }
    })
    return customOrders
}

export const getCustomOrderByIdUserId = async (id: string, userId: string) => {
    const customOrder = await prisma.customOrder.findFirst({
        where: {
            id,
            userId
        }
    })
    return customOrder
}

export const getCustomOrdersQty = async () => {
    const totalCustomOrders = await prisma.customOrder.count()

    return { totalCustomOrders }
}

export const updateCustomOrder = async (id: string, data: CustomOrderFormInterface) => {
    const customOrder = await prisma.customOrder.update({
        data,
        where: {
            id
        }
    })
    return customOrder
}


export const deleteCustomOrder = async (id: string) => {
    const customOrder = await prisma.customOrder.delete({
        where: {
            id
        }
    })
    return customOrder
}
