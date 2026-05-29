'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function JualPage() {
  // --- STATE UNTUK MENAMPUNG DATA FORM ---
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Gerabah & Kriya');
  const [origin, setOrigin] = useState('Karya Mahasiswa');
  const [description, setDescription] = useState('');
  
  // --- STATE UNTUK PREVIEW FOTO ---
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fungsi untuk menangani saat user memilih foto
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Membuat URL sementara agar foto bisa langsung dilihat (preview)
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Fungsi saat tombol "Unggah Karya" ditekan
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Membungkus semua data menjadi format JSON siap kirim ke API Back-end
    const payload = {
      title,
      price: Number(price),
      category,
      origin,
      description,
      // Di dunia nyata, file foto akan dikirim via FormData, bukan JSON langsung
      imageFileName: imageFile?.name || 'Tidak ada foto' 
    };

    console.log("Data siap dikirim ke Back-end:", payload);
    alert(`Mantap! Data JSON berhasil dibuat.\nCek Console (F12) untuk melihat data yang siap dikirim ke API!`);
    
    // (Opsional) Reset form setelah submit berhasil
    // setTitle(''); setPrice(''); setDescription(''); setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-12 px-6 md:px-20 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-[#B07D60] mb-4 inline-block transition-colors">
            &larr; Kembali ke Beranda
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-2">Mulai Berjualan</h1>
          <p className="text-gray-600 mt-2">Pamerkan karyamu ke seluruh nusantara. Isi detail produk di bawah ini.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* KOLOM KIRI: Upload Foto */}
          <div className="md:w-2/5 bg-gray-50 p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center justify-center">
            
            <div className="w-full relative aspect-[4/5] bg-white border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center overflow-hidden hover:border-[#B07D60] transition-colors group cursor-pointer">
              
              {/* Jika foto sudah dipilih, tampilkan preview */}
              {imagePreview ? (
                <>
                  <Image src={imagePreview} alt="Preview" fill style={{ objectFit: 'cover' }} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium text-sm">Ubah Foto</span>
                  </div>
                </>
              ) : (
                // Jika belum ada foto, tampilkan ikon upload
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-[#F5F2ED] text-[#B07D60] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  </div>
                  <p className="text-sm font-bold text-gray-700">Unggah Foto Produk</p>
                  <p className="text-xs text-gray-500 mt-2">Format JPG, PNG (Maks. 2MB)</p>
                </div>
              )}
              
              {/* Input File Tersembunyi (ditimpa ke seluruh area kotak) */}
              <input 
                type="file" 
                accept="image/*" 
                required 
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            
          </div>

          {/* KOLOM KANAN: Detail Informasi */}
          <div className="md:w-3/5 p-8 md:p-12 space-y-6">
            
            {/* Input Nama Produk */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nama Produk</label>
              <input 
                type="text" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B07D60] focus:ring-1 focus:ring-[#B07D60] transition-all" 
                placeholder="Cth: Tas Tenun Premium" 
              />
            </div>

            {/* Input Harga */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Harga (Rupiah)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">Rp</span>
                <input 
                  type="number" 
                  required 
                  min="1000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#B07D60] focus:ring-1 focus:ring-[#B07D60] transition-all" 
                  placeholder="0" 
                />
              </div>
            </div>

            {/* Grid 2 Kolom untuk Kategori & Asal Kreator */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kategori</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B07D60] focus:ring-1 focus:ring-[#B07D60] bg-white transition-all cursor-pointer"
                >
                  <option>Gerabah & Kriya</option>
                  <option>Tenun & Batik</option>
                  <option>Tas Artisan</option>
                  <option>Inovasi Teknologi</option>
                  <option>Dekorasi Rumah</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Asal Kreator</label>
                <select 
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B07D60] focus:ring-1 focus:ring-[#B07D60] bg-white transition-all cursor-pointer"
                >
                  <option>Karya Mahasiswa</option>
                  <option>Kerajinan Desa Wisata</option>
                </select>
              </div>
            </div>

            {/* Input Deskripsi */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Deskripsi Produk</label>
              <textarea 
                rows={4} 
                required 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B07D60] focus:ring-1 focus:ring-[#B07D60] transition-all" 
                placeholder="Ceritakan detail, bahan, dan makna dari karyamu di sini..."
              ></textarea>
            </div>

            <div className="h-px bg-gray-100 w-full my-6"></div>

            {/* Tombol Submit */}
            <div className="flex items-center gap-4">
              <button 
                type="submit" 
                className="flex-1 bg-[#1B2422] text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-md flex justify-center items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                Unggah Karya
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
}