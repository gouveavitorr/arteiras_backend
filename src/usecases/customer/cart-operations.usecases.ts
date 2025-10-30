import { FastifyError } from "fastify";
import { app } from "../../server";
import { statusCodes } from "../../utils/types";

export interface CartItemRequest {
    productId: string,
    userId: string,
    quantity: number
}

export interface CartItemUpdate {
    id: string,
    quantity: number
}

export const addItemToCart = async (data: CartItemRequest) => {
    const product = await app.prisma.product.findFirst({
        where: {
            id: data.productId
        }
    })

    if (!product) {
        throw new Error("Produto não encontrado.")
    }

    const user = await app.prisma.user.findFirst({
        where: {
            id: data.userId
        }
    })

    if (!user) {
        throw new Error("Usuário não encontrado.")
    }

    const cartItemExists = await app.prisma.cartItem.findFirst({
        where: {
            productId: data.productId,
            userId: data.userId
        }
    })

    if (cartItemExists) {
        data.quantity += cartItemExists.quantity
        const updatedItem = await app.prisma.cartItem.update({
            where: {
                id: cartItemExists.id
            },
            data: {
                productId: data?.productId || cartItemExists.productId,
                userId: data?.userId || cartItemExists.userId,
                quantity: data.quantity > product.quantity ? product.quantity : data.quantity
            }
        })
        return updatedItem
    } else {
        const item = await app.prisma.cartItem.create({
            data: {
                productId: data.productId,
                userId: data.userId,
                quantity: data.quantity
            }
        })
        return item
    }

}

export const deleteItemFromCart = async (id: string) => {
    return await app.prisma.cartItem.delete({
        where: {
            id
        }
    })
}

export const removeOneItemFromCart = async (id: string) => {
    const item = await app.prisma.cartItem.findFirst({
        where: {
            id
        }
    })

    if (!item) {
        throw new Error("Produto não encontrado.")
    }

    if (item.quantity > 0) {
        item.quantity--
    }
}

export const clearCart = async (id: string) => {
    await app.prisma.cartItem.deleteMany({
        where: {
            userId: id
        }
    })
}

export const showCartItems = async (id: string) => {
    const user = await app.prisma.user.findFirst({
        where: {
            id
        }
    })
    const items = await app.prisma.cartItem.findMany({
        where: {
            userId: user?.id
        },
        include: {
            product: {
                include: {
                    images: true
                }
            },
        }
    })
    return items
}

export const countItems = async (id: string) => {
    const user = await app.prisma.user.findFirst({
        where: {
            id
        }
    })
    const totalItems = await app.prisma.cartItem.count({
        where: {
            userId: user?.id
        }
    })
    return { totalItems }
}

export const updateItem = async (id: string, userId: string, quantity: number) => {
    if (quantity < 1) {
        const err = new Error("Invalid Quantity") as FastifyError
        err.statusCode = statusCodes.badRequest
        throw err
    }

    const itemProduct = await app.prisma.cartItem.findFirst({
        where: {
            id: id,
        },
        include: {
            product: true
        }
    })

    if (!itemProduct) {
        const err = new FastifyError("Product not found") as FastifyError
        err.statusCode = statusCodes.notFound
        throw err
    }

    if (quantity > itemProduct.product.quantity) {
        const err = new Error("Invalid Quantity") as FastifyError
        err.statusCode = statusCodes.badRequest
        throw err
    }

    const item = await app.prisma.cartItem.update({
        data: {
            quantity
        },
        where: {
            id,
            userId
        }
    })

    return item
}

export const showUniqueCartItem = async (id: string) => {

    const item = await app.prisma.cartItem.findFirst({
        where: {
            id
        }
    })
    if (!item) {
        throw new Error("Produto não encontrado.")
    }
    return item

}
