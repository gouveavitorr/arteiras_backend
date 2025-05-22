import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// INFO: From fastify docs: https://fastify.dev/docs/v5.2.x/Guides/Database/
//
// npm i fastify-plugin
//
// 'use strict'
//
// import fp from 'fastify-plugin'
// import { PrismaClient } from "@prisma/client";
//
// function prismaPlugin(fastify, options, done) {
//   if(!fastify.knex) {
//     const prisma = new PrismaClient(options);
//     fastify.decorate('prisma', prisma)
//
//     fastify.addHook('onClose', (fastify, done) => {
//       if (fastify.prisma === prisma) {
//         fastify.prisma.destroy(done)
//       }
//     })
//   }
//
//   done()
// }
//
// export default fp(prismaPlugin, { name: 'fastify-knex-example' })
