import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Daftar rute yang memerlukan login
const protectedRoutes = ['/laporan', '/jenis-sampah', '/wilayah', '/user'];

// Daftar rute yang KHUSUS untuk Admin
const adminRoutes = ['/jenis-sampah', '/wilayah', '/user'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');

  // 1. Cek apakah user mencoba mengakses rute yang dilindungi
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Jika tidak ada cookie session, tendang ke halaman login
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Decode data session dari base64
      const sessionData = JSON.parse(
        Buffer.from(sessionCookie.value, 'base64').toString()
      );

      // Cek apakah session sudah kedaluwarsa (expired)
      if (sessionData.exp < Date.now()) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('session');
        return response;
      }

      // 2. Cek apakah user biasa mencoba mengakses halaman Admin
      const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
      if (isAdminRoute && sessionData.role !== 'ADMIN') {
        // Jika USER biasa maksa masuk, redirect ke halaman Laporan
        return NextResponse.redirect(new URL('/laporan', request.url));
      }

    } catch (error) {
      // Jika cookie rusak/tidak valid, hapus dan tendang ke login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('session');
      return response;
    }
  }

  // 3. Jika sudah login, tidak boleh akses halaman login/register lagi
  if ((pathname === '/login' || pathname === '/register') && sessionCookie) {
    try {
      const sessionData = JSON.parse(
        Buffer.from(sessionCookie.value, 'base64').toString()
      );

      // Jika session valid dan belum expired, redirect ke beranda
      if (sessionData && sessionData.exp >= Date.now()) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      // Jika expired atau tidak valid, hapus cookie dan izinkan akses ke halaman auth
      const response = NextResponse.next();
      response.cookies.delete('session');
      return response;
    } catch (e) {
      const response = NextResponse.next();
      response.cookies.delete('session');
      return response;
    }
  }

  // Jika semua aman, lanjutkan request
  return NextResponse.next();
}

// Konfigurasi matcher: Jalankan middleware untuk semua rute KECUALI:
// - api (API routes)
// - _next/static (file statis Next.js)
// - _next/image (optimasi gambar)
// - favicon.ico
// - uploads (folder gambar kita, agar gambar bisa diakses publik)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|uploads).*)',
  ],
};