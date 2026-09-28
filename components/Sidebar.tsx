import Link from 'next/link';
import { cookies } from 'next/headers';
import UserMenu, { GuestMenu } from './UserMenu';

export default async function Sidebar() {
  // Read httpOnly cookie on the server so client JS doesn't need access
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  let user = null;

  if (sessionCookie) {
    try {
      const sessionData = JSON.parse(
        Buffer.from(sessionCookie.value, 'base64').toString()
      );

      if (sessionData.exp && sessionData.exp > Date.now()) {
        user = { nama: sessionData.nama || 'Pengguna', role: sessionData.role };
      }
    } catch (error) {
      // ignore invalid cookie
    }
  }

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold">🗑️ Pengelolaan Sampah</h1>
      </div>

      <nav className="space-y-2 flex-1">
        <Link href="/" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
          🏠 Beranda
        </Link>

        {user?.role === 'ADMIN' && (
          <div className="pt-4">
            <p className="px-4 text-xs text-yellow-400 uppercase mb-2 font-semibold">Admin Area</p>
            <Link href="/jenis-sampah" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
              📦 Jenis Sampah
            </Link>
            <Link href="/wilayah" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
              📍 Wilayah
            </Link>
            <Link href="/user" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
              👤 Kelola User
            </Link>
          </div>
        )}

        <div className="pt-4">
          <p className="px-4 text-xs text-gray-400 uppercase mb-2">Laporan</p>
          <Link href="/laporan" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
            📋 Daftar Laporan
          </Link>
          <Link href="/laporan/baru" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
            ➕ Buat Laporan
          </Link>
        </div>
      </nav>

      {/* Render UserMenu (client) or GuestMenu (client) based on server-side cookie */}
      {user ? (
        <UserMenu nama={user.nama} role={user.role} />
      ) : (
        <GuestMenu />
      )}
    </aside>
  );
}