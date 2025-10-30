import { FastifyReply, FastifyRequest } from "fastify";
import { getStores, getStore, getStoresQty, createStore, updateStore, deleteStore } from "../../usecases/customer/stores.usecases";
import { statusCodes } from "../../utils/types";
import { StoreCreateRequest, StoreUpdateRequest } from "../../schemas/stores";
import { createImage, createStoreImage } from "../../usecases/customer/images.usecases";

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

    async getStoresQty(_: FastifyRequest, reply: FastifyReply) {
        try {
            const qty = await getStoresQty()
            return reply.code(statusCodes.successful).send(qty)
        } catch (error) {
            return reply.code(statusCodes.notFound).send(error)
        }
    }

    async createStore(req: FastifyRequest, reply: FastifyReply) {
        try {
            const storeData = StoreCreateRequest.parse(req.body)

            const store = await createStore(storeData)

            return reply.code(statusCodes.successful).send(store)
        } catch (error) {
            throw error
        }
    }

async createStoreWithFile(req: FastifyRequest, reply: FastifyReply) {
    try {
        const file = await req.file(); 

            const rawBody = (file as any)?.fields || req.body; 
            
            const dataToValidate = {
                name: (rawBody as any).name?.value || "",
                description: (rawBody as any).description?.value || "",
                sellerId: (rawBody as any).sellerId?.value || "",
                phoneNumber: (rawBody as any).phoneNumber?.value || null,
                instagramId: (rawBody as any).instagramId?.value || null,
                facebookId: (rawBody as any).facebookId?.value || null,
            };
            
            const storeData = StoreCreateRequest.parse(dataToValidate); 
            
            const store = await createStore(storeData);

            if (file) {
                const image = await createImage(file); 

                await createStoreImage({
                    storeId: store.id,
                    imageId: image.id
                });
            }
            
            return reply.code(statusCodes.successful).send(store);

    } catch (error) {
        throw new Error(`Erro: ${error}`)
    }
}

    async updateStore(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = req.params
            const storeData = StoreUpdateRequest.parse(req.body)

            const store = await updateStore(id, storeData)

            return reply.code(statusCodes.successful).send(store)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async deleteStore(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            await deleteStore(id)

            return reply.code(statusCodes.successful).send({ message: "Store deleted successfully" })
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
}
