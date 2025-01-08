import { prisma } from "../../lib/prisma"

export const getCategories = async () => {
    try {
        const categories = await prisma.category.findMany()
        return categories
        
    } catch (error){
        throw new Error(`Erro: ${error.message}`)
    }
}

export const getProductsByCategory = async (categoryId: string) => {
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        })

        if (!category) {
            throw new Error("Categoria não encontrada.")
        }

        const products = await prisma.product.findMany({
            where: {
                categories: {
                    some: {
                        id: categoryId
                    }
                }
            }
        })

        return products
        
    } catch (error){
        throw new Error(`Erro: ${error.message}`)
    }
}

export const getStoresByCategory = async (categoryId: string) => {
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        })
        
        if (!category) {
            throw new Error("Categoria não encontrada.")
        }

        const stores = await prisma.store.findMany({
            where: {
                categories: {
                    some: {
                        id: categoryId
                    }
                }
            }
        })

        return stores
        
    } catch (error){
        throw new Error(`Erro: ${error.message}`)
    }
}