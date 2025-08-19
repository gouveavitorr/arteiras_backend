import { FastifyInstance } from "fastify";
import { CartOperationsController } from "../../controllers/customer/cart-operations.controller";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { CartItemRequest } from "../../usecases/customer/cart-operations.usecases";

const controller = new CartOperationsController()

export async function cartRouter(app: FastifyInstance) {
  app.post<{ Body: CartItemRequest }>(
    "/cart/add",
    { preHandler: isAuthenticated },
    controller.addItem
  )

  app.delete<{ Params: { cartItemId: string } }>(
    "/cart/delete/:cartItemId",
    { preHandler: isAuthenticated },
    controller.deleteItem
  )

  app.delete<{ Params: { cartItemId: string } }>(
    "/cart/remove/:cartItemId",
    { preHandler: isAuthenticated },
    controller.removeItem
  )

  app.delete("/cart/clear", { preHandler: isAuthenticated }, controller.clearCart)
  app.get("/cart/cartItems", { preHandler: isAuthenticated }, controller.showItems)
  app.get("/cart/cartItems/qty", { preHandler: isAuthenticated }, controller.countItems)
}
