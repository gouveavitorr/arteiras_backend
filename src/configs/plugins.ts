import { fastifyCors } from "@fastify/cors";
import cookie from "@fastify/cookie";
import multipart from "@fastify/multipart";
import prisma from "../lib/prisma"

import { FastifyInstance } from "fastify";

export function configPlugins(app: FastifyInstance) {
    // INFO: File save Plugin
    app.register(multipart, {
        attachFieldsToBody: true,
        limits: {
            fileSize: 10 * 1024 * 1024, // 10 MB
        },
    });

    // INFO: Database Plugin
    app.register(prisma);

    // INFO: Cross origin access to this API plugin
    const trustedProxies = (process.env.TRUSTED_PROXIES as string).split(",")
    app.register(fastifyCors, {
        origin: (origin, cb) => {
            console.log("Incoming Origin:", origin);
            const allowed = trustedProxies.includes(origin ?? "");
            cb(null, allowed);
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    });

    // INFO: Cookie plugin
    app.register(cookie);
}
