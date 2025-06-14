import { FastifyReply, FastifyRequest } from "fastify";
import { getStores, getStore } from "../../usecases/customer/stores.usecases";
import { statusCodes } from "../../utils/types";

export class StoresController {
    async getStores(_req: FastifyRequest, reply: FastifyReply) {
        try {
            const stores = await getStores()

            return reply.code(statusCodes.successful).send(stores)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async getStore(req: FastifyRequest<{ Params: { storeId: string } }>, reply: FastifyReply) {
        try {
            const { storeId } = req.params;
            const store = await getStore(storeId);

            return reply.code(statusCodes.successful).send(store);
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
}
