import { FastifyInstance, fastify } from "fastify";
import { productsRouter, cartRouter, storesRouter, categoriesRouter, addressesRouter, ordersRouter, sellersRouter } from "./routes/customer"
import { user } from "./routes/user.routes"
import { statusCodes } from "./utils/types";
import { STATUS_CODES } from "http";
import { configPlugins } from "./configs/plugins";

import fs from "fs/promises";
import path from "path";

export const UPLOAD_DIR = path.join(__dirname, "../uploads");

export const app: FastifyInstance = fastify({
  exposeHeadRoutes: true, // Default value
  trustProxy: 1,
  logger: {
    level: 'info',
    redact: ['req.headers.authorization'], // INFO: Prevent privacy laws violation
    transport: {
      target: 'pino-pretty'
    },
    serializers: {
      req: function(req) {
        return {
          url: req.url,
          method: req.method,
          // WARN: Including some headers in the log could violate privacy laws (LGPD)
          // headers: req.headers
        }
      }
    }
  }
});

// INFO: Upper-level error handler
app.setErrorHandler(async (error, _request, reply) => {
  app.log.warn(`${error.message}${error.log ? `\nlog: ${error.log}` : ""}`)

  const code = error.statusCode || statusCodes.serverError

  reply.code(code).send({
    code: code,
    status: STATUS_CODES[code],
    message: error.message
  })
})

configPlugins(app)

// INFO: Site icon
app.get('/favicon.ico', (_, reply) => reply.code(statusCodes.noContent))

// INFO: Routes
app.register(async (router) => {
  // router.register(customerProfile)
  router.register(productsRouter, { prefix: "/products" })
  router.register(categoriesRouter, { prefix: "/categories" })
  router.register(storesRouter, { prefix: "/stores" })
  router.register(cartRouter, { prefix: "/cart" })
  router.register(addressesRouter, { prefix: "/addresses" })
  router.register(ordersRouter, { prefix: "/orders" })
  router.register(sellersRouter, { prefix: "/sellers" })
  router.register(user)

  // INFO: Server Health check route
  router.get('/health', (_, reply) => reply.code(statusCodes.successful).send({ status: "OK" }))
}, {
  prefix: "/api/v1"
})

const port = process.env.PORT as unknown as number
const host = process.env.HOST as string // host 0.0.0.0 to expose the connection

const start = async () => {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await app.listen({ host, port });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

process.on('uncaughtException', function(error) {
  app.log.fatal('received uncaught exception, shutting down', { error })
  app.close(() => {
    process.exit(0);
  });
})
