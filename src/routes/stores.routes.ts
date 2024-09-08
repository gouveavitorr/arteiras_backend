import { FastifyInstance } from "fastify";
import { StoresController } from "../controllers/stores.controllers";

const storesController = new StoresController()

export async function stores(app: FastifyInstance) {
  app.get("/stores", storesController.findAll)

  app.get("/stores/:id", storesController.findById)

  app.post("/stores", storesController.create)

  app.put("/stores/:id", storesController.update)

  app.delete("/stores/:id", storesController.delete)
}
