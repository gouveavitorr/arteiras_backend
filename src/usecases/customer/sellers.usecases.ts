import { app } from "../../server";

export interface SellerFormInterface {
    name: string,
    cpf: string,
    phoneNumber: string,
}

export const getSellers = async () => {
    const sellers = await app.prisma.seller.findMany()
    return sellers
}

export const getSeller = async (sellerId: string) => {
    const seller = await app.prisma.seller.findFirst({
        where: {
            id: sellerId
        }
    })
    if (!seller) {
        throw new Error("Loja não encontrada.")
    }

    return seller
}

export const getSellersQty = async () => {
    const totalSellers = await app.prisma.seller.count()

    return { totalSellers }
}

export const createSeller = async (data: SellerFormInterface) => {
    const seller = await app.prisma.seller.create({
        data
    })
    return seller
}

export const updateSeller = async (id: string, data: SellerFormInterface) => {
    const seller = await app.prisma.seller.update({
        data,
        where: {
            id
        }
    })
    return seller
}


export const deleteSeller = async (id: string) => {
    const seller = await app.prisma.seller.delete({
        where: {
            id
        }
    })
    return seller
}
