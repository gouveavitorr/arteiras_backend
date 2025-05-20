import { FastifyInstance, fastify } from "fastify";
import { ProductsRoute, CartRoute, OrdersRoute, StoresRoute, CategoriesRoute } from "./routes/customer"
import { user } from "./routes/user.routes"

export const app: FastifyInstance = fastify();

// app.register(customerProfile)
app.register(ProductsRoute.productListing)
app.register(CategoriesRoute.categories)
app.register(StoresRoute.stores)
app.register(CartRoute.cartOperations)
app.register(user)

const port = process.env.PORT as unknown as number
const host = process.env.HOST as string

app.listen({ host: host, port: port }, function(err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
