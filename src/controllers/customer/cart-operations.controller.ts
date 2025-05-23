import { FastifyRequest, FastifyReply } from "fastify";
import { addItemToCart, showUniqueCartItem, showCartItems, removeOneItemFromCart, deleteItemFromCart, clearCart } from "../../usecases/customer/cart-operations.usecases";

export class CartOperationsController {
    async addItem(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const { productId, quantity }: any = req.body
            const item = await addItemToCart({ productId, userId: id, quantity })

            return reply.code(200).send(item)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async deleteItem(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { cartItemId }: any = req.params
            await deleteItemFromCart(cartItemId)

            return reply.code(200).send("Produto excluído do carrinho.")
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
                return reply.code(200).send("Produto excluído do carrinho.")
            }

            await removeOneItemFromCart(cartItemId)

            return reply.code(200).send("Um item retirado.")
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async clearCart(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user!
            await clearCart(id)

            return reply.code(200).send({ message: "Carrinho vazio." })
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async showItems(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const items = await showCartItems(id)

            return reply.code(200).send(items)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
}
