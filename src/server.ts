import { FastifyInstance, fastify } from "fastify";
import { customerProfile, productListing, categories, stores, cartOperations } from "../src/routes/customer/customer.routes"
import { user } from "./routes/user.routes"

export const app: FastifyInstance = fastify();

app.register(customerProfile)
app.register(productListing)
app.register(categories)
app.register(stores)
app.register(cartOperations)
app.register(user)

app.listen({ port: 8080 }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});