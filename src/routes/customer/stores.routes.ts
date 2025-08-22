import { FastifyInstance } from "fastify";
import { StoresController } from "../../controllers/customer/stores.controller";
import { isAdmin } from "../../middlewares/isAdmin";

const controller = new StoresController()

export async function storesRouter(app: FastifyInstance) {
  app.get("/stores", controller.getStores)
  app.get("/stores/:storeId", controller.getStore)
  app.get("/stores/qty", controller.getStoresQty)

  app.post("/stores/", { preHandler: isAdmin }, controller.createStore)
  app.put<{ Params: { id: string } }>("/stores/:storeId", { preHandler: isAdmin }, controller.updateStore)
  app.delete<{ Params: { id: string } }>("/stores/:storeId", { preHandler: isAdmin }, controller.deleteStore)
}
