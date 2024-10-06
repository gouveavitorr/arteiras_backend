import { FastifyInstance } from "fastify";
import { ImagesController } from "../controllers/images.controllers";

const imagesController = new ImagesController();

export async function images(app: FastifyInstance) {
  app.get("/images", imagesController.findAll);

  app.get("/images/:id", imagesController.findById);

  app.post("/images", imagesController.create);

  app.put("/images/:id", imagesController.update);

  app.delete("/images/:id", imagesController.delete);
}
