/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'; 

import React, { useState } from 'react';
import Image from 'next/image';
// --- 1. TAMBAHKAN IMPORT LINK DI SINI ---
import Link from 'next/link'; 

// --- DATA MOCKUP KREATOR ---
const creatorsData = [
  {
    id: 'kasongan',
    name: 'Mbah Nangsib',
    location: 'Desa Kasongan, Yogyakarta',
    role: 'Maestro Gerabah Terracotta',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600', 
    story: 'Selama lebih dari 40 tahun, Mbah Nangsib telah berkutat dengan tanah liat. Baginya, gerabah bukan sekadar benda fungsional, melainkan "doa yang dipadatkan". Melalui program pendampingan mahasiswa, karya otentik Mbah Nangsib kini dikurasi dan dipasarkan secara digital, menjaga warisan leluhur agar tidak lekang oleh zaman.',
    products: [
      // --- 2. ID DISAMAKAN DENGAN DATABASE KATALOG (4 & 6) ---
      { id: 4, title: 'Guci Terracotta Klasik', price: 'Rp 350.000', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400' }, 
      { id: 6, title: 'Minimalist Clay Vase Set', price: 'Rp 180.000', img: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=400' }
    ]
  },
  {
    id: 'sade',
    name: 'Ina Nurani',
    location: 'Desa Sade, Lombok',
    role: 'Pengrajin Tenun Ikat',
    image: 'https://images.unsplash.com/photo-1528150177508-7cc0c36cda5c?q=80&w=600',
    story: 'Bagi perempuan Sade, menenun adalah syarat kedewasaan. Ina Nurani mewarisi motif-motif kuno yang menceritakan keseimbangan alam. Dengan sentuhan technopreneurship, kain tenun Ina kini tidak hanya menjadi pakaian adat, tetapi juga diadaptasi menjadi elemen fashion modern yang digemari pasar luas.',
    products: [
      // --- 2. ID DISAMAKAN DENGAN DATABASE KATALOG (1 & 2) ---
      { id: 1, title: 'Woven Bag Modern', price: 'Rp 450.000', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400' },
      { id: 2, title: 'Hand-Painted Batik Textile', price: 'Rp 650.000', img: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=400' }
    ]
  }
];

export default function KisahKreatorPage() {
  const [selectedCreator, setSelectedCreator] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-gray-900 py-16 px-6 md:px-20">
      
      {/* TAMPILAN 1: JIKA BELUM ADA KREATOR YANG DIPILIH */}
      {!selectedCreator && (
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Pilih Jejak Kreator</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Setiap karya memiliki wajah dan cerita. Jelajahi desa wisata dan komunitas mahasiswa yang menjadi jantung dari platform kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {creatorsData.map((creator) => (
              <div 
                key={creator.id} 
                onClick={() => setSelectedCreator(creator)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100"
              >
                <div className="relative h-72 w-full overflow-hidden bg-gray-200">
                  <Image 
                    src={creator.image} 
                    alt={creator.name} 
                    fill 
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                    <h2 className="text-3xl font-serif text-white mb-1">{creator.name}</h2>
                    <p className="text-gray-200 text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#B07D60] rounded-full"></span>
                      {creator.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAMPILAN 2: JIKA KREATOR SUDAH DIPILIH */}
      {selectedCreator && (
        <div className="max-w-7xl mx-auto animate-fadeIn">
          
          <button 
            onClick={() => setSelectedCreator(null)}
            className="mb-8 flex items-center gap-2 text-gray-500 hover:text-[#B07D60] transition-colors font-medium text-sm"
          >
            &larr; Kembali ke Daftar Kreator
          </button>

          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row mb-16">
            <div className="md:w-2/5 relative h-[400px] md:h-auto">
               <Image src={selectedCreator.image} alt={selectedCreator.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="md:w-3/5 p-10 md:p-16 flex flex-col justify-center">
               <span className="text-sm font-bold tracking-widest text-[#B07D60] uppercase mb-3">{selectedCreator.role}</span>
               <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">{selectedCreator.name}</h1>
               <div className="w-16 h-1 bg-[#B07D60] mb-6"></div>
               <p className="text-gray-600 leading-relaxed text-lg mb-8">
                 {selectedCreator.story}
               </p>
               <div className="inline-block bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm border border-gray-200 w-max">
                 📍 {selectedCreator.location}
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-gray-900 mb-8 flex items-center gap-3">
              Karya dari {selectedCreator.name}
              <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full font-sans font-medium">Verified Source</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {selectedCreator.products.map((product: any) => (
                
             
                <Link 
                  href={`/katalog/${product.id}`} 
                  key={product.id} 
                  className="group cursor-pointer block"
                >
                  <div className="w-full h-64 rounded-2xl overflow-hidden relative mb-4 bg-gray-100 border border-gray-100">
                    <Image 
                      src={product.img} 
                      alt={product.title} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#B07D60] transition-colors">{product.title}</h3>
                  <p className="font-bold text-[#B07D60] text-sm mt-1">{product.price}</p>
                </Link>

              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}