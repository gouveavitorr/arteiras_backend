import { Product } from "./products.interfaces";

export interface Image {
    id: string;
    link: string;
    productId: string;
    product: Product;
}

export interface ImageCreate {
    productId: string;
    link: string;
}

export interface ImageRepository {
    findAll(): Promise<Image[]>;
    findById(id: string): Promise<Image | null>;
    create(data: ImageCreate): Promise<Image>;
    delete(id: string): Promise<void>;
}