import { FastifyReply, FastifyRequest } from "fastify";
import { getPaginatedProducts } from "../../usecases/customer/product-listing.usecases";

export class ProductListingController {
    async getProducts(req: FastifyRequest, reply: FastifyReply) {
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
    }
}