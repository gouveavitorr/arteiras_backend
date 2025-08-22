import { FastifyReply, FastifyRequest } from "fastify";
import { createProduct, getPaginatedProducts, getProduct, getProductQty } from "../../usecases/customer/product-listing.usecases";
import { statusCodes } from "../../utils/types";
import { ProductCreateRequest } from "../../schemas/products";

export class ProductListingController {
    async getProducts(req: FastifyRequest<{
        Querystring: {
            page?: string,
            limit?: string,
            categoryId?: number,
            storeId?: number,
            priceMin?: number,
            priceMax?: number,
            weight?: number,
            size?: number,
            quantity?: number,
            search?: string,
        }
    }>, reply: FastifyReply) {
        try {
            const page = parseInt(req.query.page || "1")
            const limit = parseInt(req.query.limit || "10")
            const offset = (page - 1) * limit

            const filters = {
                categoryId: req.query.categoryId,
                storeId: req.query.storeId,
                priceMin: req.query.priceMin ? Number(req.query.priceMin) : undefined,
                priceMax: req.query.priceMax ? Number(req.query.priceMax) : undefined,
                weight: req.query.weight ? Number(req.query.weight) : undefined,
                size: req.query.size ? Number(req.query.size) : undefined,
                quantity: req.query.quantity ? Number(req.query.quantity) : undefined,
                search: req.query.search,
            }

            const { products, totalItems } = await getPaginatedProducts(offset, limit, filters)

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
            return reply.code(statusCodes.badRequest).send(error)
        }
    }

    async getProductQty(_: FastifyRequest, reply: FastifyReply) {
        try {
            const qty = await getProductQty()
            return reply.code(statusCodes.successful).send(qty)
        } catch (error) {
            return reply.code(statusCodes.notFound).send(error)
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

    async createProduct(req: FastifyRequest, reply: FastifyReply) {
        try {
            const productData = ProductCreateRequest.parse(req.body)

            const product = await createProduct(productData)

            return reply.code(statusCodes.successful).send(product)
        } catch (error) {
            return reply.code(statusCodes.serverError).send(error)
        }
    }
}
