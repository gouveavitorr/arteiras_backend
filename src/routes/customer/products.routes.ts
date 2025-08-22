import { FastifyInstance } from "fastify";
import { ProductListingController } from "../../controllers/customer/product-listing.controller";
import { isAdmin } from "../../middlewares/isAdmin";

const controller = new ProductListingController()

export async function productsRouter(app: FastifyInstance) {
  app.get("/products", controller.getProducts)
  app.get("/products/:productId", controller.getProductItem)
  app.get("/products/qty", controller.getProductQty)

  app.post("/products", { preHandler: isAdmin }, controller.createProduct)
}
