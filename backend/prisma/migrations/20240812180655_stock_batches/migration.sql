/*
  Warnings:

  - You are about to drop the column `expiryDate` on the `Inventory` table. All the data in the column will be lost.
  - Added the required column `stockBatches` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "expiryDate",
ADD COLUMN     "stockBatches" JSONB NOT NULL;
