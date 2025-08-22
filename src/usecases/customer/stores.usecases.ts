import { prisma } from "../../lib/prisma"

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
    const stores = await prisma.store.findMany()
    return stores
}

export const getStore = async (storeId: string) => {
    const store = await prisma.store.findFirst({
        where: {
            id: storeId
        }
    })
    if (!store) {
        throw new Error("Loja não encontrada.")
    }

    return store
}

export const getStoresQty = async () => {
    const totalStores = await prisma.store.count()

    return { totalStores }
}

export const createStore = async (data: StoreFormInterface) => {
    const store = await prisma.store.create({
        data
    })
    return store
}

export const updateStore = async (id: string, data: StoreFormInterface) => {
    const store = await prisma.store.update({
        data,
        where: {
            id
        }
    })

    return store
}


export const deleteStore = async (id: string) => {
    const store = await prisma.store.delete({
        where: {
            id
        }
    })

    return store
}
