/*
  Warnings:

  - You are about to drop the column `link` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Store` table. All the data in the column will be lost.
  - Added the required column `filename` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "link",
DROP COLUMN "productId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "ProductImage" (
    "productId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("productId","imageId")
);

-- CreateTable
CREATE TABLE "StoreImage" (
    "storeId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "StoreImage_pkey" PRIMARY KEY ("storeId","imageId")
);

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreImage" ADD CONSTRAINT "StoreImage_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreImage" ADD CONSTRAINT "StoreImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
