import { prisma } from "../../lib/prisma"

export const getPaginatedProducts = async (offset: number, limit: number) => {

        const products = await prisma.product.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            }
        })
        
        if (!products) {
            throw new Error("Erro ao exibir produtos.")
        }

        const totalItems = await prisma.product.count()

        return { products, totalItems }
        
}

export const getProduct = async (productId: string) => {

        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            }
        })
        if (!product) {
            throw new Error("Produto não encontrado.")
        }

        return product

}