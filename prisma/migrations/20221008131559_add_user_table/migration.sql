-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" JSONB NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
