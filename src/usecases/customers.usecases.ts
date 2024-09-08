import {
  Customer,
  CustomerCreate,
  CustomerUpdate,
  CustomerRepository,
} from "../interfaces/customers.interfaces";

import { CustomersRepositoryPrisma } from "../repositories/customers.repositories";

export class CustomersUsecases {
  private customerRepository: CustomerRepository;
  constructor() {
    this.customerRepository = new CustomersRepositoryPrisma();
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.customerRepository.findAll();
    return customers;
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  }

  async create(data: CustomerCreate): Promise<Customer> {
    const { name, email, cpf, password, phoneNumber, address } = data;
    const customer = await this.customerRepository.create({
      name,
      email,
      cpf,
      password,
      phoneNumber,
      address,
    });

    return customer;
  }

  async update(id: string, data: CustomerUpdate): Promise<Customer | null> {
    const { name, email, cpf, password, phoneNumber, address } = data;

    //errors

    const customer = await this.customerRepository.update(id, {
      name,
      email,
      cpf,
      password,
      phoneNumber,
      address,
    });

    return customer;
  }

  async delete(id: string): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new Error("Nonexistent id");
    }
    await this.customerRepository.delete(id);
  }
}
