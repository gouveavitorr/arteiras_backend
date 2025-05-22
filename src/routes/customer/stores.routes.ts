import { FastifyInstance } from "fastify";
import { StoresController } from "../../controllers/customer/stores.controller";

const controller = new StoresController()

export async function storesRouter(app: FastifyInstance) {
  app.get("/stores", controller.getStores)
  app.get("/stores/:storeId", controller.getStore)
}
