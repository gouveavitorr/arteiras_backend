import { FastifyInstance } from "fastify";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { OrdersController } from "../../controllers/customer/orders.controller"

const controller = new OrdersController()

export async function ordersRouter(app: FastifyInstance) {
  app.get("/", { preHandler: isAuthenticated }, controller.getOrders)
  app.get("/qty", { preHandler: isAuthenticated }, controller.getOrdersQty)

  app.get<{ Params: { orderId: string } }>(
    "/:orderId",
    { preHandler: isAuthenticated },
    controller.getOrder
  )

  app.put<{ Params: { id: string } }>("/cancel/:id", { preHandler: isAuthenticated }, controller.cancelOrder)

  app.post<{ Body: { addressId: string, paymentMethodId: string } }>(
    "/checkout",
    { preHandler: isAuthenticated },
    controller.checkoutHandler
  )
}
