import {
  Customer,
  CustomerCreate,
  CustomerRepository,
  CustomerUpdate,
} from "../interfaces/customers.interfaces";
import { CustomersUsecases } from "../usecases/customers.usecases";

const customersUseCases = new CustomersUsecases();
export class CustomersController {
  //req e reply vêm de onde? como tipamos? é uma tipagem geral?
  async findAll(req: any, reply: any) {
    const customers = await customersUseCases.findAll();
    return reply.code(200).send(customers);
  }

  async findById(req: any, reply: any) {
    const { id } = req.params;
    const customer = await customersUseCases.findById(id);
    return reply.code(200).send(customer);
  }

  async create(req: any, reply: any) {
    const { name, email, cpf, password, phoneNumber, address } = req.body;
    const customer = await customersUseCases.create({
      name,
      email,
      cpf,
      password,
      phoneNumber,
    });
    return reply.code(200).send(customer);
  }

  async update(req: any, reply: any) {
    const { id } = req.params;
    const { name, email, cpf, password, phoneNumber, address } = req.body;
    const customer = await customersUseCases.update(id, {
      name,
      email,
      cpf,
      password,
      phoneNumber,
    });
    return reply.code(200).send(customer);
  }

  async delete(req: any, reply: any) {
    const { id } = req.params;
    const customer = await customersUseCases.delete(id);
    reply.code(200);
  }
}
