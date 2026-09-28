import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// GET: Ambil semua user (tanpa password)
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        nama: true,
        nik: true,
        email: true,
        noHp: true,
        role: true,
      },
      orderBy: { nama: 'asc' },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// POST: Tambah user baru (oleh Admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, nik, email, noHp, password, role } = body;

    // Validasi input
    if (!nama || !nik || !email || !noHp || !password) {
      return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 });
    }

    // Cek email duplikat
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 400 });
    }

    // Cek NIK duplikat
    const existingNik = await prisma.user.findUnique({ where: { nik } });
    if (existingNik) {
      return NextResponse.json({ error: 'NIK sudah terdaftar' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        nama,
        nik,
        email,
        noHp,
        password: hashedPassword,
        role: role || 'USER',
      },
      select: {
        id: true,
        nama: true,
        nik: true,
        email: true,
        noHp: true,
        role: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email atau NIK sudah terdaftar' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Gagal menambah data' }, { status: 500 });
  }
}