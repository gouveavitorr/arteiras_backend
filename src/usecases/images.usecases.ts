import {
  Image,
  ImageCreate,
  ImageUpdate,
  ImageRepository,
} from "../interfaces/images.interfaces";

import { ImagesRepositoryPrisma } from "../repositories/images.repositories";

export class ImagesUseCases {
  private imageRepository: ImageRepository;
  constructor() {
    this.imageRepository = new ImagesRepositoryPrisma();
  }

  async findAll(): Promise<Image[]> {
    const images = await this.imageRepository.findAll();
    return images;
  }

  async findById(id: string): Promise<Image | null> {
    const image = await this.imageRepository.findById(id);
    if (!image) {
      throw new Error("Image not found.");
    }
    return image;
  }

  async create(data: ImageCreate): Promise<Image> {
    const { productId, link } = data;
    const image = await this.imageRepository.create({
      productId,
      link,
    });
    return image;
  }

  async update(id: string, data: ImageUpdate): Promise<Image | null> {
    const { productId, link } = data;

    const updatedImage = await this.imageRepository.update(id, {
      productId,
      link,
    });

    return updatedImage;
  }

  async delete(id: string): Promise<void> {
    const image = await this.imageRepository.findById(id);

    if (!image) {
      throw new Error("Image not found");
    }
    await this.imageRepository.delete(id);
  }
}
