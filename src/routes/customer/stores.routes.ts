import { FastifyInstance } from "fastify";
import { StoresController } from "../../controllers/customer/stores.controller";

const controller = new StoresController()

export async function storesRouter(app: FastifyInstance) {
  app.get("/stores", controller.getStores)
  app.get("/stores/:storeId", controller.getStore)
  app.get("/stores/qty", controller.getStoresQty)

  // app.post("/stores/", controller.createStore)
  // app.put("/stores/:storeId", controller.updateStore)
  // app.delete("/stores/:storeId", controller.deleteStore)
}
