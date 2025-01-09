import { FastifyReply, FastifyRequest } from "fastify";
import { updateCustomerProfile, getCustomerProfile, getCustomerOrders } from "../../usecases/customer/customer-profile.usecases";

export class CustomerProfileController {

  async getProfile(req: FastifyRequest, reply: FastifyReply) {
    const { customerId }: any = req.params;
    const profile = await getCustomerProfile(customerId);
    return reply.code(200).send(profile);
  }

  async updateProfile(req: FastifyRequest, reply: FastifyReply) {
    const { customerId }: any = req.params;
    const { cpf, phoneNumber }: any = req.body;

    //verificar cpf (limpeza de string)
    //verificar phoneNumber

    const updatedCustomer = await updateCustomerProfile(customerId, {
      cpf,
      phoneNumber,
    });
    //como faço pra fazer essas informações opcionais? preciso testar preenchendo o update com um deles nulo e ver o que acontece com o original no banco
    return reply.code(200).send(updateCustomerProfile);
  }

  async getOrders(req: FastifyRequest, reply: FastifyReply) {
    const { customerId }: any = req.params;
    const orders = await getCustomerOrders(customerId);
    return reply.code(200).send(orders);
  }
}
