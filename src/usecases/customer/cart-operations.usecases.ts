import { prisma } from "../../lib/prisma"

export interface CartItemRequest {
    productId: string,
    customerId: string,
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

        const customer = await prisma.customer.findFirst({
            where: {
                id: data.customerId
            }
        })

        if (!customer) {
            throw new Error("Usuário não encontrado.")
        }

        const cartItemExists = await prisma.cartItem.findFirst({
            where: {
                productId: data.productId,
                customerId: data.customerId
            }
        })

        if (cartItemExists) {
            const updatedItem = await prisma.cartItem.update({
                where: {
                    id: cartItemExists.id
                },
                data: {
                    productId: data?.productId || cartItemExists.productId,
                    customerId: data?.customerId || cartItemExists.customerId,
                    quantity: data.quantity += cartItemExists.quantity
                }
            })
            return updatedItem
        } else {
            const item = await prisma.cartItem.create({
                data: {
                    productId: data.productId,
                    customerId: data.customerId,
                    quantity: data.quantity
                }
            })
            return item
        }

}

export const deleteItemFromCart = async (id: string) => {

        const item = await prisma.cartItem.delete({
            where: {
                id
            }
        })
}

export const removeOneItemFromCart = async(id: string) => {

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

export const clearCart = async(id: string) => {

        const customer = await prisma.customer.findFirst({
            where: {
                id
            }
        })

        if(!customer) {
            throw new Error("Cliente não encontrado.")
        }
        const item = await prisma.cartItem.findMany({
            where: {
                customerId: customer.id
            }
        })
        
        for (let i = 0; i <= (await showCartItems(customer.id)).length; i++) { //pensar um jeito mais eficiente
            deleteItemFromCart(item[i].id)
        }
}

export const showCartItems = async (id: string) => {

        const customer = await prisma.customer.findFirst({
            where: {
                id
            }
        })
        const items = await prisma.cartItem.findMany({
            where: {
                customerId: customer?.id
            }
        })
        return items
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
