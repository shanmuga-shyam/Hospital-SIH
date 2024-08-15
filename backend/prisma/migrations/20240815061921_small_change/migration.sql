/*
  Warnings:

  - You are about to drop the column `avaliableSlots` on the `Doctors` table. All the data in the column will be lost.
  - Added the required column `active` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctors" DROP COLUMN "avaliableSlots",
ADD COLUMN     "active" BOOLEAN NOT NULL;
