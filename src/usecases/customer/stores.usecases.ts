import { FastifyError } from "fastify";
import { app } from "../../server";
import { statusCodes } from "../../utils/types";

export interface StoreFormInterface {
    name: string,
    description: string,
    image: string,
    sellerId: string,
    phoneNumber: string,
    instagramId: string,
    facebookId: string,
}

export const getStores = async () => {
    const stores = await app.prisma.store.findMany({
        include: {
            images: {
                select: {
                    image: {
                        select: {
                            id: true,
                            url: true,
                            filename: true
                        }
                    }
                }
            }
        }
    })
    return stores
}

export const getStore = async (storeId: string) => {
    const store = await app.prisma.store.findFirst({
        where: {
            id: storeId
        },
        include: {
            images: {
                select: {
                    image: {
                        select: {
                            id: true,
                            url: true,
                            filename: true
                        }
                    }
                }
            }
        }
    })
    if (!store) {
        throw new Error("Loja não encontrada.")
    }

    return store
}

export const getStoresQty = async () => {
    const totalStores = await app.prisma.store.count()

    return { totalStores }
}

export const createStore = async (data: StoreFormInterface) => {
    const store = await app.prisma.store.create({
        data
    })
    return store
}

export const updateStore = async (id: string, data: StoreFormInterface) => {
    const store = await app.prisma.store.update({
        data,
        where: {
            id
        }
    })
    return store
}


export const deleteStore = async (id: string) => {
    const store = await app.prisma.store.delete({
        where: {
            id
        }
    })
    return store
}
