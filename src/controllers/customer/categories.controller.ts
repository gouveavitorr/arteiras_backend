import { FastifyRequest, FastifyReply } from "fastify";
import { createCategory, deleteCategory, getCategories, getCategoriesQty, getProductsByCategory, getStoresByCategory, updateCategory } from "../../usecases/customer/categories.usecases";
import { statusCodes } from "../../utils/types";
import { CategoryCreateRequest, CategoryUpdateRequest } from "../../schemas/categories";

export class CategoriesController {
    async createCategory(req: FastifyRequest, reply: FastifyReply) {
        try {
            const categoryData = CategoryCreateRequest.parse(req.body)

            const category = await createCategory(categoryData)

            return reply.code(statusCodes.successful).send(category)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

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

    async getCategoriesQty(_: FastifyRequest, reply: FastifyReply) {
        try {
            const qty = await getCategoriesQty()
            return reply.code(statusCodes.successful).send(qty)
        } catch (error) {
            return reply.code(statusCodes.notFound).send(error)
        }
    }

    async updateCategory(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = req.params
            const categoryData = CategoryUpdateRequest.parse(req.body)

            const category = await updateCategory(id, categoryData)

            return reply.code(statusCodes.successful).send(category)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async deleteCategory(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            await deleteCategory(id)

            return reply.code(statusCodes.successful).send({ message: "Category deleted successfully" })
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
}
