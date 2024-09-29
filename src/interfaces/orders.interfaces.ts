import { Customer } from "./customers.interfaces"
import { Address } from "./addresses.interfaces"
import { PaymentMethod } from "./paymentMethods.interfaces"
import { Store } from "./stores.interfaces"
import { OrderItem } from "./orderItems.interfaces"

export interface Order {
    id: string;
    orderItems: OrderItem[];
    totalAmount: number;
    deliveryExpenses: number;
    orderStatus: string;
    trackingCode: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    customer: Customer;
    addressId: string;
    address: Address;
    paymentMethodId?: string;
    paymentMethod?: PaymentMethod;
    stores: Store[];
}

export interface OrderCreate {
    totalAmount: number;
    deliveryExpenses: number;
    orderStatus: string;
    trackingCode: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    addressId: string;
    address: Address;
    paymentMethodId?: string;
}

export interface OrderUpdate {
    totalAmount?: number;
    deliveryExpenses?: number;
    orderStatus?: string;
    trackingCode?: string;
    createdAt?: Date;
    updatedAt?: Date;
    customerId?: string;
    customer?: Customer;
    addressId?: string;
    address?: Address;
    paymentMethodId?: string;
    paymentMethod?: PaymentMethod;
    stores?: Store[];
}

export interface OrderRepository {
    findAll(): Promise<Order[]>;
    findById(id: string): Promise<Order | null>;
    create(data: OrderCreate): Promise<Order>;
    update(id: string, data: OrderUpdate): Promise<Order | null>;
    delete(id: string): Promise<void>;
}