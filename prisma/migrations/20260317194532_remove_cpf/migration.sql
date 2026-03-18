/*
  Warnings:

  - You are about to drop the column `cpf` on the `Seller` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Seller_cpf_key";

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "cpf";
