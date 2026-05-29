import React from 'react';

export default function KebijakanPrivasiPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-gray-900 py-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-100 pb-6">Kebijakan Privasi</h1>
        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
          <p>Terakhir diperbarui: Mei 2026</p>
          <h3 className="font-bold text-gray-900 text-base mt-6">1. Pengumpulan Data</h3>
          <p>Kami di Galeri Kreatif sangat menghargai privasi Anda. Kami hanya mengumpulkan informasi yang Anda berikan secara sukarela saat melakukan registrasi atau checkout, seperti nama, alamat email, dan alamat pengiriman.</p>
          <h3 className="font-bold text-gray-900 text-base mt-6">2. Penggunaan Data</h3>
          <p>Data yang dikumpulkan semata-mata digunakan untuk memproses pesanan Anda, memfasilitasi pengiriman dengan pihak logistik, dan meningkatkan pengalaman pengguna (*User Experience*) pada platform kami.</p>
          <h3 className="font-bold text-gray-900 text-base mt-6">3. Keamanan Data</h3>
          <p>Kami berkomitmen untuk melindungi data pribadi Anda. Data Anda tidak akan pernah dijual atau dibagikan kepada pihak ketiga untuk tujuan pemasaran tanpa izin tertulis dari Anda.</p>
        </div>
      </div>
    </div>
  );
}