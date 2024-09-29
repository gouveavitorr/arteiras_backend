import { Store } from "./stores.interfaces"
import { Order } from "./orders.interfaces"
import {Image } from "./images.interfaces"

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
    storeId: string;
    orderId: string;
    store: Store;
    order: Order | null;
    images: Image[];
  }
  
  export interface ProductCreate {
    name: string;
    price: number;
    description: string;
    weight: number;
    size: number;
    quantity: number;
    storeId: string;
    images: Image[];
    orderId: string;
  }
  
  export interface ProductUpdate {
    name?: string;
    price?: number;
    description?: string;
    weight?: number;
    size?: number;
    quantity?: number;
    images?: Image[];
  }
  
  export interface ProductRepository {
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    create(data: ProductCreate): Promise<Product>;
    update(id: string, data: ProductUpdate): Promise<Product | null>;
    delete(id: string): Promise<void>;
  }
  