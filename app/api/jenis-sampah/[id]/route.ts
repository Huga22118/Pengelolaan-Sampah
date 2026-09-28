import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // <-- Ubah tipe params menjadi Promise
) {
  try {
    // Next.js 15: params harus di-await terlebih dahulu
    const { id } = await context.params;

    await prisma.jenisSampah.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Data berhasil dihapus' });
  } catch (error: any) {
    // Tangani error Restrict (P2003: Foreign key constraint failed)
    // Ini terjadi jika jenis sampah masih dipakai di tabel LaporanSampah
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Tidak bisa dihapus karena jenis sampah ini masih digunakan dalam laporan.' },
        { status: 400 }
      );
    }
    
    // Tangani error jika data tidak ditemukan (P2025)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}