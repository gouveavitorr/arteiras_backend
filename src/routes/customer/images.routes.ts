import { FastifyInstance } from "fastify";
import { ImagesController } from "../../controllers/customer/images.controller";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

const controller = new ImagesController()

export async function imagesRouter(app: FastifyInstance) {
    app.post("/upload", { preHandler: isAuthenticated }, controller.upload)
}
