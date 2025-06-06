import { FastifyReply, FastifyRequest } from "fastify";
import { getPaginatedProducts, getProduct } from "../../usecases/customer/product-listing.usecases";
import { statusCodes } from "../../utils/types";

export class ProductListingController {
    async getProducts(req: FastifyRequest<{ Querystring: { page: string, limit: string } }>, reply: FastifyReply) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const offset = (page - 1) * limit
            const { products, totalItems } = await getPaginatedProducts(offset, limit)

            const totalPages = Math.ceil(totalItems / limit)

            return {
                products,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1,
                }
            }
        } catch (error) {
            return reply.code(statusCodes.badRequest).send(error.message)
        }
    }

    async getProductItem(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { productId } = req.params
            const product = await getProduct(productId)
            return reply.code(statusCodes.successful).send(product)
        } catch (error) {
            return reply.code(statusCodes.notFound).send(error.message)
        }
    }
}
