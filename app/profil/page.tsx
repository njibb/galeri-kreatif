/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    store_name: '',
    gender: '',
    birth_date: '',
    profile_picture: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  // Ambil data profil dari Back-End saat halaman dibuka
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Harap login terlebih dahulu!');
        window.location.href = '/';
        return;
      }

      try {
        const response = await fetch('https://backend-galeri-api.vercel.app/api/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        
        if (result.success) {
          // Format tanggal dari MySQL (YYYY-MM-DD) biar pas di input type="date"
          const formattedDate = result.data.birth_date ? result.data.birth_date.split('T')[0] : '';
          
          setFormData({
            name: result.data.name || '',
            email: result.data.email || '',
            phone: result.data.phone || '',
            store_name: result.data.store_name || '',
            gender: result.data.gender || '',
            birth_date: formattedDate,
            profile_picture: result.data.profile_picture || ''
          });
        }
      } catch (error) {
        console.error("Gagal mengambil profil:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle perubahan input teks
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle upload foto (Ubah ke Base64 agar mudah disimpan ke database)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("Ukuran gambar maksimal 1 MB abangku!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profile_picture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  
  // Simpan data ke Back-End
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://backend-galeri-api.vercel.app/api/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
        
        // 1. Update data user di LocalStorage dengan foto baru
        const updatedUser = {
          name: formData.name,
          email: formData.email,
          profile_picture: formData.profile_picture
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // 2. Teriak ke Navbar kalau profil udah di-update! 📢
        window.dispatchEvent(new Event('profileUpdated'));
      } else {
        alert(result.message);
      }
      
    } catch (error) {
      alert('Gagal menyimpan profil.');
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Memuat profil...</div>;

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-5xl mx-auto flex gap-6 px-4">
        
        {/* Sidebar Kiri (Opsional, ala Shopee) */}
        <div className="w-64 hidden md:block">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden relative">
              {formData.profile_picture ? (
                <Image src={formData.profile_picture} alt="Avatar" fill style={{ objectFit: 'cover' }} />
              ) : (
                <div className="w-full h-full bg-[#B07D60] flex items-center justify-center text-white font-bold text-xl">{formData.name.charAt(0)}</div>
              )}
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm truncate">{formData.name}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1"><svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg> Ubah Profil</p>
            </div>
          </div>
          <div className="space-y-4">
            <Link href="/profil" className="text-[#B07D60] font-bold text-sm block">Akun Saya</Link>
            <Link href="/pesanan" className="text-gray-600 hover:text-[#B07D60] text-sm block transition-colors">Pesanan Saya</Link>
          </div>
        </div>

        {/* Konten Utama Kanan */}
        <div className="flex-1 bg-white rounded-sm shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <h1 className="text-lg font-medium text-gray-800">Profil Saya</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun</p>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-10">
            {/* Form Kiri */}
            <div className="flex-1 space-y-6">
              
              <div className="flex items-center">
                <label className="w-32 text-right text-sm text-gray-500 mr-5">Email</label>
                <div className="text-sm text-gray-800 font-medium">{formData.email} <span className="text-[#B07D60] ml-2 text-xs cursor-pointer hover:underline">Ubah</span></div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-right text-sm text-gray-500 mr-5">Nama</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="flex-1 max-w-sm border border-gray-300 rounded-sm px-3 py-2 text-sm focus:border-[#B07D60] focus:outline-none" />
              </div>

              <div className="flex items-center">
                <label className="w-32 text-right text-sm text-gray-500 mr-5">Nomor Telepon</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="08xxxxxxxx" className="flex-1 max-w-sm border border-gray-300 rounded-sm px-3 py-2 text-sm focus:border-[#B07D60] focus:outline-none" />
              </div>

              <div className="flex items-center">
                <label className="w-32 text-right text-sm text-gray-500 mr-5">Nama Toko</label>
                <input type="text" name="store_name" value={formData.store_name} onChange={handleChange} placeholder="Toko Kreatifku" className="flex-1 max-w-sm border border-gray-300 rounded-sm px-3 py-2 text-sm focus:border-[#B07D60] focus:outline-none" />
              </div>

              <div className="flex items-center">
                <label className="w-32 text-right text-sm text-gray-500 mr-5">Jenis Kelamin</label>
                <div className="flex gap-4 text-sm text-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" value="Laki-laki" checked={formData.gender === 'Laki-laki'} onChange={handleChange} className="accent-[#B07D60]" /> Laki-laki</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" value="Perempuan" checked={formData.gender === 'Perempuan'} onChange={handleChange} className="accent-[#B07D60]" /> Perempuan</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" value="Lainnya" checked={formData.gender === 'Lainnya'} onChange={handleChange} className="accent-[#B07D60]" /> Lainnya</label>
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-right text-sm text-gray-500 mr-5">Tanggal Lahir</label>
                <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} className="border border-gray-300 rounded-sm px-3 py-2 text-sm focus:border-[#B07D60] focus:outline-none text-gray-700" />
              </div>

              <div className="flex items-center pt-2">
                <div className="w-32 mr-5"></div>
                <button onClick={handleSave} className="bg-[#B07D60] text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-[#8D6E63] transition-colors">Simpan</button>
              </div>

            </div>

            {/* Upload Foto Kanan */}
            <div className="md:w-64 md:border-l border-gray-100 flex flex-col items-center justify-center p-6">
              <div className="w-24 h-24 rounded-full bg-gray-100 mb-5 relative overflow-hidden border border-gray-200">
                {formData.profile_picture ? (
                  <Image src={formData.profile_picture} alt="Profil" fill style={{ objectFit: 'cover' }} />
                ) : (
                  <svg className="w-full h-full text-gray-300 p-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                )}
              </div>
              <label className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-sm text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors">
                Pilih Gambar
                <input type="file" accept="image/jpeg, image/png" className="hidden" onChange={handleImageUpload} />
              </label>
              <div className="text-xs text-gray-400 mt-4 text-center leading-relaxed">
                <p>Ukuran gambar: maks. 1 MB</p>
                <p>Format gambar: .JPEG, .PNG</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}