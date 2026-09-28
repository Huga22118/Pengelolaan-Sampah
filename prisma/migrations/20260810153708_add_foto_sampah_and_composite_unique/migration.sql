/*
  Warnings:

  - A unique constraint covering the columns `[userId,jenisSampahId,tanggalLapor,wilayahId]` on the table `LaporanSampah` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "FotoSampah" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "laporanId" TEXT NOT NULL,

    CONSTRAINT "FotoSampah_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FotoSampah_laporanId_key" ON "FotoSampah"("laporanId");

-- CreateIndex
CREATE UNIQUE INDEX "LaporanSampah_userId_jenisSampahId_tanggalLapor_wilayahId_key" ON "LaporanSampah"("userId", "jenisSampahId", "tanggalLapor", "wilayahId");

-- AddForeignKey
ALTER TABLE "FotoSampah" ADD CONSTRAINT "FotoSampah_laporanId_fkey" FOREIGN KEY ("laporanId") REFERENCES "LaporanSampah"("id") ON DELETE CASCADE ON UPDATE CASCADE;
