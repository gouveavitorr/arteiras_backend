import { FastifyRequest, FastifyReply, FastifyError } from "fastify";
import { addNewAddress, AddressRequest, deleteAddress, editAddress, EditAddressInterface, showAddresses } from "../../usecases/customer/address-management.usecases";
import { statusCodes } from "../../utils/types";
import { AddAddressRequest, UpdateAddressRequest } from "../../schemas/addresses";

export class AddressManagementController {
    async addAddress(req: FastifyRequest<{ Body: AddressRequest }>, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const addressData = AddAddressRequest.parse(req.body)

            const address = await addNewAddress(id, addressData)

            return reply.code(statusCodes.successful).send(address)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async getAddresses(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const addresses = await showAddresses(id)
            return reply.code(statusCodes.successful).send(addresses)
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async updateAddress(req: FastifyRequest<{ Body: EditAddressInterface, Params: { addressId: string } }>, reply: FastifyReply) {
        try {
            const { id } = req.user!
            const { addressId } = req.params
            const addressData = UpdateAddressRequest.parse(req.body)

            const updatedAddress = await editAddress(id, addressId, addressData)

            return reply.code(statusCodes.successful).send(updatedAddress)

        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async removeAddress(req: FastifyRequest<{ Params: { addressId: string } }>, reply: FastifyReply) {
        try {
            const { addressId } = req.params
            await deleteAddress(addressId)

            return reply.code(statusCodes.successful).send({ message: "Endereço excluído." })
        } catch (error) {
            throw error
        }
    }

    async getPostalCode(req: FastifyRequest<{ Params: { postalCode: string } }>, reply: FastifyReply) {
        try {
            const { postalCode } = req.params
            const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${postalCode}`)

            if (!response.ok) {
                const err = new Error("Error searching for CEP") as FastifyError
                err.statusCode = response.status
                throw err
            }

            const data = await response.json()
            const payload = {
                state: data.state,
                city: data.city,
                neighborhood: data.neighborhood,
                street: data.street,
            }
            return reply.code(statusCodes.successful).send(payload)
        } catch (error) {
            throw error
        }
    }
}
