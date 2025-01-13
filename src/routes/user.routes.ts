import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";

const userController = new UserController()

export async function user(app: FastifyInstance) {
    app.post("/signup", userController.create)
    app.put("/editprofile", userController.update)
}