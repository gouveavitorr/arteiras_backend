//colocar todas as rotas do lado do cliente aqui
import { FastifyInstance } from "fastify";
import { CustomerProfileController } from "../../controllers/customer/customer-profile.controllers";

const customerProfileController = new CustomerProfileController();

export async function customerProfile(app: FastifyInstance) {
  app.get("/customers/:customerId", customerProfileController.getProfile);
  app.put("/customers/:customerId", customerProfileController.updateProfile)
  app.get("/customers/:customerId/orders", customerProfileController.getOrders)
}