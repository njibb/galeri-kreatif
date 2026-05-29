'use client';
import React from 'react';

export default function HubungiKamiPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-gray-900 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Info Kontak */}
        <div className="md:w-1/3 space-y-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Sapa Kami!</h1>
            <p className="text-gray-600 mb-8">Punya pertanyaan soal produk, kolaborasi, atau sekadar ingin menyapa tim developer? Jangan ragu untuk menghubungi kami.</p>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-xl shrink-0">📍</div>
              <div>
                <h3 className="font-bold text-gray-900">Alamat Kampus</h3>
                <p className="text-gray-500 text-sm mt-1">Sistem Informasi, Universitas Nasional<br/>Jakarta Selatan, Indonesia</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-xl shrink-0">✉️</div>
              <div>
                <h3 className="font-bold text-gray-900">Email</h3>
                <p className="text-gray-500 text-sm mt-1">halo@galerikreatif-unas.ac.id</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Kontak */}
        <div className="md:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Pesan terkirim! (Simulasi)'); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nama Lengkap</label>
                <input type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B07D60]" placeholder="Nama kamu..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email</label>
                <input type="email" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B07D60]" placeholder="email@contoh.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Pesan</label>
              <textarea rows={5} required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B07D60]" placeholder="Tulis pesanmu di sini..."></textarea>
            </div>
            <button type="submit" className="bg-[#1B2422] text-white font-bold px-8 py-4 rounded-xl hover:bg-black transition-all shadow-md">
              Kirim Pesan
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}