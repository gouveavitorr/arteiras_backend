export interface Customer {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  phoneNumber: string;
}

export interface CustomerCreate {
  name: string;
  email: string;
  cpf: string;
  password: string;
  phoneNumber: string;
}

export interface CustomerUpdate {
  name?: string;
  email?: string;
  cpf?: string;
  password?: string;
  phoneNumber?: string;
}

export interface CustomerRepository {
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer | null>;
  create(data: CustomerCreate): Promise<Customer>;
  update(id: string, data: CustomerUpdate): Promise<Customer | null>;
  delete(id: string): Promise<void>;
}
