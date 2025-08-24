import { app } from "../../server";

type ProductFilters = {
    categoryId?: number
    storeId?: number
    priceMin?: number
    priceMax?: number
    weight?: number
    size?: number
    quantity?: number
    search?: string
}

type ProductFormInterface = {
    name: string;
    description: string;
    storeId: string;
    categoryId: string;
    price: number;
    weight: number;
    size: number;
    quantity: number;
}

export const getPaginatedProducts = async (
    offset: number,
    limit: number,
    filters: ProductFilters
) => {
    const where: any = {}

    // if (filters.categoryId != null) {
    //     where.categoryId = filters.categoryId
    // }

    if (filters.storeId != null) {
        where.storeId = filters.storeId
    }

    if (filters.priceMin != null || filters.priceMax != null) {
        where.price = {}
        if (filters.priceMin != null) where.price.gte = filters.priceMin
        if (filters.priceMax != null) where.price.lte = filters.priceMax
    }

    if (filters.weight != null) {
        where.weight = filters.weight
    }

    if (filters.size != null) {
        where.size = filters.size
    }

    if (filters.quantity != null) {
        where.quantity = filters.quantity
    }

    if (filters.search) {
        where.OR = [
            { name: { contains: filters.search, mode: "insensitive" } },
            { description: { contains: filters.search, mode: "insensitive" } },
        ]
    }

    const products = await app.prisma.product.findMany({
        where,
        include: {
            images: true
        },
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
    })

    const totalItems = await app.prisma.product.count({ where })

    return { products, totalItems }
}

export const getProductQty = async () => {
    const totalProducts = await app.prisma.product.count()

    return { totalProducts }
}

export const getProduct = async (productId: string) => {

    const product = await app.prisma.product.findUnique({
        where: {
            id: productId,
        }
    })
    if (!product) {
        throw new Error("Produto não encontrado.")
    }

    return product

}

export const createProduct = async (data: ProductFormInterface) => {
    const { categoryId, ...productData } = data

    const product = await app.prisma.product.create({
        data: {
            ...productData,
            categories: {
                connect: { id: categoryId },
            },
        },
    })
    return product
}

export const updateProduct = async (id: string, data: ProductFormInterface) => {
    const product = await app.prisma.product.update({
        data,
        where: {
            id
        }
    })
    return product
}


export const deleteProduct = async (id: string) => {
    const product = await app.prisma.product.delete({
        where: {
            id
        }
    })
    return product
}
