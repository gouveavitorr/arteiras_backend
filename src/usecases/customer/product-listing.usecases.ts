import { app } from "../../server";
import { createImage, createProductImage } from "./images.usecases";

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

export type ProductFormInterface = {
    name: string;
    description: string;
    storeId: string;
    categoryId: string;
    price: number;
    weight: number;
    size: number;
    quantity: number;
    image?: string | null;
}

export interface ProductUpdateControl {
    productData: ProductFormInterface;
    imagesToKeep: string[];
    newImageFileParts: any[];
}


export const createProduct = async (data: ProductFormInterface) => {
    try {

        const { categoryId, storeId, image, ...productData } = data;

        const product = await app.prisma.product.create({
            data: {
                ...productData,
                store: { connect: { id: storeId } },
                categories: {
                    connect: [{ id: categoryId }]
                },
            },
        });
        return product;
    } catch (error) {
        console.error("PRISMA CREATE ERROR:", error);
        throw new Error("Falha na transação de criação do produto.");
    }
}

export const updateProduct = async (id: string, control: ProductUpdateControl) => {
    const { categoryId, storeId, image, ...restOfProductData } = control.productData;
    const productImagesToKeep = control.imagesToKeep;
    const newImageFileParts = control.newImageFileParts;
    const existingRelations = await app.prisma.productImage.findMany({
        where: { productId: id },
        include: { image: true },
    });

    const relationsToDelete = existingRelations.filter(rel =>
        !productImagesToKeep.includes(rel.image.url)
    );

    for (const relation of relationsToDelete) {
        await app.prisma.productImage.delete({
            where: {
                productId_imageId: {
                    productId: relation.productId,
                    imageId: relation.imageId,
                }
            }
        });
        await app.prisma.image.delete({
            where: { id: relation.imageId }
        });
    }

    if (newImageFileParts.length > 0) {
        const { createImage, createProductImage } = (await import('./images.usecases'));
        const imagePromises = newImageFileParts.map(filePart => createImage(filePart));
        const newImages = await Promise.all(imagePromises);

        const connectionPromises = newImages.map(image => createProductImage({
            productId: id,
            imageId: image.id,
        }));
        await Promise.all(connectionPromises);
    }

    const product = await app.prisma.product.update({
        data: {
            ...restOfProductData,
            store: { connect: { id: storeId } },
            categories: { connect: { id: categoryId } },
        },
        where: {
            id: id
        }
    });

    return product;
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
            images: {
                include: {
                    image: true
                }
            },
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
        },
        include: {
            store: true,
            images: {
                select: {
                    image: {
                        select: {
                            url: true,
                        }
                    }
                }
            },
            categories: true
        }
    })
    if (!product) {
        throw new Error("Produto não encontrado.")
    }

    return product
}

export const deleteProduct = async (id: string) => {
    const imageRelations = await app.prisma.productImage.findMany({
        where: { productId: id },
        include: { image: true },
    });

    await app.prisma.productImage.deleteMany({
        where: { productId: id },
    });

    for (const relation of imageRelations) {
        await app.prisma.image.delete({
            where: { id: relation.imageId },
        });
    }

    const product = await app.prisma.product.delete({
        where: {
            id
        }
    })
    return product
}
