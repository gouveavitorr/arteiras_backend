//colocar todas as rotas do lado do cliente aqui
import { FastifyInstance } from "fastify";
import { CustomerProfileController } from "../../controllers/customer/customer-profile.controller";
import { ProductListingController } from "../../controllers/customer/product-listing.controller";
import { CategoriesController } from "../../controllers/customer/categories.controller";
import { StoresController } from "../../controllers/customer/stores.controller";

const customerProfileController = new CustomerProfileController()
const productListingController = new ProductListingController()
const categoriesController = new CategoriesController()
const storesController = new StoresController()

export async function customerProfile(app: FastifyInstance) {
  app.get("/customers/:customerId", customerProfileController.getProfile);
  app.put("/customers/:customerId", customerProfileController.updateProfile)
  app.get("/customers/:customerId/orders", customerProfileController.getOrders)
}

export async function productListing(app: FastifyInstance) {
    app.get("/products", productListingController.getProducts)
}

export async function categories(app: FastifyInstance) {
  app.get("/categories", categoriesController.getCategories)
  app.get("/categories/:categoryId/products", categoriesController.getProductsByCategory)
  app.get("/categories/:categoryId/stores", categoriesController.getStoresByCategory)
}

export async function stores(app: FastifyInstance) {
  app.get("/stores", storesController.getStores)
  app.get("/stores/:storeId", storesController.getStore)
}