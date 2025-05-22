import { FastifyReply, FastifyRequest } from "fastify";
import { getStores, getStore } from "../../usecases/customer/stores.usecases";

export class StoresController {
    async getStores(req: FastifyRequest, reply: FastifyReply) {
        try {
            const stores = await getStores()

            return reply.code(200).send(stores)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async getStore(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { storeId }: any = req.params;
            const store = await getStore(storeId);

            return reply.code(200).send(store);
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
}
