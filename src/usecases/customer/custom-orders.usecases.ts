import { app } from "../../server";

export interface CustomOrderFormInterface {
    title: string,
    description: string
    categoryId: string
    storeId: string
}

export const getCustomOrders = async () => {
    const customOrders = await app.prisma.customOrder.findMany()
    return customOrders
}

export const createCustomOrder = async (userId: string, data: CustomOrderFormInterface) => {
    const customOrder = await app.prisma.customOrder.create({
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
    const customOrder = await app.prisma.customOrder.findFirst({
        where: {
            id
        }
    })
    return customOrder
}

export const getCustomOrdersByUserId = async (userId: string) => {
    const customOrders = await app.prisma.customOrder.findMany({
        where: {
            userId
        }
    })
    return customOrders
}

export const getCustomOrderByIdUserId = async (id: string, userId: string) => {
    const customOrder = await app.prisma.customOrder.findFirst({
        where: {
            id,
            userId
        }
    })
    return customOrder
}

export const getCustomOrdersQty = async () => {
    const totalCustomOrders = await app.prisma.customOrder.count()

    return { totalCustomOrders }
}

export const updateCustomOrder = async (id: string, data: CustomOrderFormInterface) => {
    const customOrder = await app.prisma.customOrder.update({
        data,
        where: {
            id
        }
    })
    return customOrder
}


export const deleteCustomOrder = async (id: string) => {
    const customOrder = await app.prisma.customOrder.delete({
        where: {
            id
        }
    })
    return customOrder
}
