/*
  Warnings:

  - The values [General,Specialized] on the enum `HospitalType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `password` to the `Hospitals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HospitalType_new" AS ENUM ('Private', 'Government');
ALTER TABLE "Hospitals" ALTER COLUMN "type" TYPE "HospitalType_new" USING ("type"::text::"HospitalType_new");
ALTER TYPE "HospitalType" RENAME TO "HospitalType_old";
ALTER TYPE "HospitalType_new" RENAME TO "HospitalType";
DROP TYPE "HospitalType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Hospitals" ADD COLUMN     "password" TEXT NOT NULL;
