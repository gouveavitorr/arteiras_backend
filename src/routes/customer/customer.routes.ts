//colocar todas as rotas do lado do cliente aqui
import { FastifyInstance } from "fastify";
import { ProductListingController } from "../../controllers/customer/product-listing.controller";
import { CategoriesController } from "../../controllers/customer/categories.controller";
import { StoresController } from "../../controllers/customer/stores.controller";
import { CartOperationsController } from "../../controllers/customer/cart-operations.controller";
import { OrdersController } from "../../controllers/customer/orders.controller"
import { isAuthenticated } from "../../middlewares/isAuthenticated";

const product = new ProductListingController()
const category = new CategoriesController()
const store = new StoresController()
const cart = new CartOperationsController()
const order = new OrdersController()

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
  app.post("/cart/add", { preHandler: isAuthenticated }, cart.addItem)
  app.delete("/cart/delete/:cartItemId", { preHandler: isAuthenticated }, cart.deleteItem)
  app.delete("/cart/remove/:cartItemId", { preHandler: isAuthenticated }, cart.removeItem)
  app.delete("/cart/clear", { preHandler: isAuthenticated }, cart.clearCart)
  app.get("/cart/cartItems", { preHandler: isAuthenticated }, cart.showItems)
}

export async function orders(app: FastifyInstance) {
  app.get("/orders", { preHandler: isAuthenticated }, order.getOrders)
  app.get("/orders/:orderId", { preHandler: isAuthenticated }, order.getOrder)
}