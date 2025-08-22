import { app } from "../../server";

export interface AddressRequest {
    street: string,
    number: string,
    neighborhood?: string | null,
    city: string,
    state: string,
    country: string,
    postalCode: string,
    recipient: string,
    reference?: string | null,
    userId?: string,
}

export interface EditAddressInterface {
    street?: string | null,
    number?: string | null,
    neighborhood?: string | null,
    city?: string | null,
    state?: string | null,
    country?: string | null,
    postalCode?: string | null,
    recipient?: string | null,
    reference?: string | null,
    userId?: string | null,
}

export const addNewAddress = async (userId: string, data: AddressRequest) => {
    const user = await app.prisma.user.findFirst({
        where: {
            id: userId
        }
    })

    if (!user) {
        throw new Error("Usuário não encontrado.")
    }

    const address = await app.prisma.address.create({
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
            userId
        }
    })
    return address
}

export const showAddresses = async (id: string) => {
    const user = await app.prisma.user.findFirst({
        where: {
            id
        }
    })

    if (!user) {
        throw new Error("Usuário não encontrado.")
    }

    const addresses = await app.prisma.address.findMany({
        where: {
            userId: user.id
        }
    })

    return addresses
}

export const editAddress = async (userId: string, addressId: string, data: EditAddressInterface) => {
    const address = await app.prisma.address.findFirst({
        where: {
            id: addressId,
            userId
        }
    })

    if (!address) {
        throw new Error("Endereço não encontrado.")
    }

    const updatedAddress = await app.prisma.address.update({
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
    return await app.prisma.address.delete({
        where: {
            id
        }
    })
}
