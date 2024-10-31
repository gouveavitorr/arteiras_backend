import { Product } from "./products.interfaces";
import { Category } from "./categories.interfaces"
export interface Store {
  id: string;
  name: string;
  image: string;
  description: string;
  sellerId: string;
  phoneNumber: string | null;
  instagramId: string | null;
  facebookId: string | null;
  products: Product[];
  categories: Category[];
}

export interface StoreCreate {
  name: string;
  description: string;
  image: string;
  sellerId: string;
  phoneNumber: string | null;
  instagramId: string | null;
  facebookId: string | null;
}

export interface StoreUpdate {
  name?: string;
  description?: string;
  image?: string;
  sellerId?: string;
  phoneNumber?: string;
  instagramId?: string;
  facebookId?: string;
}

export interface StoreRepository {
  findAll(): Promise<Store[]>;
  findById(id: string): Promise<Store | null>;
  create(data: StoreCreate): Promise<Store>;
  update(id: string, data: StoreUpdate): Promise<Store | null>;
  delete(id: string): Promise<void>;
}
