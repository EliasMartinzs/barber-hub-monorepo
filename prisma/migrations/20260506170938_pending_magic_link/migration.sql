/*
  Warnings:

  - You are about to drop the column `token` on the `PendingMagicLink` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PendingMagicLink_token_key";

-- AlterTable
ALTER TABLE "PendingMagicLink" DROP COLUMN "token";
