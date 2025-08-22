import { FastifyInstance } from "fastify";
import { CartOperationsController } from "../../controllers/customer/cart-operations.controller";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { CartItemRequest, CartItemUpdate } from "../../usecases/customer/cart-operations.usecases";

const controller = new CartOperationsController()

export async function cartRouter(app: FastifyInstance) {
  app.post<{ Body: CartItemRequest }>(
    "/add",
    { preHandler: isAuthenticated },
    controller.addItem
  )

  app.put<{ Body: CartItemUpdate }>(
    "/",
    { preHandler: isAuthenticated },
    controller.updateItem
  )

  app.delete<{ Params: { cartItemId: string } }>(
    "/delete/:cartItemId",
    { preHandler: isAuthenticated },
    controller.deleteItem
  )

  app.delete<{ Params: { cartItemId: string } }>(
    "/remove/:cartItemId",
    { preHandler: isAuthenticated },
    controller.removeItem
  )

  app.delete("/clear", { preHandler: isAuthenticated }, controller.clearCart)
  app.get("/cartItems", { preHandler: isAuthenticated }, controller.showItems)
  app.get("/cartItems/qty", { preHandler: isAuthenticated }, controller.countItems)
}
