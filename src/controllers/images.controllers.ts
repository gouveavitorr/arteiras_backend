import { FastifyReply, FastifyRequest } from "fastify";
import { ImagesUseCases } from "../usecases/images.usecases";

const imagesUseCases = new ImagesUseCases();

export class ImagesController {
  async findAll(req: FastifyRequest, reply: FastifyReply) {
    const images = await imagesUseCases.findAll();
    return reply.code(200).send(images);
  }

  async findById(req: FastifyRequest, reply: FastifyReply) {
    const { id }: any = req.params;
    const image = await imagesUseCases.findById(id);
    return reply.code(200).send(image);
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const { productId, link }: any = req.body;
    const image = await imagesUseCases.create({
      productId,
      link,
    });
    return reply.code(200).send(image);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const { id }: any = req.params;
    const { productId, link }: any = req.body;
    const image = await imagesUseCases.update(id, {
      productId,
      link,
    });
    return reply.code(200).send(image);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { id }: any = req.params;
    const image = await imagesUseCases.delete(id);
    reply.code(200);
  }
}
