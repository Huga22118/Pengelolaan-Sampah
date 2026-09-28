'use client';

import { useState } from 'react';

export default function TestUploadPage() {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('foto', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        setImageUrl(data.imageUrl);
        alert('Upload berhasil!');
      } else {
        alert('Upload gagal: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Upload Foto</h1>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
        className="mb-4"
      />

      {loading && <p>Uploading...</p>}

      {imageUrl && (
        <div className="mt-4">
          <p className="mb-2">Preview:</p>
          <img 
            src={imageUrl} 
            alt="Uploaded" 
            className="max-w-md border rounded"
          />
          <p className="mt-2 text-sm text-gray-600">
            URL: {imageUrl}
          </p>
        </div>
      )}
    </div>
  );
}