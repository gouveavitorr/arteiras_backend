import { prisma } from "../lib/prisma";
import {
  Image,
  ImageCreate,
  ImageRepository,
  ImageUpdate,
} from "../interfaces/images.interfaces";

export class ImagesRepositoryPrisma implements ImageRepository {
  async findAll(): Promise<Image[]> {
    const images = await prisma.image.findMany();
    return images;
  }

  async findById(id: string): Promise<Image | null> {
    const image = await prisma.image.findUnique({
      where: { id },
    });
    return image;
  }

  async create(data: ImageCreate): Promise<Image> {
    const image = await prisma.image.create({
      data: {
        productId: data.productId,
        link: data.link,
      },
    });
    return image;
  }

  async update(id: string, data: ImageUpdate): Promise<Image | null> {
    const image = await prisma.image.findUnique({
      where: { id },
    });

    const updatedImage = await prisma.image.update({
      where: { id },
      data: {
        productId: data.productId || image?.productId,
        link: data.link || image?.link,
      },
    });

    return updatedImage;
  }

  async delete(id: string): Promise<void> {
    const image = await prisma.image.delete({
      where: { id },
    });
  }
}
