import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma"

export async function products(app: FastifyInstance) {
    app.get("/products", async(request, reply) => {
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
        return reply.send(products)
    })

    app.get("/products/:id", async(request, reply) => {
        const { id }:any = request.params
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
        return reply.send(product)
    })

    app.post("/products", async(request, reply) => {
        const {
            name,
            price,
            description,
            storeId,
            quantity,
            //images,
        }: any = request.body
        const product = await prisma.product.create({
            data: {
                name,
                price,
                description,
                storeId,
                quantity,
                //images,
            }
        })
        return reply.send(product)
    })

    app.put("/products/:id", async(request, reply) => {
        const { id }:any = request.params
        const {
            name,
            price,
            description,
            storeId,
            quantity
        }:any = request.body

        const product = await prisma.product.findUnique({
            where: { id } 
        })

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name: name || product?.name,
                price: price || product?.price,
                description: description || product?.description,
                storeId: storeId || product?.storeId,
                quantity: quantity || product?.quantity
            }
        })
        return reply.send(updatedProduct)
    })

    app.delete("/products/:id", async (request, reply) => {
        const { id }: any = request.params;
        const product = await prisma.product.delete({
          where: {
            id,
          },
        });
        return reply.send("Deletion completed!");
      });
}