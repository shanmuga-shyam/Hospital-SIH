/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `OTPVerification` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "OTPVerification" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "OTPVerification_email_key" ON "OTPVerification"("email");
