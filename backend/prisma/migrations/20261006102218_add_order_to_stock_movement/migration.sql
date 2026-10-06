-- CreateEnum
CREATE TYPE "StockMovementReason" AS ENUM ('PURCHASE', 'SALE', 'ADJUSTMENT', 'RETURN', 'LOSS');

-- AlterTable
ALTER TABLE "StockMovement" ADD COLUMN     "orderId" INTEGER,
ADD COLUMN     "reason" "StockMovementReason";

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
