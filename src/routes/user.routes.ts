import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const userController = new UserController()

export async function user(app: FastifyInstance) {
    app.post("/signup", userController.create)
    app.put("/editprofile", { preHandler: isAuthenticated }, userController.update)
    app.post("/login", userController.login)
}