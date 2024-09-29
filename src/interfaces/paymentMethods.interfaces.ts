import { Customer } from "./customers.interfaces"
import { Order } from "./orders.interfaces"

export interface PaymentMethod {
    id: string;
    type: string;
    customerId: string;
    customer: Customer;
    orders: Order[];
}

export interface PaymentMethodCreate {
    type: string;
    customerId: string;
}

export interface PaymentMethodUpdate {
    type: string;
}

export interface PaymentMethodRepository {
    findAll(): Promise<PaymentMethod[]>;
    findById(id: string): Promise<PaymentMethod | null>;
    create(data: PaymentMethodCreate): Promise<PaymentMethod>;
    update(id: string, data: PaymentMethodUpdate): Promise<PaymentMethod | null>;
    delete(id: string): Promise<void>;
}