import { FastifyRequest, FastifyReply } from "fastify";
import { addItemToCart, showUniqueCartItem, showCartItems, removeOneItemFromCart, deleteItemFromCart, clearCart, CartItemRequest, countItems } from "../../usecases/customer/cart-operations.usecases";
import { statusCodes } from "../../utils/types";

export class CartOperationsController {
    async addItem(req: FastifyRequest<{ Body: CartItemRequest }>, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const { productId, quantity } = req.body

            const item = await addItemToCart({ productId, userId: id, quantity })

            return reply.code(statusCodes.successful).send(item)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async deleteItem(req: FastifyRequest<{ Params: { cartItemId: string } }>, reply: FastifyReply) {
        try {
            const { cartItemId } = req.params

            await deleteItemFromCart(cartItemId)

            return reply.code(statusCodes.successful).send("Produto excluído do carrinho.")
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async removeItem(req: FastifyRequest<{ Params: { cartItemId: string } }>, reply: FastifyReply) {
        try {
            const { cartItemId } = req.params
            const item = await showUniqueCartItem(cartItemId)

            if (item.quantity <= 0) {
                deleteItemFromCart(cartItemId)
                return reply.code(statusCodes.successful).send("Produto excluído do carrinho.")
            }

            await removeOneItemFromCart(cartItemId)

            return reply.code(statusCodes.successful).send("Um item retirado.")
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async clearCart(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user!
            await clearCart(id)

            return reply.code(statusCodes.successful).send({ message: "Carrinho vazio." })
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async showItems(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const items = await showCartItems(id)

            return reply.code(statusCodes.successful).send(items)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async countItems(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const items = await countItems(id)

            return reply.code(statusCodes.successful).send(items)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
}
