-- CreateTable
CREATE TABLE "ReservationUpdate" (
    "id" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "checkOutDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listingId" TEXT NOT NULL,

    CONSTRAINT "ReservationUpdate_pkey" PRIMARY KEY ("id")
);
