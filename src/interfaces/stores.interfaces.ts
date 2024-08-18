export interface Store {
  id: string;
  name: string;
  description: string;
  owner: string;
  phoneNumber: string | null;
  instagramId: string | null;
  facebookId: string | null;
  //products
  //categories
}

export interface StoreCreate {
  name: string;
  description: string;
  owner: string;
  phoneNumber: string | null;
  instagramId: string | null;
  facebookId: string | null;
}

export interface StoreUpdate {
  name?: string;
  description?: string;
  owner?: string;
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
