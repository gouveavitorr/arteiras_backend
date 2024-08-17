import { prisma } from "../lib/prisma";
import {
  Product,
  ProductCreate,
  ProductUpdate,
  ProductRepository,
} from "../interfaces/products.interfaces";

export class ProductsRepositoryPrisma implements ProductRepository {

    async findAll(): Promise<Product[]> {
        const products = await prisma.product.findMany({
            include: {
                store: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        })
        return products;
    }

    async findById(id: string): Promise<Product | null> {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                store: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return product;
    }

    async create(data: ProductCreate): Promise<Product> {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
                description: data.description,
                quantity: data.quantity,
            },
        })
        return product
    }

    async update(id: string, data: ProductUpdate): Promise<Product | null> {
        const {name, price, description, quantity} = data;

        const product = await prisma.product.findUnique({
            where: { id } 
        })

        const updatedProduct = await prisma.product.update({
            
            where: { id },
            data: {
                name: name || product?.name,
                price: price || product?.price,
                description: description || product?.description,
                quantity: quantity || product?.quantity
            }
        })
        return updatedProduct
    }

    async delete(id: string): Promise<void> {
    const product = await prisma.product.delete({
      where: { id },
    });
  }
}
