import { FastifyReply, FastifyRequest } from "fastify";
import { getOrders, getOrder, createOrderFromCart } from "../../usecases/customer/orders.usecases"
import { statusCodes } from "../../utils/types";
import { Preference } from "mercadopago";
import { client } from "../../configs/mercadopago";

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

    async createOrder(req: FastifyRequest, reply: FastifyReply) {
        try {
            const user = req.user!;
            const newOrder = await createOrderFromCart(user.id);

            return reply.code(statusCodes.created).send(newOrder);
        } catch (error: any) {
            console.error("Erro ao criar o pedido:", error);
            const statusCode = error.message.includes("Carrinho vazio") 
                ? statusCodes.badRequest 
                : statusCodes.serverError;

            return reply.code(statusCode).send({ message: error.message || "Erro interno ao criar o pedido." });
        }
    }

     async createOrderAndPaymentPreference(req: FastifyRequest, reply: FastifyReply) {
        try {
            const user = req.user!;
            
            // 1. Chame o usecase para criar a ordem a partir do carrinho
            const newOrder = await createOrderFromCart(user.id);

            // 2. Use a nova ordem para criar a preferência de pagamento no Mercado Pago
            const preference = new Preference(client);
            const paymentResult = await preference.create({
                body: {
                    items: [
                        {
                            // Adicione a propriedade 'id' aqui
                            id: newOrder.id, 
                            title: `Pedido #${newOrder.id}`,
                            quantity: 1,
                            unit_price: newOrder.totalAmount,
                        },
                    ],
                    external_reference: newOrder.id,
                    // TO DO: URLs de retorno
                    back_urls: {
                        success: `https://www.seu-site/success`,
                        failure: `https://www.seu-site/failure`,
                        pending: `https://www.seu-site/pending`
                    },
                    auto_return: "approved",
                },
            });

            // 3. Retorne a resposta do Mercado Pago
            return reply.code(statusCodes.successful).send(paymentResult);
        } catch (error: any) {
            console.error(error);
            return reply.code(statusCodes.badRequest).send({ message: error.message || "Erro ao criar pedido." });
        }
    }
}


