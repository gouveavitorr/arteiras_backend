import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function clients(app: FastifyInstance) {
    app.get("/clients", async(request, reply) => {
        const clients = await prisma.client.findMany({

        })
        return reply.send(clients)
    })

    app.get("/clients/:id", async(request, reply) => {
        const { id } : any = request.params
        const client = await prisma.client.findUnique({
            where: { id }
        })
        return reply.send(client)
    })

    app.post("/clients", async(request, reply) => {
        const {
            name,
            email,
            cpf,
            password,
            phoneNumber,
            address,
            //orders[]
            //sessions[]
        } : any = request.body
        const client = await prisma.client.create({
            data : {
                name,
                email,
                cpf,
                password,
                phoneNumber,
                address,
                //orders[]
                //sessions[]
            }
        })
        return reply.send(client)
    })

    app.put("/clients/:id", async(request, reply) => {
        const { id } : any = request.params
        const {
            name,
            email,
            cpf,
            password,
            phoneNumber,
            address,
        } : any = request.body

        const client = await prisma.client.findUnique({
            where: {id}
        })

        const updatedClient = await prisma.client.update({
            where: {id},
            data: {
                name: name || client?.name,
                email: email || client?.email,
                cpf: cpf || client?.cpf,
                password: password || client?.password,
                phoneNumber: phoneNumber || client?.phoneNumber,
                address: address || client?.address
            }
        })

        return reply.send(updatedClient)
    })

    app.delete("/clients/:id", async(request, reply) => {
        const {id}:any = request.params
        const client = await prisma.client.delete({
            where: {id}
        })
        return reply.send("Deletion completed!")
    })
}