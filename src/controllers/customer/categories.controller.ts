import { FastifyRequest, FastifyReply } from "fastify";
import { getCategories, getProductsByCategory, getStoresByCategory } from "../../usecases/customer/categories.usecases";

export class CategoriesController {
    async getCategories(req: FastifyRequest, reply: FastifyReply) {
        const categories = await getCategories()
        return reply.code(200).send(categories)
    }

    async getProductsByCategory(req: FastifyRequest, reply: FastifyReply) {
        const { id }: any = req.params
        const products = await getProductsByCategory(id) 
        return reply.code(200).send(products)
    }

    async getStoresByCategory(req: FastifyRequest, reply: FastifyReply) {
        const { id }: any = req.params
        const stores = await getStoresByCategory(id)
        return reply.code(200).send(stores)
    }
}