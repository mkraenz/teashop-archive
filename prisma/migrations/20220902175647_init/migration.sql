-- CreateTable
CREATE TABLE "Tea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "bestAtTemperature" INTEGER NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tea_pkey" PRIMARY KEY ("id")
);
