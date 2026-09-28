-- CreateTable
CREATE TABLE "LaporanSampah" (
    "id" TEXT NOT NULL,
    "berat" DOUBLE PRECISION NOT NULL,
    "tanggalLapor" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "jenisSampahId" TEXT NOT NULL,
    "wilayahId" TEXT NOT NULL,

    CONSTRAINT "LaporanSampah_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LaporanSampah" ADD CONSTRAINT "LaporanSampah_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanSampah" ADD CONSTRAINT "LaporanSampah_jenisSampahId_fkey" FOREIGN KEY ("jenisSampahId") REFERENCES "JenisSampah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanSampah" ADD CONSTRAINT "LaporanSampah_wilayahId_fkey" FOREIGN KEY ("wilayahId") REFERENCES "Wilayah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
