import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil semua jenis sampah
export async function GET() {
  try {
    const jenisSampah = await prisma.jenisSampah.findMany({
      orderBy: { namaJenis: 'asc' },
    });
    return NextResponse.json(jenisSampah);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// POST: Tambah jenis sampah baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { namaJenis } = body;

    if (!namaJenis || namaJenis.trim() === '') {
      return NextResponse.json({ error: 'Nama jenis sampah wajib diisi' }, { status: 400 });
    }

    const newData = await prisma.jenisSampah.create({
      data: { namaJenis: namaJenis.trim() },
    });

    return NextResponse.json(newData, { status: 201 });
  } catch (error: any) {
    // Tangani error unique constraint (P2002)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Nama jenis sampah sudah ada' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Gagal menambah data' }, { status: 500 });
  }
}