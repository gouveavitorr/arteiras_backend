import { FastifyReply, FastifyRequest } from "fastify";

import { createImage, createProductImage, createStoreImage } from "../../usecases/customer/images.usecases";
import { statusCodes } from "../../utils/types";

export class ImagesController {
    async upload(req: FastifyRequest, reply: FastifyReply) {
        const file = await req.file();

        if (!file) {
            return reply.code(statusCodes.badRequest).send({ message: "No file uploaded" });
        }

        const { type, id } = req.query as { type: "product" | "store"; id: string };

        if (!type || !id) {
            return reply.code(statusCodes.badRequest).send({ message: "Missing type or id in query" });
        }

        const image = await createImage(file)

        if (type === "product") {
            await createProductImage({
                productId: id,
                imageId: image.id,
            })
        }
        else if (type === "store") {
            await createStoreImage({
                storeId: id,
                imageId: image.id,
            })
        }

        return reply.code(statusCodes.successful).send(image);
    }
}
