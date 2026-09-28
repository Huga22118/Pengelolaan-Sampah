'use client';

import { useState, useEffect } from 'react';

interface Wilayah {
  id: string;
  namaWilayah: string;
}

export default function WilayahPage() {
  const [data, setData] = useState<Wilayah[]>([]);
  const [namaBaru, setNamaBaru] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchData = async () => {
    try {
      const res = await fetch('/api/wilayah');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Gagal fetch data', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/wilayah', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ namaWilayah: namaBaru }),
      });

      const json = await res.json();

      if (res.ok) {
        setSuccess('Wilayah berhasil ditambahkan!');
        setNamaBaru('');
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
    if (!confirm('Yakin ingin menghapus wilayah ini?')) return;

    try {
      const res = await fetch(`/api/wilayah/${id}`, {
        method: 'DELETE',
      });

      const json = await res.json();

      if (res.ok) {
        setSuccess('Data berhasil dihapus!');
        fetchData();
      } else {
        setError(json.error || 'Gagal menghapus data');
      }
    } catch (err) {
      setError('Terjadi kesalahan pada server');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Kelola Wilayah</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Tambah Wilayah Baru</h2>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Nama Wilayah</label>
            <input
              type="text"
              value={namaBaru}
              onChange={(e) => setNamaBaru(e.target.value)}
              placeholder="Contoh: Jakarta Selatan, Bandung, Surabaya"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              <th className="px-6 py-3 font-semibold text-gray-700">Nama Wilayah</th>
              <th className="px-6 py-3 font-semibold text-gray-700 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  Belum ada data wilayah.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">{item.namaWilayah}</td>
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