/*
  Warnings:

  - You are about to drop the `Hospital` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "HospitalType" AS ENUM ('General', 'Specialized');

-- CreateEnum
CREATE TYPE "QueueStatus" AS ENUM ('Pending', 'Inprogress', 'Completed');

-- CreateEnum
CREATE TYPE "BedStatus" AS ENUM ('Available', 'Occupied', 'Under_Maintainence');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Others');

-- CreateEnum
CREATE TYPE "InventoryCategory" AS ENUM ('Medicine', 'Surgical_Tools', 'Others');

-- DropTable
DROP TABLE "Hospital";

-- CreateTable
CREATE TABLE "Hospitals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "HospitalType" NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Hospitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avaliableSlots" JSONB NOT NULL,
    "departmentId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "Doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "headOfDepartmentId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OPDQueue" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "status" "QueueStatus" NOT NULL,
    "queueNumber" INTEGER NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "OPDQueue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bed" (
    "id" TEXT NOT NULL,
    "bedNumber" TEXT NOT NULL,
    "wardId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "status" "BedStatus" NOT NULL,
    "admissionDate" TIMESTAMP(3) NOT NULL,
    "dischargeDate" TIMESTAMP(3) NOT NULL,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "Bed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ward" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "totalBeds" INTEGER NOT NULL,
    "availableBeds" INTEGER NOT NULL,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "Ward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "medicalHistory" TEXT NOT NULL,
    "queueNumber" INTEGER NOT NULL,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "Patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admission" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "wardId" TEXT NOT NULL,
    "bedId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "Admission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "category" "InventoryCategory" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reorderLevel" INTEGER NOT NULL,
    "lastOrderDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Doctors" ADD CONSTRAINT "Doctors_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctors" ADD CONSTRAINT "Doctors_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OPDQueue" ADD CONSTRAINT "OPDQueue_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OPDQueue" ADD CONSTRAINT "OPDQueue_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OPDQueue" ADD CONSTRAINT "OPDQueue_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ward" ADD CONSTRAINT "Ward_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ward" ADD CONSTRAINT "Ward_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patients" ADD CONSTRAINT "Patients_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_bedId_fkey" FOREIGN KEY ("bedId") REFERENCES "Bed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
