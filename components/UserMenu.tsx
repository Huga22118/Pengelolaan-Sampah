'use client';

import { useRouter } from 'next/navigation';

export default function UserMenu({ nama, role }: { nama: string; role: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    // Hapus cookie di browser agar UI langsung update
    document.cookie = 'session=; Max-Age=0; path=/;';
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="pt-4 border-t border-gray-700 mt-4">
      <p className="px-4 text-sm text-gray-300 mb-1">
        Halo, <span className="font-semibold text-white">{nama}</span>
      </p>
      <p className="px-4 text-xs text-yellow-400 mb-3 uppercase">{role}</p>
      <button 
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition text-sm"
      >
        🚪 Logout
      </button>
    </div>
  );
}

export function GuestMenu() {
  return (
    <div className="pt-4 border-t border-gray-700 mt-4 space-y-2">
      <a href="/login" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition text-sm">
        Login
      </a>
      <a href="/register" className="block w-full text-center bg-gray-700 hover:bg-gray-600 text-white py-2 rounded transition text-sm">
        Daftar
      </a>
    </div>
  );
}