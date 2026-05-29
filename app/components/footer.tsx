'use client'; 

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 

export default function Footer() {
  // Fungsi untuk scroll mulus ke paling atas layar
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1B2422] text-gray-300 py-16 px-10 md:px-20 relative overflow-hidden mt-auto">
      
      {/* --- Garis Latar Estetik --- */}
      <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M500,1000 L1200,-200 M600,1000 L1600,-200" stroke="white" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        
        {/* --- KOLOM KIRI: Identitas & Deskripsi --- */}
        <div className="md:col-span-5 flex flex-col items-start">
          
          {/* Logo Baru Custom */}
          <Link href="/" className="flex items-center gap-3 mb-6 group">
            <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
               <Image 
                  src="/logo.png" 
                  alt="Logo Galeri Kreatif" 
                  fill 
                  style={{ objectFit: 'contain' }}
               />
            </div>
            <span className="text-xl font-bold tracking-widest text-white uppercase font-sans mt-1 group-hover:text-[#E2B08B] transition-colors">
              Galeri Kreatif
            </span>
          </Link>

          {/* Deskripsi */}
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm font-sans">
            Memberdayakan inovasi mahasiswa Sistem Informasi UNAS dan UMKM lokal dengan platform digital terdepan untuk meningkatkan daya saing produk nusantara.
          </p>

          {/* Ikon Sosial Media */}
          <div className="flex items-center gap-6 mb-12 text-gray-200">
            {/* X (Twitter) */}
            <a href="#" className="hover:text-white transition-colors hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.09 4.126H5.117z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="hover:text-white transition-colors hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:text-white transition-colors hover:scale-110">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            {/* Facebook */}
            <a href="#" className="hover:text-white transition-colors hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>

          {/* Tombol Back to Top */}
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 border border-gray-500 hover:border-white text-xs font-bold uppercase tracking-widest text-white px-5 py-3 rounded-sm transition-colors hover:bg-white/5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"></path></svg>
            Back to Top
          </button>

        </div>

        {/* --- KOLOM TENGAH: Peta Situs --- */}
        <div className="md:col-span-3 md:col-start-8">
          <h3 className="text-white font-semibold mb-6">Peta Situs</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#E2B08B] after:transition-transform hover:after:scale-x-100 pb-1 inline-block">Beranda</Link></li>
            <li><Link href="/katalog" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#E2B08B] after:transition-transform hover:after:scale-x-100 pb-1 inline-block">Katalog Produk</Link></li>
            <li><Link href="/kisah-kreator" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#E2B08B] after:transition-transform hover:after:scale-x-100 pb-1 inline-block">Kisah Kreator</Link></li>
            <li><Link href="/tentang-kami" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#E2B08B] after:transition-transform hover:after:scale-x-100 pb-1 inline-block">Tentang Kami</Link></li>
            <li><Link href="/hubungi-kami" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#E2B08B] after:transition-transform hover:after:scale-x-100 pb-1 inline-block">Hubungi Kami</Link></li>
          </ul>
        </div>

        {/* --- KOLOM KANAN: Legal --- */}
        <div className="md:col-span-2">
          <h3 className="text-white font-semibold mb-6">Legal</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="/kebijakan-privasi" className="hover:text-white transition-colors pb-1 inline-block">Kebijakan Privasi</Link></li>
            <li><Link href="/syarat-ketentuan" className="hover:text-white transition-colors pb-1 inline-block">Syarat & Ketentuan</Link></li>
            <li><Link href="/lisensi" className="hover:text-white transition-colors pb-1 inline-block">Lisensi Hak Cipta</Link></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}