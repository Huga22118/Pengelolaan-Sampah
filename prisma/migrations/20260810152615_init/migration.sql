-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "noHp" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JenisSampah" (
    "id" TEXT NOT NULL,
    "namaJenis" TEXT NOT NULL,

    CONSTRAINT "JenisSampah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wilayah" (
    "id" TEXT NOT NULL,
    "namaWilayah" TEXT NOT NULL,

    CONSTRAINT "Wilayah_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nik_key" ON "User"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_noHp_key" ON "User"("noHp");

-- CreateIndex
CREATE UNIQUE INDEX "JenisSampah_namaJenis_key" ON "JenisSampah"("namaJenis");

-- CreateIndex
CREATE UNIQUE INDEX "Wilayah_namaWilayah_key" ON "Wilayah"("namaWilayah");
