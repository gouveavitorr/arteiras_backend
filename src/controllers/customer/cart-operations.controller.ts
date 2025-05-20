import { FastifyRequest, FastifyReply } from "fastify";
import { addItemToCart, showUniqueCartItem, showCartItems, removeOneItemFromCart, deleteItemFromCart, clearCart } from "../../usecases/customer/cart-operations.usecases";

export class CartOperationsController {
    async addItem(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user
            const { productId, quantity }: any = req.body
            const item = await addItemToCart({ productId, userId: id, quantity })

            return reply.code(200).send(item)
        } catch (err) {
            console.log("err: ", err);

            return reply.code(500).send({ error: "Server Error" })
        }
    }

    async deleteItem(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { cartItemId }: any = req.params
            const product = await deleteItemFromCart(cartItemId)

            return reply.code(200).send("Produto excluído do carrinho.")
        } catch (err) {
            console.log("err: ", err);

            return reply.code(500).send({ error: "Server Error" })
        }
    }

    async removeItem(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { cartItemId }: any = req.params
            const item = await showUniqueCartItem(cartItemId)

            if (item.quantity <= 0) {
                deleteItemFromCart(cartItemId)
                return reply.code(200).send("Produto excluído do carrinho.")
            }

            const itemDeleted = await removeOneItemFromCart(cartItemId)

            return reply.code(200).send("Um item retirado.")
        } catch (err) {
            console.log("err: ", err);

            return reply.code(500).send({ error: "Server Error" })
        }
    }

    async clearCart(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user
            await clearCart(id)

            return reply.code(200).send({ message: "Carrinho vazio." })
        } catch (err) {
            console.log("err: ", err);

            return reply.code(500).send({ error: "Server Error" })
        }
    }

    async showItems(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user
            const items = await showCartItems(id)

            return reply.code(200).send(items)
        } catch (err) {
            console.log("err: ", err);

            return reply.code(500).send({ error: "Server Error" })
        }
    }
}
