import { prisma } from "../../lib/prisma"

export interface AddressRequest {
    street: string,
    number: string,
    neighborhood: string,
    city: string,
    state: string,
    country: string,
    postalCode: string,
    recipient: string,
    reference: string,
    userId: string,
}

export const addNewAddress = async (data: AddressRequest) => {
        const customer = await prisma.customer.findFirst({
            where: {
                id: data.userId
            }
        })

        if (!customer) {
            throw new Error("Cliente não encontrado.")
        }

        const address = await prisma.address.create({
            data: {
                street: data.street,
                number: data.number,
                neighborhood: data?.neighborhood,
                city: data.city,
                state: data.state,
                country: data.country,
                postalCode: data.postalCode,
                recipient: data.recipient,
                reference: data?.reference,
                userId: user.id
            }
        })
        return address
}

export const showAddresses = async (id: string) => {
        const customer = await prisma.customer.findFirst({
            where: {
                id
            }
        })

        if (!customer) {
            throw new Error("Cliente não encontrado.")
        }

        const addresses = await prisma.address.findMany({
            where: {
                userId: user.id
            }
        })

        return addresses
}

export const editAddress = async (id: string, data) => {
        const address = await prisma.address.findFirst({
            where: {
                id
            }
        })

        if (!address) {
            throw new Error("Endereço não encontrado.")
        }

        const updatedAddress = await prisma.address.update({
            where: {
                id: address.id
            },
            data: {
                street: data?.street || address.street,
                number: data?.number || address.number,
                neighborhood: data?.neighborhood || address.neighborhood,
                city: data?.city || address.city,
                state: data?.state || address.state,
                country: data?.country || address.country,
                postalCode: data?.postalCode || address.postalCode,
                recipient: data?.recipient || address.recipient,
                reference: data?.reference || address.reference
            }
        })

        return updatedAddress
}

export const deleteAddress = async (id: string) => {
        const address = await prisma.address.delete({
            where: {
                id
            }
        })
}