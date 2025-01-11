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
    customerId: string,
}

export const addNewAddress = async (data: AddressRequest) => {
    try {
        const customer = await prisma.customer.findFirst({
            where: {
                id: data.customerId
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
                customerId: customer.id
            }
        })
        return address

    } catch (error) {
        throw new Error(`Erro: ${error.message}`)
    }
}

export const showAddresses = async (id: string) => {
    try {
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
                customerId: customer.id
            }
        })

        return addresses
        
    } catch (error) {
        throw new Error(`Erro: ${error.message}`)
    }
}

export const editAddress = async (id: string, data) => {
    try {
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

    } catch (error) {
        throw new Error(`Erro: ${error.message}`)
    }
}

export const deleteAddress = async (id: string) => {
    try {
        const address = await prisma.address.delete({
            where: {
                id
            }
        })
    } catch (error) {
        throw new Error(`Erro: ${error.message}`)
    }
}