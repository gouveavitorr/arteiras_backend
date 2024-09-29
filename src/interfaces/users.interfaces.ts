export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface UserCreate {
    name: string;
    email: string;
    password: string;
}

export interface UserUpdate {
    name?: string;
    email?: string;
    password?: string;
}

export interface UserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    create(data: UserCreate): Promise<User>;
    update(id: string, data: UserUpdate): Promise<User | null>;
    delete(id: string): Promise<void>;  
}