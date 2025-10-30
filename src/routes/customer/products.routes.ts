import { FastifyInstance } from "fastify";
import { ProductListingController } from "../../controllers/customer/product-listing.controller";
import { isAdmin } from "../../middlewares/isAdmin";
import { processMultipartBody } from "../../middlewares/processMultipartBody";

const controller = new ProductListingController()

export async function productsRouter(app: FastifyInstance) {
  app.get("/", controller.getProducts)
  app.get("/:productId", controller.getProductItem)
  app.get("/qty", controller.getProductQty)

  app.post("/", { 
    preHandler: isAdmin,
    // preValidation: processMultipartBody,
    handler: controller.createProduct
  })
  app.put<{ Params: { id: string } }>("/:id", { 
    preHandler: isAdmin,
    // preValidation: processMultipartBody,
    handler: controller.updateProduct
  })
  app.delete<{ Params: { id: string } }>("/:id", { preHandler: isAdmin }, controller.deleteProduct)
}
