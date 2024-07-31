import { FastifyInstance } from "fastify";
import { ClientsController } from "../controllers/clients.controllers";

const clientsController = new ClientsController();
export async function clients(app: FastifyInstance) {
  app.get("/clients", clientsController.findAll);

  app.get("/clients/:id", clientsController.findById);

  app.post("/clients", clientsController.create);

  app.put("/clients/:id", clientsController.update);

  app.delete("/clients/:id", clientsController.delete);
}
