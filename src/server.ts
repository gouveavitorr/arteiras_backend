import Fastify, { FastifyInstance } from "fastify";
import { stores } from "./routes/stores.routes";
import { products } from "./routes/products.routes";
import { sellers } from "./routes/sellers.routes";
import { clients } from "./routes/clients.routes";

const app: FastifyInstance = Fastify();

app.register(stores)
app.register(products)
app.register(sellers)
app.register(clients)

app.listen({ port: 8080 }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
