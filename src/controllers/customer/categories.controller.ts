import { FastifyRequest, FastifyReply } from "fastify";
import { getCategories, getProductsByCategory, getStoresByCategory } from "../../usecases/customer/categories.usecases";
import { statusCodes } from "../../utils/types";

export class CategoriesController {
    async getCategories(_req: FastifyRequest, reply: FastifyReply) {
        try {
            const categories = await getCategories()

            return reply.code(statusCodes.successful).send(categories)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async getProductsByCategory(req: FastifyRequest<{ Params: { categoryId: string } }>, reply: FastifyReply) {
        try {
            const { categoryId } = req.params
            const products = await getProductsByCategory(categoryId)

            return reply.code(statusCodes.successful).send(products)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async getStoresByCategory(req: FastifyRequest<{ Params: { categoryId: string } }>, reply: FastifyReply) {
        try {
            const { categoryId } = req.params
            const stores = await getStoresByCategory(categoryId)

            return reply.code(statusCodes.successful).send(stores)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
}
