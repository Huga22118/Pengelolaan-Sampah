'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  nama: string;
  nik: string;
  email: string;
  noHp: string;
  role: 'ADMIN' | 'USER';
}

export default function UserPage() {
  const [data, setData] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    email: '',
    noHp: '',
    password: '',
    role: 'USER',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchData = async () => {
    try {
      const res = await fetch('/api/user');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Gagal fetch data', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok) {
        setSuccess('User berhasil ditambahkan!');
        setFormData({
          nama: '',
          nik: '',
          email: '',
          noHp: '',
          password: '',
          role: 'USER',
        });
        fetchData();
      } else {
        setError(json.error || 'Gagal menambah data');
      }
    } catch (err) {
      setError('Terjadi kesalahan pada server');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus user ini? Semua laporan milik user ini juga akan dihapus.')) return;

    try {
      const res = await fetch(`/api/user/${id}`, {
        method: 'DELETE',
      });

      const json = await res.json();

      if (res.ok) {
        setSuccess('User berhasil dihapus!');
        fetchData();
      } else {
        setError(json.error || 'Gagal menghapus user');
      }
    } catch (err) {
      setError('Terjadi kesalahan pada server');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Kelola User</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Tambah User Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">NIK</label>
              <input
                type="text"
                name="nik"
                value={formData.nik}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">No. HP</label>
              <input
                type="tel"
                name="noHp"
                value={formData.noHp}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </form>

        {error && <p className="text-red-600 mt-3 text-sm">⚠️ {error}</p>}
        {success && <p className="text-green-600 mt-3 text-sm">✅ {success}</p>}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">No</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Nama</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 font-semibold text-gray-700">NIK</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Role</th>
              <th className="px-6 py-3 font-semibold text-gray-700 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Belum ada data user.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">{item.nama}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.nik}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.role === 'ADMIN' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}