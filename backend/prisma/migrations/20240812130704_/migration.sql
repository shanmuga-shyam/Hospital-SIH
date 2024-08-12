/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Hospitals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hospitals_email_key" ON "Hospitals"("email");
