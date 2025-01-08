import { prisma } from "../../lib/prisma"

export const getPaginatedProducts = async (offset: number, limit: number) => {
    try {
        const products = await prisma.product.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            }
        })
        
        const totalItems = await prisma.product.count()

        return { products, totalItems }
        
    } catch (error){
        throw new Error(`Erro: ${error.message}`)
    }
}

export const getProduct = async (productId: string) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            }
        })
        if (!product) {
            throw new Error("Produto não encontrado.")
        }
    } catch (error) {
        throw new Error(`Erro: ${error.message}`)
    }
}