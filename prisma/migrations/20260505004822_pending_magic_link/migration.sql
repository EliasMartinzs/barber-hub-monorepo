/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `PendingMagicLink` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `PendingMagicLink` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PendingMagicLink_email_idx";

-- AlterTable
ALTER TABLE "PendingMagicLink" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PendingMagicLink_token_key" ON "PendingMagicLink"("token");
