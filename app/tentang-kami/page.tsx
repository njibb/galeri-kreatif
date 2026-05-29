/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from 'next/image';

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-gray-900 py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-10 md:p-16">
        <div className="text-center mb-12">
          <span className="text-sm font-bold tracking-widest text-[#B07D60] uppercase">Kisah Kami</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-4 mb-6">Membangun Jembatan Digital untuk Karya Lokal</h1>
          <div className="w-20 h-1 bg-[#B07D60] mx-auto"></div>
        </div>
        
        <div className="space-y-8 text-gray-600 leading-relaxed text-lg">
          <p>
            Berawal dari inisiatif mahasiswa Sistem Informasi Universitas Nasional (UNAS), <strong>Galeri Kreatif</strong> lahir dari sebuah kegelisahan: Banyak pengrajin lokal dan UMKM desa yang memiliki karya luar biasa, namun kesulitan menembus pasar digital.
          </p>
          <p>
            Platform ini bukan sekadar *e-commerce* biasa. Kami menerapkan konsep <em>Technopreneurship</em>—menggabungkan keahlian teknologi mahasiswa dengan kearifan lokal para pengrajin. Kami mengkurasi, mendigitalisasi, dan membantu memasarkan produk-produk seperti gerabah Kasongan, tenun Sade, hingga inovasi teknologi karya mahasiswa sendiri.
          </p>
          <div className="bg-[#F5F2ED] p-8 rounded-2xl border-l-4 border-[#B07D60] my-8 text-gray-800 italic">
            "Visi kami adalah menjadikan setiap karya lokal nusantara menjadi tuan rumah di negeri sendiri, sekaligus memiliki daya saing di kancah global."
          </div>
          <p>
            Melalui Galeri Kreatif, setiap pembelian yang Anda lakukan tidak hanya mendapatkan barang berkualitas, tetapi juga turut memberdayakan ekonomi desa dan mendukung inovasi pendidikan di Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
}