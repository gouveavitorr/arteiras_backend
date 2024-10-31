import { prisma } from "../lib/prisma";
import {
  Seller,
  SellerCreate,
  SellerUpdate,
  SellerRepository,
} from "../interfaces/sellers.interfaces";

export class SellersRepositoryPrisma implements SellerRepository {
  async findAll(): Promise<Seller[]> {
    const sellers = await prisma.seller.findMany();
    return sellers;
  }

  async findById(id: string): Promise<Seller | null> {
    const seller = await prisma.seller.findUnique({
      where: { id },
    });
    return seller;
  }

  async create(data: SellerCreate): Promise<Seller> {
    const seller = await prisma.seller.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        phoneNumber: data.phoneNumber,
      },
    });

    return seller;
  }

  async update(id: string, data: SellerUpdate): Promise<Seller | null> {
    const seller = await prisma.seller.findUnique({
      where: { id },
    });

    const updatedSeller = await prisma.seller.update({
      where: { id },
      data: {
        name: data.name || seller?.name,
        cpf: data.cpf || seller?.cpf,
        phoneNumber: data.phoneNumber || seller?.phoneNumber,
      },
    });

    return updatedSeller;
  }

  async delete(id: string): Promise<void> {
    const seller = await prisma.seller.delete({
      where: { id },
    });
  }
}
