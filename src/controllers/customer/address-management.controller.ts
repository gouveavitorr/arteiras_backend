import { FastifyRequest, FastifyReply } from "fastify";
import { addNewAddress, AddressRequest, deleteAddress, editAddress, EditAddressInterface, showAddresses } from "../../usecases/customer/address-management.usecases";
import { statusCodes } from "../../utils/types";
import { AddAddressRequest } from "../../schemas/addresses";

export class AddressManagementController {
    async addAddress(req: FastifyRequest<{ Body: AddressRequest }>, reply: FastifyReply) {
        try {
            const addressData = AddAddressRequest.parse(req.body) 

            const address = await addNewAddress(addressData)

            return reply.code(200).send(address)
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

    async updateAddress(req: FastifyRequest<{ Body: EditAddressInterface }>, reply: FastifyReply) {
        try {
            const { addressId } = req.params
            const addressData = AddAddressRequest.parse(req.body)

            const updatedAddress = await editAddress(addressId, addressData)

            return reply.code(statusCodes.successful).send(updatedAddress)

        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }

    async removeAddress(req: FastifyRequest, reply: FastifyReply) {
        const { addressId } = req.params
        await deleteAddress(addressId)

        return reply.code(statusCodes.successful).send({ message: "Endereço excluído."})
    }

    async getPostalCode(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { postalCode } = req.params
            const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${postalCode}`)

            if(!response.ok) {
                throw new Error("Não foi possível buscar o CEP.")
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
          return reply.code(statusCodes.successful).send({
            state: null,
            city: null,
            neighborhood: null,
            street: null,
          })
        }
    }
}
