import {
  Store,
  StoreCreate,
  StoreUpdate,
  StoreRepository,
} from "../interfaces/stores.interfaces";

import { StoresRepositoryPrisma } from "../repositories/stores.repositories";

export class StoresUsecases {
  private storeRepository: StoreRepository;
  constructor() {
    this.storeRepository = new StoresRepositoryPrisma();
  }

  async findAll(): Promise<Store[]> {
    const stores = await this.storeRepository.findAll();
    return stores;
  }

  async findById(id: string): Promise<Store | null> {
    const store = await this.storeRepository.findById(id);
    if (!store) {
      throw new Error("Store not found");
    }
    return store;
  }

  async create(data: StoreCreate): Promise<Store> {
    const { name, description, owner, phoneNumber, instagramId, facebookId } =
      data;

    const store = await this.storeRepository.create({
      name,
      description,
      owner,
      phoneNumber,
      instagramId,
      facebookId,
    });

    return store;
  }

  async update(id: string, data: StoreUpdate): Promise<Store | null> {
    const { name, description, owner, phoneNumber, instagramId, facebookId } =
      data;

    const store = await this.storeRepository.update(id, {
      name,
      description,
      owner,
      phoneNumber,
      instagramId,
      facebookId,
    });

    return store;
  }

  async delete(id: string): Promise<void> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new Error("Nonexistent id");
    }
    await this.storeRepository.delete(id);
  }
}
