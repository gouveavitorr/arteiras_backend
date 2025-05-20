import { FastifyInstance } from "fastify";
import { ProductListingController } from "../../controllers/customer/product-listing.controller";

const controller = new ProductListingController()

export async function productListing(app: FastifyInstance) {
  app.get("/products", controller.getProducts)
}
