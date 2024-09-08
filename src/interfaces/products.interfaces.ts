//import store & order typings

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    weight: number;
    size: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    // storeId: string;
    // orderId: any;
    // store: any;
    // order: JSON | null;
    // images: string[];
  }
  
  export interface ProductCreate {
    name: string;
    price: number;
    description: string;
    weight: number;
    size: number;
    quantity: number;
    // storeId: string;
    // images: string[];
    // order: JSON(?);
    //store: JSON(?);
  }
  
  export interface ProductUpdate {
    name?: string;
    price?: number;
    description?: string;
    weight?: number;
    size?: number;
    quantity?: number;
    // storeId?: string;
    // images?: string[];
    //store?: JSON(?);
  }
  
  export interface ProductRepository {
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    create(data: ProductCreate): Promise<Product>;
    update(id: string, data: ProductUpdate): Promise<Product | null>;
    delete(id: string): Promise<void>;
  }
  