import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'User berhasil dihapus' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Gagal menghapus user' }, { status: 500 });
  }
}