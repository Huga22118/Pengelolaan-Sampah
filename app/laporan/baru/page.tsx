'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface JenisSampah {
  id: string;
  namaJenis: string;
}

interface Wilayah {
  id: string;
  namaWilayah: string;
}

export default function LaporanBaruPage() {
  const router = useRouter();
  const [jenisSampahList, setJenisSampahList] = useState<JenisSampah[]>([]);
  const [wilayahList, setWilayahList] = useState<Wilayah[]>([]);
  
  const [formData, setFormData] = useState({
    berat: '',
    jenisSampahId: '',
    wilayahId: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch data master untuk dropdown
  useEffect(() => {
    fetch('/api/master')
      .then((res) => res.json())
      .then((data) => {
        setJenisSampahList(data.jenisSampah);
        setWilayahList(data.wilayah);
      })
      .catch((err) => console.error('Gagal fetch data master', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Buat preview gambar
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validasi client-side
    if (!file) {
      setError('Foto bukti wajib diupload');
      return;
    }

    if (parseFloat(formData.berat) <= 0) {
      setError('Berat sampah harus lebih dari 0 kg');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload foto terlebih dahulu
      setUploading(true);
      const uploadFormData = new FormData();
      uploadFormData.append('foto', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        throw new Error(uploadData.error || 'Gagal upload foto');
      }

      setUploading(false);

      // Step 2: Submit laporan dengan URL foto
      const laporanResponse = await fetch('/api/laporan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          berat: formData.berat,
          jenisSampahId: formData.jenisSampahId,
          wilayahId: formData.wilayahId,
          imageUrl: uploadData.imageUrl,
        }),
      });

      const laporanData = await laporanResponse.json();

      if (laporanResponse.ok) {
        setSuccess('Laporan berhasil dibuat!');
        // Reset form
        setFormData({ berat: '', jenisSampahId: '', wilayahId: '' });
        setFile(null);
        setPreview('');
        
        // Redirect ke halaman daftar laporan setelah 2 detik
        setTimeout(() => {
          router.push('/laporan');
        }, 2000);
      } else {
        setError(laporanData.error || 'Gagal membuat laporan');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan pada server');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Buat Laporan Sampah Baru</h1>

      <div className="bg-white p-8 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Foto */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Foto Bukti <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-md border rounded-lg shadow"
                />
              </div>
            )}
          </div>

          {/* Berat Sampah */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Berat Sampah (kg) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="berat"
              value={formData.berat}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              required
              placeholder="Contoh: 2.5"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Jenis Sampah */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Jenis Sampah <span className="text-red-500">*</span>
            </label>
            <select
              name="jenisSampahId"
              value={formData.jenisSampahId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Pilih Jenis Sampah --</option>
              {jenisSampahList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.namaJenis}
                </option>
              ))}
            </select>
            {jenisSampahList.length === 0 && (
              <p className="text-sm text-yellow-600 mt-1">
                ⚠️ Belum ada data jenis sampah. Silakan minta admin untuk menambahkannya.
              </p>
            )}
          </div>

          {/* Wilayah */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Wilayah <span className="text-red-500">*</span>
            </label>
            <select
              name="wilayahId"
              value={formData.wilayahId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Pilih Wilayah --</option>
              {wilayahList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.namaWilayah}
                </option>
              ))}
            </select>
            {wilayahList.length === 0 && (
              <p className="text-sm text-yellow-600 mt-1">
                ⚠️ Belum ada data wilayah. Silakan minta admin untuk menambahkannya.
              </p>
            )}
          </div>

          {/* Error & Success Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 font-semibold"
          >
            {uploading ? 'Mengupload foto...' : loading ? 'Mengirim laporan...' : 'Kirim Laporan'}
          </button>
        </form>
      </div>
    </div>
  );
}