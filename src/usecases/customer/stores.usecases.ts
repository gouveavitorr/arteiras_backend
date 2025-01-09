import { prisma } from "../../lib/prisma"

export const getStores = async () => {
    try {
        const stores = await prisma.store.findMany()
        
        return stores
    } catch (error) {
        throw new Error(`Erro: ${error.message}`)
    }
}

export const getStore = async (storeId: string) => {
    try {
        const store = await prisma.store.findFirst({
            where: {
                id: storeId
            }
        })
        if(!store) {
            throw new Error("Loja não encontrada.")
        }

        return store
    } catch (error) {
        throw new Error(`Erro: ${error.message}`)
    }
}