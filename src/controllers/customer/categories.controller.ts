import { FastifyRequest, FastifyReply } from "fastify";
import { getCategories, getProductsByCategory, getStoresByCategory } from "../../usecases/customer/categories.usecases";

export class CategoriesController {
    async getCategories(req: FastifyRequest, reply: FastifyReply) {
        try {
            const categories = await getCategories()

            return reply.code(200).send(categories)
        } catch (err) {
            console.log("err: ", err);

            return reply.code(500).send({ error: "Server Error" })
        }
    }

    async getProductsByCategory(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { categoryId }: any = req.params
            const products = await getProductsByCategory(categoryId)

            return reply.code(200).send(products)
        } catch (err) {
            console.log("err: ", err);

            return reply.code(500).send({ error: "Server Error" })
        }
    }

    async getStoresByCategory(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { categoryId }: any = req.params
            const stores = await getStoresByCategory(categoryId)

            return reply.code(200).send(stores)
        } catch (err) {
            console.log("err: ", err);
            return reply.code(500).send({ error: "Server Error" })
        }
    }
}
