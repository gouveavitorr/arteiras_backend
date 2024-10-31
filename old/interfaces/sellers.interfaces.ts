export interface Seller {
  id: string;
  name: string;
  cpf: string;
  phoneNumber: string;
}

export interface SellerCreate {
  name: string;
  cpf: string;
  phoneNumber: string;
}

export interface SellerUpdate {
  name?: string;
  cpf?: string;
  phoneNumber?: string;
}

export interface SellerRepository {
  findAll(): Promise<Seller[]>;
  findById(id: string): Promise<Seller | null>;
  create(data: SellerCreate): Promise<Seller>;
  update(id: string, data: SellerUpdate): Promise<Seller | null>;
  delete(id: string): Promise<void>;
}
