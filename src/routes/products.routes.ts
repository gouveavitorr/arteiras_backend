import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma"

export async function products(app: FastifyInstance) {
    app.get("/products", async(request, reply) => {
        
        return reply.send(products)
    })

    app.get("/products/:id", async(request, reply) => {
        const { id }:any = request.params
        
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