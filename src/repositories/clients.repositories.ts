import { prisma } from "../lib/prisma";
import {
  Client,
  ClientCreate,
  ClientUpdate,
  ClientRepository,
} from "../interfaces/clients.interfaces";

export class ClientsRepositoryPrisma implements ClientRepository {
  async findAll(): Promise<Client[]> {
    const clients = await prisma.client.findMany();

    return clients;
  }

  async findById(id: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: { id },
    });

    return client;
  }

  async create(data: ClientCreate): Promise<Client> {
    const client = await prisma.client.create({
      data: {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        password: data.password,
        phoneNumber: data.phoneNumber,
        address: data.address,
      },
    });

    return client;
  }

  async update(id: string, data: ClientUpdate): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new Error("Client not found");
    }

    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        name: data.name || client?.name,
        email: data.email || client?.email,
        cpf: data.cpf || client?.cpf,
        password: data.password || client?.password,
        phoneNumber: data.phoneNumber || client?.phoneNumber,
        address: data.address || client?.address,
      },
    });
    return updatedClient;
  }

  async delete(id: string): Promise<void> {
    const client = await prisma.client.delete({
      where: { id },
    });
  }
}
