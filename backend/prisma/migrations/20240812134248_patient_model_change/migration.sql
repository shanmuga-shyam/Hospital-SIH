/*
  Warnings:

  - You are about to drop the column `patientId` on the `Admission` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Bed` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `OPDQueue` table. All the data in the column will be lost.
  - You are about to drop the `Patients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `patientInstanceId` to the `Admission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientInstanceId` to the `OPDQueue` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VisitType" AS ENUM ('FreshVisit', 'Revisit');

-- DropForeignKey
ALTER TABLE "Admission" DROP CONSTRAINT "Admission_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_patientId_fkey";

-- DropForeignKey
ALTER TABLE "OPDQueue" DROP CONSTRAINT "OPDQueue_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Patients" DROP CONSTRAINT "Patients_hospitalId_fkey";

-- AlterTable
ALTER TABLE "Admission" DROP COLUMN "patientId",
ADD COLUMN     "patientInstanceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Bed" DROP COLUMN "patientId";

-- AlterTable
ALTER TABLE "OPDQueue" DROP COLUMN "patientId",
ADD COLUMN     "patientInstanceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Patients";

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "PermanentRecord" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "aadhaarNumber" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "PermanentRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalRecord" (
    "id" TEXT NOT NULL,
    "permanentRecordId" TEXT NOT NULL,
    "lastHospitalVisit" TEXT NOT NULL,
    "visitReason" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "importantConditions" TEXT NOT NULL,

    CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientInstance" (
    "id" TEXT NOT NULL,
    "permanentRecordId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "wardId" TEXT,
    "bedId" TEXT,
    "queueNumber" INTEGER NOT NULL,
    "emergencyStatus" BOOLEAN NOT NULL,
    "medications" JSONB NOT NULL,
    "feedback" TEXT NOT NULL,
    "visitType" "VisitType" NOT NULL,

    CONSTRAINT "PatientInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PermanentRecord_aadhaarNumber_key" ON "PermanentRecord"("aadhaarNumber");

-- AddForeignKey
ALTER TABLE "OPDQueue" ADD CONSTRAINT "OPDQueue_patientInstanceId_fkey" FOREIGN KEY ("patientInstanceId") REFERENCES "PatientInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_permanentRecordId_fkey" FOREIGN KEY ("permanentRecordId") REFERENCES "PermanentRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientInstance" ADD CONSTRAINT "PatientInstance_permanentRecordId_fkey" FOREIGN KEY ("permanentRecordId") REFERENCES "PermanentRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientInstance" ADD CONSTRAINT "PatientInstance_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientInstance" ADD CONSTRAINT "PatientInstance_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientInstance" ADD CONSTRAINT "PatientInstance_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientInstance" ADD CONSTRAINT "PatientInstance_bedId_fkey" FOREIGN KEY ("bedId") REFERENCES "Bed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_patientInstanceId_fkey" FOREIGN KEY ("patientInstanceId") REFERENCES "PatientInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
