import { FastifyReply, FastifyRequest } from "fastify";
import { getStores, getStore } from "../../usecases/customer/stores.usecases";

export class StoresController {
    async getStores(req: FastifyRequest, reply: FastifyReply){
        const stores = await getStores()
        return reply.code(200).send(stores)
    }

    async getStore(req: FastifyRequest, reply: FastifyReply){
        const { storeId }: any = req.params;
        const store = await getStore(storeId);

        return reply.code(200).send(store);
    }
}