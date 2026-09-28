'use client';

import { useState, useEffect } from 'react';

interface Laporan {
  id: string;
  berat: number;
  tanggalLapor: string;
  user: {
    nama: string;
    email: string;
  };
  jenisSampah: {
    namaJenis: string;
  };
  wilayah: {
    namaWilayah: string;
  };
  foto: {
    imageUrl: string;
  } | null;
}

export default function LaporanPage() {
  const [data, setData] = useState<Laporan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/laporan')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Gagal fetch data', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daftar Laporan Sampah</h1>
        <a
          href="/laporan/baru"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Buat Laporan Baru
        </a>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">No</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Foto</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Pelapor</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Jenis Sampah</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Wilayah</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Berat (kg)</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  Belum ada laporan sampah.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    {item.foto ? (
                      <img
                        src={item.foto.imageUrl}
                        alt="Foto laporan"
                        className="w-20 h-20 object-cover rounded border"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">Tidak ada foto</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{item.user.nama}</p>
                      <p className="text-sm text-gray-500">{item.user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{item.jenisSampah.namaJenis}</td>
                  <td className="px-6 py-4">{item.wilayah.namaWilayah}</td>
                  <td className="px-6 py-4">{item.berat.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(item.tanggalLapor).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
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