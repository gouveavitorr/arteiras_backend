import { FastifyInstance } from "fastify";
import { SellersController } from "../../controllers/customer/sellers.controller";
import { isAdmin } from "../../middlewares/isAdmin";

const controller = new SellersController()

export async function sellersRouter(app: FastifyInstance) {
  app.get("/", { preHandler: isAdmin }, controller.getSellers)
  app.get<{ Params: { id: string } }>("/:id", { preHandler: isAdmin }, controller.getSeller)
  app.get("/qty", { preHandler: isAdmin }, controller.getSellersQty)

  app.post("/", { preHandler: isAdmin }, controller.createSeller)
  app.put<{ Params: { id: string } }>("/:id", { preHandler: isAdmin }, controller.updateSeller)
  app.delete<{ Params: { id: string } }>("/:id", { preHandler: isAdmin }, controller.deleteSeller)
}
