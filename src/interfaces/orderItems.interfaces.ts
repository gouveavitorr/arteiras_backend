import { Product } from "./products.interfaces"
import { Order } from "./orders.interfaces"

export interface OrderItem {
    id: string;
    quantity: number;
    productId: string;
    product: Product;
    orderId: string;
    order: Order;
}

export interface OrderItemCreate {
    quantity: number;
    productId: string;
    orderId: string;
}

export interface OrderItemUpdate {
    quantity?: number;
    productId?: string;
    orderId?: string;
}

export interface OrderItemRepository {
    findAll(): Promise<OrderItem[]>;
    findById(id: string): Promise<OrderItem | null>;
    create(data: OrderItemCreate): Promise<OrderItem>;
    update(id: string, data: OrderItemUpdate): Promise<OrderItem | null>;
    delete(id: string): Promise<void>;
}