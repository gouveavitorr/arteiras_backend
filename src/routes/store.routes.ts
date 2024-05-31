import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function stores(app: FastifyInstance) {
  app.get("/stores", async (request, reply) => {
    const stores = await prisma.store.findMany();
    return reply.send(stores);
  });

  app.get("/stores/:id", async (request, reply) => {
    const { id }: any = request.params;
    const store = await prisma.store.findUnique({
      where: {
        id,
      },
    });
    return reply.send(store);
  });

  app.post("/stores", async (request, reply) => {
    const {
      name,
      description,
      owner,
      phoneNumber,
      instagramId,
      facebookId,
    }: any = request.body;
    const store = await prisma.store.create({
      data: {
        name,
        description,
        owner,
        phoneNumber,
        instagramId,
        facebookId,
      },
    });
    return reply.send(store);
  });

  app.put("/stores/:id", async (request, reply) => {
    const { id }: any = request.params;
    const {
      name,
      description,
      owner,
      phoneNumber,
      instagramId,
      facebookId,
    }: any = request.body;
    const store = await prisma.store.findUnique({
      where: {
        id,
      },
    });
    const updatedStore = await prisma.store.update({
      where: {
        id,
      },
      data: {
        name: name || store?.name,
        description: description || store?.description,
        owner: owner || store?.owner,
        phoneNumber: phoneNumber || store?.phoneNumber,
        instagramId: instagramId || store?.instagramId,
        facebookId: facebookId || store?.facebookId,
      },
    });
    return reply.send(updatedStore);
  });

  app.delete("/stores/:id", async (request, reply) => {
    const { id }: any = request.params;
    const store = await prisma.store.delete({
      where: {
        id,
      },
    });
    return reply.send("Deletion completed!");
  });
}
