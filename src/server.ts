import Fastify, { FastifyInstance } from "fastify";
import { stores } from "./routes/store.routes";

const app: FastifyInstance = Fastify();

app.register(stores);

app.listen({ port: 8080 }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
