import { Store, StoreCreate, StoreRepository, StoreUpdate } from "../interfaces/stores.interfaces";
import { StoresUsecases } from "../usecases/stores.usecases";

const storesUseCases = new StoresUsecases();

export class StoresController {
    async findAll(req: any, reply: any) {
        
    }

    async findById(req: any, reply: any) {
        
    }

    async create(req: any, reply: any) {
        
    }

    async update(id: string, data: StoreUpdate) {
        
    }

    async delete(id: string): Promise<void> {
        
    }
}
