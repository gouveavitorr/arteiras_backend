import { FastifyInstance, fastify } from "fastify";
import { productsRouter, /*ordersRouter,*/ cartRouter, storesRouter, categoriesRouter, addressesRouter } from "./routes/customer"
import { user } from "./routes/user.routes"
import { statusCodes } from "./utils/types"
import rateLimit from "@fastify/rate-limit"
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'

const port = process.env.PORT as unknown as number
const host = process.env.HOST as string // host 0.0.0.0 to expose the connection

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

// INFO: Core rate limiter plugin against too many requests
app.register(rateLimit, {
  max: 2,
  timeWindow: 1000,
  hook: 'onRequest', //this is the default value
  allowList: [], //useful for stress tests
})

// INFO: Default 404 handler at startup before plugins are registered
app.setNotFoundHandler({
  preHandler: app.rateLimit()
}, function (request, reply) {
    reply.code(statusCodes.notFound)
})

// INFO: Cross origin access to this API
app.register(cors, {
  origin: [`http://localhost:${port}`,'https://production-domain.com'],
  methods: ["GET", "POST", "PUT", "DELETE"]
})

app.register(helmet, {
  contentSecurityPolicy: false //TODO: this will need to be changed once we know our directives
})

// INFO: Server Health check route
app.get('/health', (_, reply) => reply.code(statusCodes.successful).send({ status: "OK" }))

// INFO: Site icon
app.get('/favicon.ico', (_, reply) => reply.code(statusCodes.noContent))

// INFO: Routes
// app.register(customerProfile)
app.register(productsRouter)
app.register(categoriesRouter)
app.register(storesRouter)
app.register(cartRouter)
app.register(addressesRouter)
app.register(user)


app.listen({ host, port }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
