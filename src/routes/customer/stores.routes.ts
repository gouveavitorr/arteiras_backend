import { FastifyInstance } from "fastify";
import { StoresController } from "../../controllers/customer/stores.controller";
import { isAdmin } from "../../middlewares/isAdmin";

const controller = new StoresController()

export async function storesRouter(app: FastifyInstance) {
  app.get("/", controller.getStores)
  app.get("/:storeId", controller.getStore)
  app.get("/qty", controller.getStoresQty)

  app.post("/", { preHandler: isAdmin }, controller.createStore)
  app.put<{ Params: { id: string } }>("/:storeId", { preHandler: isAdmin }, controller.updateStore)
  app.delete<{ Params: { id: string } }>("/:storeId", { preHandler: isAdmin }, controller.deleteStore)
}
