import { Product } from "./products.interfaces";
import { Store } from "./stores.interfaces";

export interface Category {
    id: string;
    name: string;
    stores: Store[];
    products: Product[];
}

export interface CategoryCreate {
    name: string;
}

export interface CategoryUpdate {
    name?: string;
}

export interface CategoryRepository {
    findAll(): Promise<Category[]>;
    findById(id: string): Promise<Category | null>;
    create(data: CategoryCreate): Promise<Category>;
    update(id: string, data: CategoryUpdate): Promise<Category | null>;
    delete(id: string): Promise<void>;
}