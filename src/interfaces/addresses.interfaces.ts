import { Customer } from "./customers.interfaces"
import { Order } from "./orders.interfaces"

export interface Address {
    id: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    recipient: string;
    reference: string;
    customerId: string;
    customer: Customer;
    orders: Order[];
}

export interface AddressCreate {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    recipient: string;
    reference: string;
    customerId: string;
}

export interface AddressUpdate {
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    recipient?: string;
    reference?: string;
}

export interface AddressRepository {
    findAll(): Promise<Address[]>;
    findById(id: string): Promise<Address | null>;
    create(data: AddressCreate): Promise<Address>;
    update(id: string, data: AddressUpdate): Promise<Address | null>;
    delete(id: string): Promise<void>;
}