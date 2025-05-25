import { FastifyRequest, FastifyReply } from "fastify";
import { addNewAddress, AddressRequest } from "../../usecases/customer/address-management.usecases";

export class AddressManagementController {
    async addAddress(req: FastifyRequest<{ Body: AddressRequest }>, reply: FastifyReply) {
        try {
            // TODO: Use zod to parse and validate the data
            const {
                street,
                number,
                neighborhood,
                city,
                state,
                country,
                postalCode,
                recipient,
                reference,
                userId
            } = req.body

            const address = await addNewAddress({ street, number, neighborhood, city, state, country, postalCode, recipient, reference, userId })

            return reply.code(200).send(address)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async getAddresses(req: FastifyRequest, reply: FastifyReply) {
        // const { customerId }: any = req.params
        // const addresses = 
    }
}
