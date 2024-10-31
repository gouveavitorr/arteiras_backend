import Fastify, { FastifyInstance } from "fastify";
// import { stores } from "./routes/stores.routes";
// import { products } from "./routes/products.routes";
// import { sellers } from "./routes/sellers.routes";
// import { customers } from "./routes/customers.routes";

const app: FastifyInstance = Fastify();

// app.register(stores)
// app.register(products)
// app.register(sellers)
// app.register(customers)

app.listen({ port: 8080 }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
