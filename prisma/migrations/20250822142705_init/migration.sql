/*
  Warnings:

  - The values [PENDING_CART] on the enum `orderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "orderStatus_new" AS ENUM ('PENDING', 'WAITING_PAYMENT', 'CANCELLED', 'READY_TO_SEND', 'IN_TRANSPORT', 'CONCLUDED');
ALTER TABLE "Order" ALTER COLUMN "orderStatus" TYPE "orderStatus_new" USING ("orderStatus"::text::"orderStatus_new");
ALTER TABLE "CustomOrder" ALTER COLUMN "orderStatus" TYPE "orderStatus_new" USING ("orderStatus"::text::"orderStatus_new");
ALTER TYPE "orderStatus" RENAME TO "orderStatus_old";
ALTER TYPE "orderStatus_new" RENAME TO "orderStatus";
DROP TYPE "orderStatus_old";
COMMIT;
