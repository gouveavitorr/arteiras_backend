import { FastifyRequest, FastifyReply } from "fastify";
import { getCategories, getProductsByCategory, getStoresByCategory } from "../../usecases/customer/categories.usecases";

export class CategoriesController {
    async getCategories(_req: FastifyRequest, reply: FastifyReply) {
        try {
            const categories = await getCategories()

            return reply.code(200).send(categories)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async getProductsByCategory(req: FastifyRequest<{ Params: { categoryId: string } }>, reply: FastifyReply) {
        try {
            const { categoryId } = req.params
            const products = await getProductsByCategory(categoryId)

            return reply.code(200).send(products)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async getStoresByCategory(req: FastifyRequest<{ Params: { categoryId: string } }>, reply: FastifyReply) {
        try {
            const { categoryId } = req.params
            const stores = await getStoresByCategory(categoryId)

            return reply.code(200).send(stores)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
}
