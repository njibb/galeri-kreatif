'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- DATA MOCKUP SEMUA PRODUK ---
const ALL_PRODUCTS = [
  { id: 1, title: 'Woven Bag Modern', category: 'fashion', origin: 'desa', price: 450000, img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400', creator: 'Ina Nurani (Sade)' },
  { id: 2, title: 'Hand-Painted Batik Textile', category: 'fashion', origin: 'desa', price: 650000, img: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=400', creator: 'Sanggar Sekar (Imogiri)' },
  { id: 3, title: 'Smart Hydroponic Kit v1', category: 'inovasi', origin: 'mahasiswa', price: 299000, img: '/hydro.png', creator: 'Tim Tech UNAS' },
  { id: 4, title: 'Guci Terracotta Klasik', category: 'kriya', origin: 'desa', price: 350000, img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400', creator: 'Mbah Nangsib (Kasongan)' },
  { id: 5, title: 'Eco Bamboo Desk Organizer', category: 'kriya', origin: 'mahasiswa', price: 125000, img: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=400', creator: 'HMP Sistem Informasi' },
  { id: 6, title: 'Minimalist Clay Vase Set', category: 'kriya', origin: 'desa', price: 180000, img: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=400', creator: 'Mbah Nangsib (Kasongan)' },
  { id: 7, title: 'Artisanal Canvas Tote Bag', category: 'fashion', origin: 'mahasiswa', price: 950000, img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400', creator: 'Klub Seni Kampus' },
  { id: 8, title: 'IoT Automated Egg Incubator', category: 'inovasi', origin: 'mahasiswa', price: 1200000, img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400', creator: 'Lab Robotik Kelompok 3' },
];

export default function KatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [sortBy, setSortBy] = useState('relevant');

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    if (searchQuery) {
      result = result.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedOrigin !== 'all') {
      result = result.filter(p => p.origin === selectedOrigin);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedOrigin, sortBy]);

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-gray-900 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Katalog Karya Nusantara</h1>
            <p className="text-gray-500 text-sm mt-1">Menampilkan {filteredAndSortedProducts.length} produk terkurasi</p>
          </div>
          
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Urutkan:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium outline-none text-gray-700 focus:border-[#B07D60]"
            >
              <option value="relevant">Paling Relevan</option>
              <option value="price-low">Harga: Rendah ke Tinggi</option>
              <option value="price-high">Harga: Tinggi ke Rendah</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          <aside className="w-full md:w-1/4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <div className="mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Cari di Katalog</h3>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <input 
                  type="text" 
                  placeholder="Nama produk..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-sm text-gray-700"
                />
              </div>
            </div>

            <div className="mb-6 border-t border-gray-100 pt-5">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Asal Kreator</h3>
              <div className="flex flex-col space-y-2">
                {[
                  { label: 'Semua Asal', value: 'all' },
                  { label: '💡 Karya Mahasiswa', value: 'mahasiswa' },
                  { label: '🧶 Kerajinan Desa Wisata', value: 'desa' },
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-3 text-sm font-medium text-gray-700 cursor-pointer">
                    <input 
                      type="radio" 
                      name="origin" 
                      checked={selectedOrigin === item.value}
                      onChange={() => setSelectedOrigin(item.value)}
                      className="accent-[#B07D60] w-4 h-4"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Kategori</h3>
              <div className="flex flex-col space-y-2">
                {[
                  { label: 'Semua Kategori', value: 'all' },
                  { label: 'Kriya & Pottery', value: 'kriya' },
                  { label: 'Fashion Artisan', value: 'fashion' },
                  { label: 'Inovasi Teknologi', value: 'inovasi' },
                ].map((cat) => (
                  <label key={cat.value} className="flex items-center gap-3 text-sm font-medium text-gray-700 cursor-pointer">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === cat.value}
                      onChange={() => setSelectedCategory(cat.value)}
                      className="accent-[#B07D60] w-4 h-4"
                    />
                    {cat.label}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <main className="w-full md:w-3/4">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
                <span className="text-5xl">🔍</span>
                <h3 className="text-xl font-bold mt-4 text-gray-800">Karya tidak ditemukan</h3>
                <p className="text-gray-500 text-sm mt-2">Coba ubah kombinasi filter atau kata kunci pencarian kamu.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <Link 
                    href={`/katalog/${product.id}`} 
                    key={product.id} 
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col h-full cursor-pointer"
                  >
                    <div className="w-full h-56 relative bg-gray-100 overflow-hidden">
                      <Image 
                        src={product.img} 
                        alt={product.title} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm text-white ${
                        product.origin === 'mahasiswa' ? 'bg-blue-600' : 'bg-[#8D6E63]'
                      }`}>
                        {product.origin === 'mahasiswa' ? 'Student Inov' : 'Village Craft'}
                      </span>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="text-[11px] font-medium text-gray-400 mb-1">
                          By {product.creator}
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-[#B07D60] transition-colors leading-snug">
                          {product.title}
                        </h3>
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50">
                        <span className="font-bold text-[#B07D60] text-base">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price)}
                        </span>
                        
                        <div className="p-2 rounded-xl bg-gray-50 group-hover:bg-[#B07D60] text-gray-600 group-hover:text-white transition-colors border border-gray-100 group-hover:border-transparent">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}