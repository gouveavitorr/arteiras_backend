import { FastifyInstance } from "fastify";
import { SellersController } from "../controllers/sellers.controllers";

const sellersController = new SellersController();

export async function sellers(app: FastifyInstance) {
  app.get("/sellers", sellersController.findAll);

  app.get("/sellers/:id", sellersController.findById);

  app.post("/sellers", sellersController.create);

  app.put("/sellers/:id", sellersController.update);

  app.delete("/sellers/:id", sellersController.delete);
}