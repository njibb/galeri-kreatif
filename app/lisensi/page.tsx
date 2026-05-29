/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function LisensiPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-gray-900 py-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-100 pb-6">Lisensi Hak Cipta</h1>
        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
          <p>© 2026 Galeri Kreatif - Sistem Informasi Universitas Nasional. Hak Cipta Dilindungi Undang-Undang.</p>
          <h3 className="font-bold text-gray-900 text-base mt-6">Pernyataan Hak Cipta</h3>
          <p>Platform e-commerce "Galeri Kreatif" ini dikembangkan sebagai bentuk nyata implementasi ilmu Technopreneurship. Seluruh kode sumber (*source code*) front-end dan desain UI/UX adalah milik pengembang (Nazhif Alhuwaidie dan tim).</p>
          <h3 className="font-bold text-gray-900 text-base mt-6">Penggunaan Karya Kreator</h3>
          <p>Hak cipta dari setiap karya kerajinan (gerabah, tenun, dll) dan inovasi teknologi tetap berada pada kreator aslinya (UMKM dan Mahasiswa). Platform ini bertindak sebagai fasilitator digital. Dilarang keras mereproduksi, menyalin desain produk, atau menggunakan foto produk untuk kepentingan komersial di luar platform ini tanpa izin tertulis dari pihak kreator.</p>
        </div>
      </div>
    </div>
  );
}