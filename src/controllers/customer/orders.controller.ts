import { FastifyReply, FastifyRequest } from "fastify";
import { getOrders, getOrder, checkout, cancelOrder, getOrdersQty } from "../../usecases/customer/orders.usecases"
import { statusCodes } from "../../utils/types";

export class OrdersController {
    async getOrders(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const orders = await getOrders(id)
            return reply.code(statusCodes.successful).send(orders)

        } catch (error) {
            throw error
        }
    }

    async getOrdersQty(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const qty = await getOrdersQty(id)
            return reply.code(statusCodes.successful).send(qty)
        } catch (error) {
            throw error
        }
    }

    async getOrder(req: FastifyRequest<{ Params: { orderId: string } }>, reply: FastifyReply) {
        try {
            const user = req.user!
            const { orderId } = req.params;

            const order = await getOrder(orderId, user.id);

            if (!order)
                return reply.code(statusCodes.notFound).send({ message: "Order not found" });

            return reply.code(statusCodes.successful).send(order);
        } catch (error) {
            throw error
        }
    }

    async checkoutHandler(req: FastifyRequest<{ Body: { addressId: string, paymentMethodId: string } }>, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const { addressId, paymentMethodId } = req.body;

            const order = await checkout(id, addressId, paymentMethodId);

            return reply.code(statusCodes.successful).send(order);
        } catch (error) {
            throw error
        }
    }

    async cancelOrder(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id: userId } = req.user!
            const { id } = req.params;

            await cancelOrder(id, userId);

            return reply.code(statusCodes.successful).send({ message: "Order successfully cancelled" });
        } catch (error) {
            throw error
        }
    }
}
