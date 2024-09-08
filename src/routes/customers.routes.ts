import { FastifyInstance } from "fastify";
import { CustomersController } from "../controllers/customers.controllers";

const customersController = new CustomersController();
export async function customers(app: FastifyInstance) {
  app.get("/customers", customersController.findAll);

  app.get("/customers/:id", customersController.findById);

  app.post("/customers", customersController.create);

  app.put("/customers/:id", customersController.update);

  app.delete("/customers/:id", customersController.delete);
}
