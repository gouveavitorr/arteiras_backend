import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function stores(app: FastifyInstance) {
  app.get("/stores", async (request, reply) => {
    return reply.send(stores);
  });

  app.get("/stores/:id", async (request, reply) => {
    const { id }: any = request.params;

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

    return reply.send(updatedStore);
  });

  app.delete("/stores/:id", async (request, reply) => {
    const { id }: any = request.params;

    return reply.send("Deletion completed!");
  });
}
