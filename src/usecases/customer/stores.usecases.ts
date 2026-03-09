import { app } from "../../server";

export interface StoreFormInterface {
    name: string,
    description: string,
    image?: string | null, 
    sellerId: string,
    phoneNumber: string,
    instagramId: string,
    facebookId: string,
}

export interface StoreUpdateControl {
    storeData: StoreFormInterface;
    existingImage: string | null; 
    newImage?: any;
}

export const getStores = async () => {
    const stores = await app.prisma.store.findMany({
        include: {
            images: {
                select: {
                    image: {
                        select: {
                            id: true,
                            url: true,
                            filename: true
                        }
                    }
                }
            },
            seller: {
                select: {
                    name: true
                }
            }
        }
    })
    return stores
}

export const getStore = async (storeId: string) => {
    const store = await app.prisma.store.findFirst({
        where: {
            id: storeId
        },
        include: {
            images: {
                select: {
                    image: {
                        select: {
                            id: true,
                            url: true,
                            filename: true
                        }
                    }
                }
            },
            products: {
                include: {
                    images: {
                        select: {
                            image: {
                                select: {
                                    url: true,
                                }
                            }
                        }
                    },
                    categories: true
                }
            },
            
        }
    })
    if (!store) {
        throw new Error("Loja não encontrada.")
    }

    return store
}

export const getStoresQty = async () => {
    const totalStores = await app.prisma.store.count()

    return { totalStores }
}

export const createStore = async (data: StoreFormInterface) => {
    const store = await app.prisma.store.create({
        data
    })
    return store
}

export const updateStore = async (id: string, control: StoreUpdateControl) => {
    
    const { image, existingImages, sellerId, ...restOfStoreData } = control.storeData as any;
    
    const existingRelations = await app.prisma.storeImage.findMany({
        where: { storeId: id },
        include: { image: true },
    });

    const hasNewImage = !!control.newImage;
    const removedExistingImage = !control.existingImage;

    if (hasNewImage || removedExistingImage) {
        if (existingRelations.length > 0) {
            await app.prisma.storeImage.deleteMany({
                where: { storeId: id },
            });
            
            for (const relation of existingRelations) {
                await app.prisma.image.delete({
                    where: { id: relation.imageId }
                });
            }
        }
    }

    if (hasNewImage) {
        const { createStoreImage } = (await import('./images.usecases'));
        await createStoreImage({
            storeId: id,
            imageId: control.newImage.id, 
        });
    }

    const store = await app.prisma.store.update({
        data: {
            ...restOfStoreData,
            seller: { 
                connect: { id: sellerId } 
            }
        },
        where: {
            id: id
        }
    });

    return store;
}

export const deleteStore = async (id: string) => {
    const imageRelations = await app.prisma.storeImage.findMany({
        where: { storeId: id },
    });

    await app.prisma.storeImage.deleteMany({
        where: { storeId: id },
    });

    for (const relation of imageRelations) {
        await app.prisma.image.delete({
            where: { id: relation.imageId },
        });
    }
    const store = await app.prisma.store.delete({
        where: { id: id }
    });
    return store
}