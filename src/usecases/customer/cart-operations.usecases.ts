import { prisma } from "../../lib/prisma"

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
    const product = await prisma.product.findFirst({
        where: {
            id: data.productId
        }
    })

    if (!product) {
        throw new Error("Produto não encontrado.")
    }

    const user = await prisma.user.findFirst({
        where: {
            id: data.userId
        }
    })

    if (!user) {
        throw new Error("Usuário não encontrado.")
    }

    const cartItemExists = await prisma.cartItem.findFirst({
        where: {
            productId: data.productId,
            userId: data.userId
        }
    })

    if (cartItemExists) {
        const updatedItem = await prisma.cartItem.update({
            where: {
                id: cartItemExists.id
            },
            data: {
                productId: data?.productId || cartItemExists.productId,
                userId: data?.userId || cartItemExists.userId,
                quantity: data.quantity += cartItemExists.quantity
            }
        })
        return updatedItem
    } else {
        const item = await prisma.cartItem.create({
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
    return await prisma.cartItem.delete({
        where: {
            id
        }
    })
}

export const removeOneItemFromCart = async (id: string) => {
    const item = await prisma.cartItem.findFirst({
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
    await prisma.cartItem.deleteMany({
        where: {
            userId: id
        }
    })
}

export const showCartItems = async (id: string) => {
    const user = await prisma.user.findFirst({
        where: {
            id
        }
    })
    const items = await prisma.cartItem.findMany({
        where: {
            userId: user?.id
        }
    })
    return items
}

export const countItems = async (id: string) => {
    const user = await prisma.user.findFirst({
        where: {
            id
        }
    })
    const totalItems = await prisma.cartItem.count({
        where: {
            userId: user?.id
        }
    })
    return { totalItems }
}

export const updateItem = async (id: string, userId: string, quantity: number) => {
    const item = await prisma.cartItem.update({
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

    const item = await prisma.cartItem.findFirst({
        where: {
            id
        }
    })
    if (!item) {
        throw new Error("Produto não encontrado.")
    }
    return item

}
