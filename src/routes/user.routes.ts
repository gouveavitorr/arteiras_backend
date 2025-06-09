import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const userController = new UserController()

export async function user(app: FastifyInstance) {
    app.post("/signup", userController.create)
    app.put("/editcredentials", { preHandler: isAuthenticated }, userController.updateCredentials)
    app.post("/signin", userController.login)
    app.get("/customer", { preHandler: isAuthenticated }, userController.getProfile)
    app.put("/customer", { preHandler: isAuthenticated }, userController.updateProfile)
    app.get("/user/orders", { preHandler: isAuthenticated }, userController.getOrders)
}
