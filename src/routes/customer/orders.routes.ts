import { FastifyInstance } from "fastify";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { OrdersController } from "../../controllers/customer/orders.controller"

const controller = new OrdersController()

export async function ordersRouter(app: FastifyInstance) {
  app.get("/orders", { preHandler: isAuthenticated }, controller.getOrders)
  app.post("/orders", { preHandler: isAuthenticated }, controller.createOrder)
  app.post("/orders/:orderId/pay", { preHandler: isAuthenticated }, controller.createOrderAndPaymentPreference)

  app.get<{ Params: { orderId: string } }>(
    "/orders/:orderId",
    { preHandler: isAuthenticated },
    controller.getOrder
  )
}
