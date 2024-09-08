import { Store, StoreCreate, StoreRepository, StoreUpdate } from "../interfaces/stores.interfaces";
import { StoresUsecases } from "../usecases/stores.usecases";

const storesUseCases = new StoresUsecases();
export class StoresController {
    async findAll(req: any, reply: any) {
        const stores = await storesUseCases.findAll()
        return reply.code(200).send(stores)
    }

    async findById(req: any, reply: any) {
        const { id } = req.params
        const store = await storesUseCases.findById(id)
        return reply.code(200).send(store)
    }

    async create(req: any, reply: any) {
        const { name, description, sellerId, phoneNumber, instagramId, facebookId } = req.body
        const store = await storesUseCases.create({
            name,
            description,
            sellerId,
            phoneNumber,
            instagramId,
            facebookId
        })
        return reply.code(200).send(store)
    }

    async update(req: any, reply: any) {
        const { id } = req.params
        const { name, description, sellerId, phoneNumber, instagramId, facebookId } = req.body
        const store = await storesUseCases.update(id, {
            name, 
            description,
            sellerId,
            phoneNumber,
            instagramId,
            facebookId
        })
        return reply.code(200).send(store)
    }

    async delete(req: any, reply: any) {
        const { id } = req.params
        const store = await storesUseCases.delete(id)
        reply.code(200)
    }
}
