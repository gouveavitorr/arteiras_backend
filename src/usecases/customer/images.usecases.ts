import { MultipartFile } from "@fastify/multipart"
import { app, UPLOAD_DIR } from "../../server"
import fs from "fs/promises";
import path from "path";
import { statusCodes } from "../../utils/types";
import { FastifyError } from "fastify";

export interface ProductImageCreateRequest {
    productId: string,
    imageId: string,
}

export interface StoreImageCreateRequest {
    storeId: string,
    imageId: string,
}

export interface ImageCreateRequest {
    url: string,
    filename: string,
}

export const createImage = async (file: MultipartFile) => {
    if (!file) {
        const err = new Error("No file provided") as FastifyError
        err.statusCode = statusCodes.badRequest
        throw err
    }

    const filename = `${Date.now()}-${file.filename}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    await fs.writeFile(filePath, await file.toBuffer());

    const image = await app.prisma.image.create({
        data: {
            url: `/uploads/${filename}`,
            filename,
        },
    });

    return image;
}

export const createProductImage = async (data: ProductImageCreateRequest) => {
    const productImage = await app.prisma.productImage.create({
        data
    })
    return productImage
}

export const createStoreImage = async (data: StoreImageCreateRequest) => {
    const storeImage = await app.prisma.storeImage.create({
        data
    })
    return storeImage
}
