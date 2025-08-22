import { FastifyInstance } from "fastify";
import { CategoriesController } from "../../controllers/customer/categories.controller";
import { isAdmin } from "../../middlewares/isAdmin";

const controller = new CategoriesController()

export async function categoriesRouter(app: FastifyInstance) {
  app.get("/", controller.getCategories)
  app.get("/qty", controller.getCategoriesQty)
  app.get("/:categoryId/products", controller.getProductsByCategory)
  app.get("/:categoryId/stores", controller.getStoresByCategory)

  app.post("/", { preHandler: isAdmin }, controller.createCategory)
  app.put<{ Params: { id: string } }>("/:id", { preHandler: isAdmin }, controller.updateCategory)
  app.delete<{ Params: { id: string } }>("/:id", { preHandler: isAdmin }, controller.deleteCategory)
}

