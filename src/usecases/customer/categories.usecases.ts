import { prisma } from "../../lib/prisma"

export interface CategoryFormInterface {
    name: string
}

export const getCategories = async () => {
    const categories = await prisma.category.findMany()
    return categories
}

export const createCategory = async (data: CategoryFormInterface) => {
    const category = await prisma.category.create({
        data
    })
    return category
}


export const getProductsByCategory = async (categoryId: string) => {
    const category = await prisma.category.findFirst({
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
}

export const getStoresByCategory = async (categoryId: string) => {
    const category = await prisma.category.findFirst({
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
}


export const getCategoriesQty = async () => {
    const totalCategories = await prisma.category.count()

    return { totalCategories }
}
