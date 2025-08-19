import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";

const userController = new UserController()

export async function user(app: FastifyInstance) {
    app.post("/signup", userController.create)
    app.post("/signin", userController.login)
    app.post("/logout", { preHandler: isAuthenticated }, userController.logout)
    app.get("/me", { preHandler: isAuthenticated }, userController.me)

    app.get("/users", { preHandler: isAdmin }, userController.getUsers)
    app.get("/users/qty", { preHandler: isAdmin }, userController.getUsersQty)
    app.get<{ Params: { id: string } }>("/users/:id", { preHandler: isAdmin }, userController.getUserById)
    app.delete<{ Params: { id: string } }>("/users/:id", { preHandler: isAdmin }, userController.deleteUser)

    app.put("/editcredentials", { preHandler: isAuthenticated }, userController.updateCredentials)
    app.get("/customer", { preHandler: isAuthenticated }, userController.getProfile)
    app.put("/customer", { preHandler: isAuthenticated }, userController.updateProfile)
    app.get("/user/orders", { preHandler: isAuthenticated }, userController.getOrders)
    app.get("/user/orders/qty", { preHandler: isAuthenticated }, userController.getOrdersQty)
}
