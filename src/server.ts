import { FastifyInstance, fastify } from "fastify";
import { productsRouter, cartRouter, storesRouter, categoriesRouter, addressesRouter, ordersRouter } from "./routes/customer"
import { user } from "./routes/user.routes"
import { statusCodes } from "./utils/types";
import { fastifyCors } from "@fastify/cors";
import cookie from "@fastify/cookie";

export const app: FastifyInstance = fastify({
  exposeHeadRoutes: true, // Default value
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
app.setErrorHandler(async error => {
  app.log.warn(error.message)

  throw new Error(error.message)
})

const trustedProxies = (process.env.TRUSTED_PROXIES as string).split(",")

// INFO: Cross origin access to this API
app.register(fastifyCors, {
  origin: trustedProxies,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
})

app.register(cookie);

// INFO: Server Health check route
app.get('/health', (_, reply) => reply.code(statusCodes.successful).send({ status: "OK" }))

// INFO: Site icon
app.get('/favicon.ico', (_, reply) => reply.code(statusCodes.noContent))

// INFO: Routes
app.register(async (router) => {
  // router.register(customerProfile)
  router.register(productsRouter)
  router.register(categoriesRouter)
  router.register(storesRouter)
  router.register(cartRouter)
  router.register(addressesRouter)
  router.register(ordersRouter)
  router.register(user)
}, {
  prefix: "/api/v1"
})

const port = process.env.PORT as unknown as number
const host = process.env.HOST as string // host 0.0.0.0 to expose the connection

app.listen({ host, port }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
