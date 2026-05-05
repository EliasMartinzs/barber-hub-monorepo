/*
  Warnings:

  - A unique constraint covering the columns `[userId,tenantId]` on the table `Membership` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "MembershipRole" ADD VALUE 'CLIENT';

-- DropIndex
DROP INDEX "Membership_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_tenantId_key" ON "Membership"("userId", "tenantId");
