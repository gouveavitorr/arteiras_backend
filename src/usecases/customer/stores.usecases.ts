import { prisma } from "../../lib/prisma"

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
        if(!store) {
            throw new Error("Loja não encontrada.")
        }

        return store

}