import { FastifyInstance } from "fastify";
import { CategoriesController } from "../../controllers/customer/categories.controller";
import { isAdmin } from "../../middlewares/isAdmin";

const controller = new CategoriesController()

export async function categoriesRouter(app: FastifyInstance) {
  app.get("/categories", controller.getCategories)
  app.get("/categories/qty", controller.getCategoriesQty)
  app.get("/categories/:categoryId/products", controller.getProductsByCategory)
  app.get("/categories/:categoryId/stores", controller.getStoresByCategory)

  app.post("/categories", { preHandler: isAdmin }, controller.createCategory)

  // app.post("/categories/", controller.createCategory)
  // app.put("/categories/:categoryId", controller.updateCategory)
  // app.delete("/categories/:categoryId", controller.deleteCategory)
}

