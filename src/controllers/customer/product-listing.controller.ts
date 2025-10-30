import { FastifyReply, FastifyRequest } from "fastify";
import { createProduct, deleteProduct, getPaginatedProducts, getProduct, getProductQty, updateProduct } from "../../usecases/customer/product-listing.usecases";
import { statusCodes } from "../../utils/types";
import { ProductCreateRequest, ProductUpdateRequest } from "../../schemas/products";
import { createImage, createProductImage } from "../../usecases/customer/images.usecases"; 

export class ProductListingController {
    async getProducts(req: FastifyRequest<{
        Querystring: {
            page?: string,
            limit?: string,
            categoryId?: number,
            storeId?: number,
            priceMin?: number,
            priceMax?: number,
            weight?: number,
            size?: number,
            quantity?: number,
            search?: string,
        }
    }>, reply: FastifyReply) {
        try {
            const page = parseInt(req.query.page || "1")
            const limit = parseInt(req.query.limit || "10")
            const offset = (page - 1) * limit

            const filters = {
                categoryId: req.query.categoryId,
                storeId: req.query.storeId,
                priceMin: req.query.priceMin ? Number(req.query.priceMin) : undefined,
                priceMax: req.query.priceMax ? Number(req.query.priceMax) : undefined,
                weight: req.query.weight ? Number(req.query.weight) : undefined,
                size: req.query.size ? Number(req.query.size) : undefined,
                quantity: req.query.quantity ? Number(req.query.quantity) : undefined,
                search: req.query.search,
            }

            const { products, totalItems } = await getPaginatedProducts(offset, limit, filters)

            const totalPages = Math.ceil(totalItems / limit)

            return {
                products,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1,
                }
            }
        } catch (error) {
            return reply.code(statusCodes.badRequest).send(error)
        }
    }

    async getProductQty(_: FastifyRequest, reply: FastifyReply) {
        try {
            const qty = await getProductQty()
            return reply.code(statusCodes.successful).send(qty)
        } catch (error) {
            return reply.code(statusCodes.notFound).send(error)
        }
    }

    async getProductItem(req: FastifyRequest<{ Params: { productId: string } }>, reply: FastifyReply) {
        try {
            const { productId } = req.params
            const product = await getProduct(productId)
            return reply.code(statusCodes.successful).send(product)
        } catch (error) {
            throw error
        }
    }

    async createProduct(req: FastifyRequest, reply: FastifyReply) {
        try {
            const parts = req.parts();
            if (!parts) throw new Error("Invalid Multipart Form");
            
            const fields: Record<string, any> = {};
            const fileParts: any[] = [];
            
            for await (const part of parts) {
                if (part.type === 'field') {
                    fields[part.fieldname] = String(part.value);
                } else if (part.type === 'file') {
                    fileParts.push(part);
                }
            }
            const convertedBody = {
                price: Number(fields.price) || 0,
                weight: Number(fields.weight) || 0,
                size: Number(fields.size) || 0,
                quantity: Number(fields.quantity) || 0,
                name: fields.name || '',
                description: fields.description || '',
                storeId: fields.storeId || '',
                categoryId: fields.categoryId || '',
                image: fields.image || null, 
            };

            const productData = ProductCreateRequest.parse(convertedBody); 


            const product = await createProduct(productData); 

            if (!product) {
                console.error("ERRO GRAVE: createProduct retornou nulo.");

                throw new Error("Falha na criação da entrada principal do produto.");
    }

            if (fileParts.length > 0) {
                console.log(`INFO: Tentando criar ${fileParts.length} imagem(ns)...`);
                const imagePromises = fileParts.map(filePart => {
                    console.log(`DEBUG: Processando arquivo: ${filePart.filename}`); 
                    return createImage(filePart);
                });
                const images = await Promise.all(imagePromises);
                console.log(`DEBUG: ${images.length} imagens salvas com sucesso.`); 

                const connectionPromises = images.map(image => createProductImage({
                    productId: product.id,
                    imageId: image.id,
                }));
                await Promise.all(connectionPromises);
            }

            return reply.code(statusCodes.successful).send(product);
        } catch (error) {
            throw error
        }
    }

    async updateProduct(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = req.params;
            
            const parts = req.parts();
            if (!parts) {
                throw new Error("Invalid Multipart Form");
            }

            let productDataString: string = '';
            const newImageFileParts: any[] = [];
            
            for await (const part of parts) {
                if (part.type === 'field') {
                    if (part.fieldname === 'productData') {
                        productDataString = String(part.value);
                    }
                } else if (part.type === 'file') {
                    newImageFileParts.push(part);
                }
            }

            if (!productDataString) {
                 throw new Error("Missing 'productData' field in multipart payload.");
            }

            let productDataJSON: any;
            try {
                productDataJSON = JSON.parse(productDataString);
            } catch (e) {
                throw new Error("Invalid JSON format for 'productData' field.");
            }
            
            const convertedBody = {
                price: Number(productDataJSON.price) || 0,
                weight: Number(productDataJSON.weight) || 0,
                size: Number(productDataJSON.size) || 0,    
                quantity: Number(productDataJSON.quantity) || 0,
                name: String(productDataJSON.name || ''),
                description: String(productDataJSON.description || ''),
                storeId: String(productDataJSON.storeId || ''),
                categoryId: String(productDataJSON.categoryId || ''),
                image: productDataJSON.image || null,
            };

            const productData = ProductUpdateRequest.parse(convertedBody);

            const updateControl = {
                productData: productData,
                imagesToKeep: (productDataJSON.existingImages as string[]) || [], 
                newImageFileParts: newImageFileParts, 
                storeId: productData.storeId,
                categoryId: productData.categoryId,
            };
            const product = await updateProduct(id, updateControl);

            return reply.code(statusCodes.successful).send(product)
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            await deleteProduct(id)

            return reply.code(statusCodes.successful).send({ message: "Product deleted successfully" })
        } catch (error) {
            throw error
        }
    }
}