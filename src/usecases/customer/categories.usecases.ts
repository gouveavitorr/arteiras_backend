import { app } from "../../server";

export interface CategoryFormInterface {
    name: string
}

export const getCategories = async () => {
    const categories = await app.prisma.category.findMany()
    return categories
}

export const createCategory = async (data: CategoryFormInterface) => {
    const category = await app.prisma.category.create({
        data
    })
    return category
}


export const getProductsByCategory = async (categoryId: string) => {
    const category = await app.prisma.category.findFirst({
        where: {
            id: categoryId
        }
    })

    if (!category) {
        throw new Error("Categoria não encontrada.")
    }
    const products = await app.prisma.product.findMany({
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
    const category = await app.prisma.category.findFirst({
        where: {
            id: categoryId
        }
    })

    if (!category) {
        throw new Error("Categoria não encontrada.")
    }

    const stores = await app.prisma.store.findMany({
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
    const totalCategories = await app.prisma.category.count()

    return { totalCategories }
}

export const updateCategory = async (id: string, data: CategoryFormInterface) => {
    const category = await app.prisma.category.update({
        data,
        where: {
            id
        }
    })
    return category
}


export const deleteCategory = async (id: string) => {
    const category = await app.prisma.category.delete({
        where: {
            id
        }
    })
    return category
}
