import { FastifyInstance } from "fastify";
import { StoresController } from "../../controllers/customer/stores.controller";
import { isAdmin } from "../../middlewares/isAdmin";
import { processMultipartBody } from "../../middlewares/processMultipartBody";


const controller = new StoresController()

export async function storesRouter(app: FastifyInstance) {
  app.get("/", controller.getStores)
  app.get("/:storeId", controller.getStore)
  app.get("/qty", controller.getStoresQty)

  app.post("/", { 
    preHandler: isAdmin, 
    handler: controller.createStoreWithFile
  })
  app.put<{ Params: { id: string } }>("/:id", { preHandler: isAdmin }, controller.updateStore)
  app.delete<{ Params: { id: string } }>("/:id", { preHandler: isAdmin }, controller.deleteStore)
}
