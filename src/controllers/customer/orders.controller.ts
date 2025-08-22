import { FastifyReply, FastifyRequest } from "fastify";
import { getOrders, getOrder, checkout } from "../../usecases/customer/orders.usecases"
import { statusCodes } from "../../utils/types";

export class OrdersController {
    async getOrders(req: FastifyRequest, reply: FastifyReply) {
        try {

            const { id } = req.user!
            const orders = await getOrders(id)
            return reply.code(statusCodes.successful).send(orders)

        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async getOrder(req: FastifyRequest<{ Params: { orderId: string } }>, reply: FastifyReply) {
        try {
            const user = req.user!
            const { orderId } = req.params;

            const order = await getOrder(orderId, user.id);

            return reply.code(statusCodes.successful).send(order);
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async checkoutHandler(req: FastifyRequest<{ Body: { addressId: string, paymentMethodId: string } }>, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const { addressId, paymentMethodId } = req.body;

            const order = await checkout(id, addressId, paymentMethodId);

            return reply.code(statusCodes.successful).send(order);
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
}
