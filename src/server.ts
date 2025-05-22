import { FastifyInstance, fastify } from "fastify";
import { productsRouter, /*ordersRouter,*/ cartRouter, storesRouter, categoriesRouter } from "./routes/customer"
import { user } from "./routes/user.routes"

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

// INFO: Server Health check route
app.get('/health', (_, res) => res.code(200).send({ status: "OK" }))

// INFO: Site icon
app.get('/favicon.ico', (_, res) => res.code(204))

// INFO: Routes
// app.register(customerProfile)
app.register(productsRouter)
app.register(categoriesRouter)
app.register(storesRouter)
app.register(cartRouter)
app.register(user)

const port = process.env.PORT as unknown as number
const host = process.env.HOST as string // host 0.0.0.0 to expose the connection

app.listen({ host, port }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
