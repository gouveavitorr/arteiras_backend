import { FastifyInstance } from "fastify";
import { CartOperationsController } from "../../controllers/customer/cart-operations.controller";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

const controller = new CartOperationsController()

export async function cartOperations(app: FastifyInstance) {
  app.post("/cart/add", { preHandler: isAuthenticated }, controller.addItem)
  app.delete("/cart/delete/:cartItemId", { preHandler: isAuthenticated }, controller.deleteItem)
  app.delete("/cart/remove/:cartItemId", { preHandler: isAuthenticated }, controller.removeItem)
  app.delete("/cart/clear", { preHandler: isAuthenticated }, controller.clearCart)
  app.get("/cart/cartItems", { preHandler: isAuthenticated }, controller.showItems)
}
