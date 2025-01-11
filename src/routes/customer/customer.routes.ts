//colocar todas as rotas do lado do cliente aqui
import { FastifyInstance } from "fastify";
import { CustomerProfileController } from "../../controllers/customer/customer-profile.controller";
import { ProductListingController } from "../../controllers/customer/product-listing.controller";
import { CategoriesController } from "../../controllers/customer/categories.controller";
import { StoresController } from "../../controllers/customer/stores.controller";
import { CartOperationsController } from "../../controllers/customer/cart-operations.controller";
import { OrdersController } from "../../controllers/customer/orders.controller"

const customer = new CustomerProfileController()
const product = new ProductListingController()
const category = new CategoriesController()
const store = new StoresController()
const cart = new CartOperationsController()
const order = new OrdersController()

export async function customerProfile(app: FastifyInstance) {
  app.get("/customers/:customerId", customer.getProfile);
  app.put("/customers/:customerId", customer.updateProfile)
  app.get("/customers/:customerId/orders", customer.getOrders)
}

export async function productListing(app: FastifyInstance) {
    app.get("/products", product.getProducts)
}

export async function categories(app: FastifyInstance) {
  app.get("/categories", category.getCategories)
  app.get("/categories/:categoryId/products", category.getProductsByCategory)
  app.get("/categories/:categoryId/stores", category.getStoresByCategory)
}

export async function stores(app: FastifyInstance) {
  app.get("/stores", store.getStores)
  app.get("/stores/:storeId", store.getStore)
}

export async function cartOperations(app: FastifyInstance) {
  app.post("/cart/add", cart.addItem)
  app.delete("/cart/delete/:cartItemId", cart.deleteItem)
  app.delete("/cart/remove/:cartItemId", cart.removeItem)
  app.delete("/cart/:customerId/clear", cart.clearCart)
  app.get("/cart/:customerId/cartItems", cart.showItems)
}

export async function orders(app: FastifyInstance) {
  app.get("/orders", order.getOrders)
  app.get("/orders/:orderId", order.getOrder)
}