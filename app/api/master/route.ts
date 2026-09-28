import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil data jenis sampah dan wilayah untuk dropdown
export async function GET() {
  try {
    const [jenisSampah, wilayah] = await Promise.all([
      prisma.jenisSampah.findMany({
        orderBy: { namaJenis: 'asc' },
      }),
      prisma.wilayah.findMany({
        orderBy: { namaWilayah: 'asc' },
      }),
    ]);

    return NextResponse.json({ jenisSampah, wilayah });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}