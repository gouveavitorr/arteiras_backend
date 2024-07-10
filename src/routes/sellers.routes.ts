import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function sellers(app: FastifyInstance) {
    app.get("/sellers", async(request, reply) => {
        const sellers = await prisma.seller.findMany({

        })
        return reply.send(sellers)
    })

    app.get("/sellers/:id", async(request, reply) => {
        const { id } : any = request.params
        const seller = await prisma.seller.findUnique({
            where: { id }
        })
        return reply.send(seller)
    })

    app.post("/sellers", async(request, reply) => {
        const {
            name,
            cpf,
            phoneNumber,
        } : any = request.body
        const seller = await prisma.seller.create({
            data : {
                name,
                cpf,
                phoneNumber,
            }
        })
        return reply.send(seller)
    })

    app.put("/sellers/:id", async(request, reply) => {
        const { id } : any = request.params
        const {
            name,
            cpf,
            phoneNumber,
        } : any = request.body

        const seller = await prisma.seller.findUnique({
            where: {id}
        })

        const updatedSeller = await prisma.seller.update({
            where: {id},
            data: {
                name: name || seller?.name,
                cpf: cpf || seller?.cpf,
                phoneNumber: phoneNumber || seller?.phoneNumber
            }
        })

        return reply.send(updatedSeller)
    })

    app.delete("/sellers/:id", async(request, reply) => {
        const {id}:any = request.params
        const seller = await prisma.seller.delete({
            where: {id}
        })
        return reply.send("Deletion completed!")
    })
}