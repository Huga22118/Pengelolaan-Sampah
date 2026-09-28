import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    // Decode session di server (aman)
    const sessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString()
    );

    return NextResponse.json({
      user: {
        nama: sessionData.nama || 'Pengguna',
        role: sessionData.role,
      }
    }, { status: 200 });
    
  } catch (error) {
    // Jika cookie rusak, kembalikan null
    return NextResponse.json({ user: null }, { status: 200 });
  }
}