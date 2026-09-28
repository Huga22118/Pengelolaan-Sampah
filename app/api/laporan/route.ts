import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// GET: Ambil semua laporan (dengan relasi user, jenis sampah, wilayah, dan foto)
export async function GET() {
  try {
    const laporan = await prisma.laporanSampah.findMany({
      include: {
        user: {
          select: {
            id: true,
            nama: true,
            email: true,
          },
        },
        jenisSampah: true,
        wilayah: true,
        foto: true,
      },
      orderBy: { tanggalLapor: 'desc' },
    });

    return NextResponse.json(laporan);
  } catch (error) {
    console.error('Error fetch laporan:', error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// POST: Buat laporan baru
export async function POST(request: NextRequest) {
  try {
    // Cek session user
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Anda harus login terlebih dahulu' }, { status: 401 });
    }

    const sessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString()
    );

    if (sessionData.exp < Date.now()) {
      return NextResponse.json({ error: 'Session expired, silakan login ulang' }, { status: 401 });
    }

    const body = await request.json();
    const { berat, jenisSampahId, wilayahId, imageUrl } = body;

    // Validasi input
    if (!berat || !jenisSampahId || !wilayahId || !imageUrl) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    // Validasi berat > 0
    if (berat <= 0) {
      return NextResponse.json(
        { error: 'Berat sampah harus lebih dari 0 kg' },
        { status: 400 }
      );
    }

    // Buat laporan dan foto dalam satu transaksi
    const newLaporan = await prisma.laporanSampah.create({
      data: {
        berat: parseFloat(berat),
        userId: sessionData.userId,
        jenisSampahId,
        wilayahId,
        foto: {
          create: {
            imageUrl,
          },
        },
      },
      include: {
        user: {
          select: { nama: true, email: true },
        },
        jenisSampah: true,
        wilayah: true,
        foto: true,
      },
    });

    return NextResponse.json(newLaporan, { status: 201 });
  } catch (error: any) {
    console.error('Error create laporan:', error);

    // Tangani error composite unique (P2002)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Anda sudah membuat laporan dengan jenis sampah yang sama di wilayah yang sama pada tanggal ini.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Gagal membuat laporan' }, { status: 500 });
  }
}