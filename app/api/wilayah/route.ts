import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil semua wilayah
export async function GET() {
  try {
    const wilayah = await prisma.wilayah.findMany({
      orderBy: { namaWilayah: 'asc' },
    });
    return NextResponse.json(wilayah);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// POST: Tambah wilayah baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { namaWilayah } = body;

    if (!namaWilayah || namaWilayah.trim() === '') {
      return NextResponse.json({ error: 'Nama wilayah wajib diisi' }, { status: 400 });
    }

    const newData = await prisma.wilayah.create({
      data: { namaWilayah: namaWilayah.trim() },
    });

    return NextResponse.json(newData, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Nama wilayah sudah ada' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Gagal menambah data' }, { status: 500 });
  }
}