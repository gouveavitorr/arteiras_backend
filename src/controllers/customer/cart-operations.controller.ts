import { FastifyRequest, FastifyReply } from "fastify";
import { addItemToCart, showUniqueCartItem, showCartItems, removeOneItemFromCart, deleteItemFromCart, clearCart } from "../../usecases/customer/cart-operations.usecases";

export class CartOperationsController {
    async addItem(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.user
        const { productId, quantity }: any = req.body
        const item = await addItemToCart({ productId, userId: id, quantity })
        return reply.code(200).send(item)
    }

    async deleteItem(req: FastifyRequest, reply: FastifyReply) {
        const { cartItemId }: any = req.params
        const product = await deleteItemFromCart(cartItemId)
        return reply.code(200).send("Produto excluído do carrinho.")
    }

    async removeItem(req: FastifyRequest, reply: FastifyReply) {
        const { cartItemId }: any = req.params
        const item = await showUniqueCartItem(cartItemId)
        if (item.quantity <= 0) {
            deleteItemFromCart(cartItemId)
            return reply.code(200).send("Produto excluído do carrinho.")
        }
        const itemDeleted = await removeOneItemFromCart(cartItemId)
        return reply.code(200).send("Um item retirado.")
    }

    async clearCart(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.user
        const cartDeleted = await clearCart(id)
        return reply.code(200).send("Carrinho vazio.")
    }

    async showItems(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.user
        const items = await showCartItems(id)
        return reply.code(200).send(items)
    }
}