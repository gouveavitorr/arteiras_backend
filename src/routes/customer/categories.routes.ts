import { FastifyInstance } from "fastify";
import { CategoriesController } from "../../controllers/customer/categories.controller";

const controller = new CategoriesController()

export async function categories(app: FastifyInstance) {
  app.get("/categories", controller.getCategories)
  app.get("/categories/:categoryId/products", controller.getProductsByCategory)
  app.get("/categories/:categoryId/stores", controller.getStoresByCategory)
}

