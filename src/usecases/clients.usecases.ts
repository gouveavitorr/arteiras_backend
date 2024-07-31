import {
  Client,
  ClientCreate,
  ClientUpdate,
  ClientRepository,
} from "../interfaces/clients.interfaces";

import { ClientsRepositoryPrisma } from "../repositories/clients.repositories";

export class ClientsUsecases {
  private clientRepository: ClientRepository;
  constructor() {
    this.clientRepository = new ClientsRepositoryPrisma();
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.clientRepository.findAll();
    return clients;
  }

  async findById(id: string): Promise<Client | null> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new Error("Client not found");
    }
    return client;
  }

  async create(data: ClientCreate): Promise<Client> {
    const { name, email, cpf, password, phoneNumber, address } = data;
    const client = await this.clientRepository.create({
      name,
      email,
      cpf,
      password,
      phoneNumber,
      address,
    });

    return client;
  }

  async update(id: string, data: ClientUpdate): Promise<Client | null> {
    const { name, email, cpf, password, phoneNumber, address } = data;

    //errors

    const client = await this.clientRepository.update(id, {
      name,
      email,
      cpf,
      password,
      phoneNumber,
      address,
    });

    return client;
  }

  async delete(id: string): Promise<void> {
    const client = await this.clientRepository.findById(id)

    if(!client) {
        throw new Error("Nonexistent id")
    }
    await this.clientRepository.delete(id);
  }
}
