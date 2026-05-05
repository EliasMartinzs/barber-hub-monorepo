-- CreateTable
CREATE TABLE "PendingMagicLink" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PendingMagicLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PendingMagicLink_email_idx" ON "PendingMagicLink"("email");
