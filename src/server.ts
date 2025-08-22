import { FastifyInstance, fastify } from "fastify";
import { productsRouter, cartRouter, storesRouter, categoriesRouter, addressesRouter, ordersRouter } from "./routes/customer"
import { fastifyCors } from "@fastify/cors";
import cookie from "@fastify/cookie";
import { user } from "./routes/user.routes"
import { statusCodes } from "./utils/types";
import { STATUS_CODES } from "http";

import PrismaPlugin from "./lib/prisma"

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

app.register(PrismaPlugin);


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

const trustedProxies = (process.env.TRUSTED_PROXIES as string).split(",")

// INFO: Cross origin access to this API
app.register(fastifyCors, {
  origin: (origin, cb) => {
    console.log("Incoming Origin:", origin);
    const allowed = trustedProxies.includes(origin ?? "");
    cb(null, allowed);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});

app.register(cookie);

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
