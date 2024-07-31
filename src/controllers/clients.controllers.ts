import {
  Client,
  ClientCreate,
  ClientRepository,
  ClientUpdate,
} from "../interfaces/clients.interfaces";
import { ClientsUsecases } from "../usecases/clients.usecases";

const clientsUseCases = new ClientsUsecases();
export class ClientsController {
  //req e reply vêm de onde? como tipamos? é uma tipagem geral?
  async findAll(req: any, reply: any) {
    const clients = await clientsUseCases.findAll();
    return reply.code(200).send(clients);
  }

  async findById(req: any, reply: any) {
    const { id } = req.params;
    const client = await clientsUseCases.findById(id);
    return reply.code(200).send(client);
  }

  async create(req: any, reply: any) {
    const { name, email, cpf, password, phoneNumber, address } = req.body;
    const client = await clientsUseCases.create({
      name,
      email,
      cpf,
      password,
      phoneNumber,
      address,
    });
    return reply.code(200).send(client);
  }

  async update(req: any, reply: any) {
    const { id } = req.params;
    const { name, email, cpf, password, phoneNumber, address } = req.body;
    const client = await clientsUseCases.update(id, {
      name,
      email,
      cpf,
      password,
      phoneNumber,
      address,
    });
    return reply.code(200).send(client);
  }

  async delete(req: any, reply: any) {
    const { id } = req.params;
    const client = await clientsUseCases.delete(id);
    reply.code(200);
  }
}
