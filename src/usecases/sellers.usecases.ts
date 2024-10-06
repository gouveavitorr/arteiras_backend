import {
  Seller,
  SellerCreate,
  SellerUpdate,
  SellerRepository,
} from "../interfaces/sellers.interfaces";

import { SellersRepositoryPrisma } from "../repositories/sellers.repositories";

export class SellersUsecases {
  private sellerRepository: SellerRepository;
  constructor() {
    this.sellerRepository = new SellersRepositoryPrisma();
  }

  async findAll(): Promise<Seller[]> {
    const sellers = await this.sellerRepository.findAll();

    return sellers;
  }

  async findById(id: string): Promise<Seller | null> {
    const seller = await this.sellerRepository.findById(id);
    if (!seller) {
      throw new Error("Seller not found");
    }

    return seller;
  }

  async create(data: SellerCreate): Promise<Seller> {
    const { name, cpf, phoneNumber } = data;
    const seller = await this.sellerRepository.create({
      name,
      cpf,
      phoneNumber,
    });

    return seller;
  }

  async update(id: string, data: SellerUpdate): Promise<Seller | null> {
    const { name, cpf, phoneNumber } = data;

    const updatedSeller = await this.sellerRepository.update(id, {
      name,
      cpf,
      phoneNumber,
    });

    return updatedSeller;
  }

  async delete(id: string): Promise<void> {
    const seller = await this.sellerRepository.findById(id);

    if (!seller) {
      throw new Error("Nonexistent id");
    }

    await this.sellerRepository.delete(id);
  }
}
