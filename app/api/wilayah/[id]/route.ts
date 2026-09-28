import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.wilayah.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Data berhasil dihapus' });
  } catch (error: any) {
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Tidak bisa dihapus karena wilayah ini masih digunakan dalam laporan.' },
        { status: 400 }
      );
    }
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}