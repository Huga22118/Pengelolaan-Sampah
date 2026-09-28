import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, nik, email, noHp, password } = body;

    // Validasi input
    if (!nama || !nik || !email || !noHp || !password) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    // Cek apakah NIK sudah terdaftar
    const existingNik = await prisma.user.findUnique({
      where: { nik },
    });

    if (existingNik) {
      return NextResponse.json(
        { error: 'NIK sudah terdaftar' },
        { status: 400 }
      );
    }

    // Nomor HP juga unik di database.
    const existingNoHp = await prisma.user.findUnique({
      where: { noHp },
    });

    if (existingNoHp) {
      return NextResponse.json(
        { error: 'Nomor HP sudah terdaftar' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const user = await prisma.user.create({
      data: {
        nama,
        nik,
        email,
        noHp,
        password: hashedPassword,
        role: 'USER', // Default role adalah USER
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Registrasi berhasil',
        user: {
          id: user.id,
          nama: user.nama,
          email: user.email,
          role: user.role,
        }
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error('Error register:', error);

    // Tetap beri pesan yang dapat ditindaklanjuti jika ada race condition
    // saat dua request mendaftarkan data unik yang sama.
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'Email, NIK, atau nomor HP sudah terdaftar' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Terjadi kesalahan saat registrasi' },
      { status: 500 }
    );
  }
}