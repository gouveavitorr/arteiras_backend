export interface Client {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export interface ClientCreate {
  name: string;
  email: string;
  cpf: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export interface ClientUpdate {
  name?: string;
  email?: string;
  cpf?: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
}

export interface ClientRepository {
  findAll(): Promise<Client[]>;
  findById(id: string): Promise<Client | null>;
  create(data: ClientCreate): Promise<Client>;
  update(id: string, data: ClientUpdate): Promise<Client | null>;
  delete(id: string): Promise<void>;
}
