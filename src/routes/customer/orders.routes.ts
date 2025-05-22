import { FastifyInstance } from "fastify";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { OrdersController } from "../../controllers/customer/orders.controller"

const controller = new OrdersController()

export async function ordersRouter(app: FastifyInstance) {
  app.get("/orders", { preHandler: isAuthenticated }, controller.getOrders)
  app.get("/orders/:orderId", { preHandler: isAuthenticated }, controller.getOrder)
}
