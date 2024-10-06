import { FastifyReply, FastifyRequest } from "fastify";
import { SellersUsecases } from "../usecases/sellers.usecases";

const sellersUsecases = new SellersUsecases();

export class SellersController {
  async findAll(req: FastifyRequest, reply: FastifyReply) {
    const sellers = await sellersUsecases.findAll();
    return reply.code(200).send(sellers);
  }

  async findById(req: FastifyRequest, reply: FastifyReply) {
    const { id }: any = req.params;
    const seller = await sellersUsecases.findById(id);
    return reply.code(200).send(seller);
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const { name, cpf, phoneNumber }: any = req.body;

    const seller = await sellersUsecases.create({
      name,
      cpf,
      phoneNumber,
    });

    return reply.code(200).send(seller);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const { id }: any = req.params;
    const { name, cpf, phoneNumber }: any = req.body;
    const seller = await sellersUsecases.update(id, {
      name,
      cpf,
      phoneNumber,
    });

    return reply.code(200).send(seller);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { id }: any = req.params;
    const seller = await sellersUsecases.delete(id);
    reply.code(200);
  }
}
