'use client';
import React, { useState } from 'react';

export default function LoginPage() {
  const [role, setRole] = useState('pembeli');

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        {/* Logo/Nama Platform */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-widest text-[#8D6E63] font-serif">GALERI KREATIF</h2>
          <p className="text-sm text-gray-500 mt-2">Selamat datang kembali, silakan masuk ke akun Anda</p>
        </div>

        {/* Tab Selector Role */}
        <div className="flex bg-[#EFEBE9] p-1 rounded-xl mb-6">
          <button 
            onClick={() => setRole('pembeli')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === 'pembeli' ? 'bg-[#8D6E63] text-white shadow' : 'text-[#6D4C41] hover:text-[#8D6E63]'}`}
          >
            Sebagai Pembeli
          </button>
          <button 
            onClick={() => setRole('kreator')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === 'kreator' ? 'bg-[#8D6E63] text-white shadow' : 'text-[#6D4C41] hover:text-[#8D6E63]'}`}
          >
            Sebagai Mitra Kreator
          </button>
        </div>

        {/* Form Login */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              placeholder="nama@email.com" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#8D6E63] transition-colors"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Kata Sandi</label>
              <a href="#" className="text-xs text-[#8D6E63] hover:underline">Lupa sandi?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#8D6E63] transition-colors"
            />
          </div>

          <button type="submit" className="w-full bg-[#8D6E63] text-white py-3 rounded-xl font-medium text-sm hover:bg-[#6D4C41] transition-colors mt-2 shadow-sm">
            Masuk {role === 'kreator' ? 'ke Dasbor' : ''}
          </button>
        </form>

        {/* Footer Form */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Belum punya akun?{' '}
          <a href="#" className="text-[#8D6E63] font-semibold hover:underline">
            Daftar Sekarang
          </a>
        </div>

      </div>
    </div>
  );
}