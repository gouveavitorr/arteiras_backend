import { FastifyReply, FastifyRequest } from "fastify";
import { getSellers, getSeller, getSellersQty, createSeller, updateSeller, deleteSeller } from "../../usecases/customer/sellers.usecases";
import { statusCodes } from "../../utils/types";
import { SellerCreateRequest, SellerUpdateRequest } from "../../schemas/sellers";

export class SellersController {
    async getSellers(_req: FastifyRequest, reply: FastifyReply) {
        try {
            const sellers = await getSellers()

            return reply.code(statusCodes.successful).send(sellers)
        } catch (error) {
            throw error
        }
    }

    async getSeller(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = req.params;
            const seller = await getSeller(id);

            return reply.code(statusCodes.successful).send(seller);
        } catch (error) {
            throw error
        }
    }

    async getSellersQty(_: FastifyRequest, reply: FastifyReply) {
        try {
            const qty = await getSellersQty()
            return reply.code(statusCodes.successful).send(qty)
        } catch (error) {
            return reply.code(statusCodes.notFound).send(error)
        }
    }

    async createSeller(req: FastifyRequest, reply: FastifyReply) {
        try {
            const sellerData = SellerCreateRequest.parse(req.body)

            const seller = await createSeller(sellerData)

            return reply.code(statusCodes.successful).send(seller)
        } catch (error) {
            throw error
        }
    }

    async updateSeller(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = req.params
            const sellerData = SellerUpdateRequest.parse(req.body)

            const seller = await updateSeller(id, sellerData)

            return reply.code(statusCodes.successful).send(seller)
        } catch (error) {
            throw error
        }
    }

    async deleteSeller(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            await deleteSeller(id)

            return reply.code(statusCodes.successful).send({ message: "Seller deleted successfully" })
        } catch (error) {
            throw error
        }
    }
}
