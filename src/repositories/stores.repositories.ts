import { prisma } from "../lib/prisma";
import {
  Store,
  StoreCreate,
  StoreUpdate,
  StoreRepository,
} from "../interfaces/stores.interfaces";

export class StoresRepositoryPrisma implements StoreRepository {
  async findAll(): Promise<Store[]> {
    const stores = await prisma.store.findMany();
    return stores;
  }

  async findById(id: string): Promise<Store | null> {
    const store = await prisma.store.findUnique({
      where: {
        id,
      },
    });
    return store;
  }

  async create(data: StoreCreate): Promise<Store> {
    const { name, description, sellerId, phoneNumber, instagramId, facebookId } =
      data;
    const store = await prisma.store.create({
      data: {
        name,
        description,
        phoneNumber,
        sellerId,
        instagramId,
        facebookId,
      },
    });
    return store;
  }

  async update(id: string, data: StoreUpdate): Promise<Store | null> {
    const { name, description, sellerId, phoneNumber, instagramId, facebookId } =
      data;
    const store = await prisma.store.findUnique({
      where: {
        id,
      },
    });
    const updatedStore = await prisma.store.update({
      where: {
        id,
      },
      data: {
        name: name || store?.name,
        description: description || store?.description,
        sellerId: sellerId || store?.sellerId,
        phoneNumber: phoneNumber || store?.phoneNumber,
        instagramId: instagramId || store?.instagramId,
        facebookId: facebookId || store?.facebookId,
      },
    });
    return updatedStore;
  }

  async delete(id: string): Promise<void> {
    const store = await prisma.store.delete({
      where: {
        id,
      },
    });
  }
}
