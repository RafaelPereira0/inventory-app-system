-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shippingCep" TEXT,
ADD COLUMN     "shippingCity" TEXT,
ADD COLUMN     "shippingComplement" TEXT,
ADD COLUMN     "shippingNeighborhood" TEXT,
ADD COLUMN     "shippingNumber" TEXT,
ADD COLUMN     "shippingRecipient" TEXT,
ADD COLUMN     "shippingState" TEXT,
ADD COLUMN     "shippingStreet" TEXT;

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "label" TEXT NOT NULL DEFAULT 'Casa',
    "recipient" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Address_userId_idx" ON "Address"("userId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
