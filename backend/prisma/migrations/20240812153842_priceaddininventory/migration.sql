/*
  Warnings:

  - You are about to drop the column `aadhaarNumber` on the `PermanentRecord` table. All the data in the column will be lost.
  - Added the required column `price` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PermanentRecord_aadhaarNumber_key";

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "lastOrderDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "PermanentRecord" DROP COLUMN "aadhaarNumber";
