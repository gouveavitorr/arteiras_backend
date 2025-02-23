import { FastifyReply, FastifyRequest } from "fastify";
import { getOrders, getOrder } from "../../usecases/customer/orders.usecases"

export class OrdersController {
    async getOrders(req: FastifyRequest, reply: FastifyReply){
        const {id} = req.user
        const orders = await getOrders(id)
        return reply.code(200).send(orders)
    }

    async getOrder(req: FastifyRequest, reply: FastifyReply){
        const {id} = req.user
        const { orderId }: any = req.params;

        const order = await getOrder(id, orderId);

        return reply.code(200).send(order);
    }
}