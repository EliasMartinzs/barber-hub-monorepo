/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenantId,phone]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerId]` on the table `tenant` will be added. If there are existing duplicate values, this will fail.
  - Made the column `phone` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ownerId` to the `tenant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_barberId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "PortfolioPost" DROP CONSTRAINT "PortfolioPost_barberId_fkey";

-- DropIndex
DROP INDEX "Customer_userId_idx";

-- DropIndex
DROP INDEX "Membership_userId_idx";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "barberId" TEXT,
ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "Membership" ALTER COLUMN "role" DROP DEFAULT;

-- AlterTable
ALTER TABLE "tenant" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Appointment";

-- DropEnum
DROP TYPE "AppointmentStatus";

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_key" ON "Customer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_tenantId_phone_key" ON "Customer"("tenantId", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_ownerId_key" ON "tenant"("ownerId");

-- AddForeignKey
ALTER TABLE "tenant" ADD CONSTRAINT "tenant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
