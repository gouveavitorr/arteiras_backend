import { FastifyReply, FastifyRequest } from "fastify";
import { updateCustomerProfile, getCustomerProfile, getCustomerOrders } from "../../usecases/customer/customer-profile.usecases";

export class CustomerProfileController {

  async getProfile(req: FastifyRequest, reply: FastifyReply) {
    const { id }: any = req.user;
    const profile = await getCustomerProfile(id);
    return reply.code(200).send(profile);
  }

  async updateProfile(req: FastifyRequest, reply: FastifyReply) {
    const { id }: any = req.user;
    const { cpf, phoneNumber }: any = req.body;

    //verificar cpf (limpeza de string)
    //verificar phoneNumber

    const updatedCustomer = await updateCustomerProfile(id, {
      cpf,
      phoneNumber,
    });
    //como faço pra fazer essas informações opcionais? preciso testar preenchendo o update com um deles nulo e ver o que acontece com o original no banco
    return reply.code(200).send(updateCustomerProfile);
  }

  async getOrders(req: FastifyRequest, reply: FastifyReply) {
    const { id }: any = req.user;
    const orders = await getCustomerOrders(id);
    return reply.code(200).send(orders);
  }
}
