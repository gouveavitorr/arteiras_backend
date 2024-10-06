import { prisma } from "../lib/prisma";
import {
  Customer,
  CustomerUpdate,
  CustomerRepository,
} from "../interfaces/customers.interfaces";

export class CustomersRepositoryPrisma implements CustomerRepository {
  async findAll(): Promise<Customer[]> {
    const customers = await prisma.customer.findMany({
      include: {
        user: {
          select: {
            id: true,
          }
        }
      }
    });
    return customers;
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    return customer;
  }

  async update(id: string, data: CustomerUpdate): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: {
        name: data.name || customer?.name,
        email: data.email || customer?.email,
        cpf: data.cpf || customer?.cpf,
        password: data.password || customer?.password,
        phoneNumber: data.phoneNumber || customer?.phoneNumber,
      },
    });
    return updatedCustomer;
  }

  async delete(id: string): Promise<void> {
    const customer = await prisma.customer.delete({
      where: { id },
    });
  }
}
