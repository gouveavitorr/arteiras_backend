import { FastifyReply, FastifyRequest } from "fastify";
import { getOrders, getOrder } from "../../usecases/customer/orders.usecases"

export class OrdersController {
    async getOrders(req: FastifyRequest, reply: FastifyReply) {
        try {
            const user = req.user!
            const orders = await getOrders(user.id)

            return reply.code(200).send(orders)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async getOrder(req: FastifyRequest<{ Params: { orderId: string } }>, reply: FastifyReply) {
        try {
            const user = req.user!
            const { orderId } = req.params;

            const order = await getOrder(orderId, user.id);

            return reply.code(200).send(order);
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
}


