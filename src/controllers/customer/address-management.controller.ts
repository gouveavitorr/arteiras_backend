import { FastifyRequest, FastifyReply } from "fastify";
import { addNewAddress } from "../../usecases/customer/address-management.usecases";

export class AddressManagementController {
    async addAddress(req: FastifyRequest, reply: FastifyReply) {
        try {
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
                customerId
            }: any = req.body

            const address = await addNewAddress({ street, number, neighborhood, city, state, country, postalCode, recipient, reference, customerId })

            return reply.code(200).send(address)
        } catch (err) {
            console.log("err: ", err);

            return reply.code(500).send({ error: "Server Error" })
        }
    }

    async getAddresses(req: FastifyRequest, reply: FastifyReply) {
        // const { customerId }: any = req.params
        // const addresses = 
    }
}
