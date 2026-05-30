'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// --- 1. TAMBAHKAN useRouter DI SINI ---
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../context/cartcontext'; 

// --- DATA MOCKUP LENGKAP ---
const ALL_PRODUCTS = [
  { id: 1, title: 'Woven Bag Modern', category: 'Fashion Artisan', origin: 'Kerajinan Desa Wisata', price: 450000, img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600', creator: 'Ina Nurani (Sade)', description: 'Tas anyaman modern yang dipadukan dengan teknik tradisional dari Desa Sade. Cocok untuk kegiatan sehari-hari maupun acara formal.', stock: 15 },
  { id: 2, title: 'Hand-Painted Batik Textile', category: 'Fashion Artisan', origin: 'Kerajinan Desa Wisata', price: 650000, img: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=600', creator: 'Sanggar Sekar (Imogiri)', description: 'Kain batik lukis tangan asli dari Imogiri dengan pewarna alami. Setiap lembar kain memiliki motif unik yang tidak ada duanya.', stock: 8 },
  { id: 3, title: 'Smart Hydroponic Kit v1', category: 'Inovasi Teknologi', origin: 'Karya Mahasiswa', price: 299000, img: '/hydro.png', creator: 'Tim Tech UNAS', description: 'Kit hidroponik pintar yang dilengkapi sensor kelembapan dan aplikasi pemantau di HP. Cocok untuk menanam sayuran di lahan sempit kos atau apartemen.', stock: 20 },
  { id: 4, title: 'Guci Terracotta Klasik', category: 'Kriya & Pottery', origin: 'Kerajinan Desa Wisata', price: 350000, img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600', creator: 'Mbah Nangsib (Kasongan)', description: 'Guci buatan tangan asli dari tanah liat Kasongan. Dibakar dengan suhu tinggi untuk memastikan keawetan estetika ruangan.', stock: 5 },
  { id: 5, title: 'Eco Bamboo Desk Organizer', category: 'Kriya & Pottery', origin: 'Karya Mahasiswa', price: 125000, img: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=600', creator: 'HMP Sistem Informasi', description: 'Tempat alat tulis meja dari bambu ramah lingkungan, didesain ergonomis dengan sentuhan modern minimalis.', stock: 35 },
  { id: 6, title: 'Minimalist Clay Vase Set', category: 'Kriya & Pottery', origin: 'Kerajinan Desa Wisata', price: 180000, img: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=600', creator: 'Mbah Nangsib (Kasongan)', description: 'Set vas bunga minimalis dari tanah liat dengan finishing matte. Memberikan nuansa earth tone yang hangat pada ruangan.', stock: 12 },
  { id: 7, title: 'Artisanal Canvas Tote Bag', category: 'Fashion Artisan', origin: 'Karya Mahasiswa', price: 950000, img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600', creator: 'Klub Seni Kampus', description: 'Tote bag kanvas premium dengan sentuhan lukisan tangan eksklusif. Kuat, tebal, dan bernilai seni tinggi.', stock: 3 },
  { id: 8, title: 'IoT Automated Egg Incubator', category: 'Inovasi Teknologi', origin: 'Karya Mahasiswa', price: 1200000, img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600', creator: 'Lab Robotik Kelompok 3', description: 'Inkubator telur otomatis berbasis IoT. Suhu dan kelembapan diatur presisi oleh mikrokontroler untuk memaksimalkan tingkat tetas.', stock: 2 },
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id; 
  
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false); 

  const { addToCart } = useCart(); 
  // --- 2. DEKLARASIKAN ROUTER ---
  const router = useRouter(); 

  const product = ALL_PRODUCTS.find(p => String(p.id) === productId);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F9F9F9] px-6">
        <span className="text-6xl mb-4">🥲</span>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Produk tidak ditemukan</h1>
        <p className="text-gray-500 mb-6 text-sm">Mungkin produk yang kamu cari sudah dihapus atau URL-nya salah.</p>
        <Link href="/katalog" className="bg-[#B07D60] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#8D6E63] transition-colors">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.img,
      qty: qty
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); 
  };

  // --- 3. FUNGSI UNTUK TOMBOL BELI SEKARANG ---
  const handleBuyNow = () => {
    // Masukkan barang ke keranjang
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.img,
      qty: qty
    });
    // Lempar user ke halaman checkout
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-12 px-6 md:px-20 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumb Navigasi */}
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-[#B07D60]">Beranda</Link>
          <span>/</span>
          <Link href="/katalog" className="hover:text-[#B07D60]">Katalog</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.title}</span>
        </div>

        {/* Kontainer Utama */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Bagian Kiri: Gambar Produk */}
          <div className="md:w-1/2 relative min-h-[400px] md:min-h-[650px] bg-gray-100 group">
            <Image 
              src={product.img} 
              alt={product.title} 
              fill 
              style={{ objectFit: 'cover' }} 
              priority
              className="transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Bagian Kanan: Detail & Checkout */}
          <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white z-10 relative">
            
            <div className="mb-4 flex items-center gap-3">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-white ${
                  product.origin === 'Karya Mahasiswa' ? 'bg-blue-600' : 'bg-[#8D6E63]'
              }`}>
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4 leading-[1.1]">
              {product.title}
            </h1>
            
            <div className="text-2xl font-bold text-[#B07D60] mb-6">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price)}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-base">
              {product.description}
            </p>

            {/* Kotak Info Kreator */}
            <div className="mb-8 p-5 bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-5">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-gray-100 shrink-0">
                {product.origin === 'Karya Mahasiswa' ? '🎓' : '🧑‍🎨'}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">{product.origin}</p>
                <p className="font-bold text-gray-900 text-base">{product.creator}</p>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full mb-8"></div>

            {/* 👇 AREA KUANTITAS YANG SUDAH DIPERBAIKI 👇 */}
            <div className="flex flex-wrap items-center gap-3 md:gap-5 mb-6">
              <span className="text-sm font-bold text-gray-900 uppercase tracking-wider shrink-0">Kuantitas</span>
              <div className="flex items-center border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden shrink-0">
                <button 
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  className="px-4 md:px-5 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-[#B07D60] transition-colors"
                >&minus;</button>
                <span className="px-3 md:px-4 font-bold text-sm text-gray-900 w-10 md:w-12 text-center border-l border-r border-gray-100">{qty}</span>
                <button 
                  onClick={() => setQty(qty < product.stock ? qty + 1 : product.stock)}
                  className="px-4 md:px-5 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-[#B07D60] transition-colors"
                >&#43;</button>
              </div>
              <span className="text-xs font-medium text-gray-400">Sisa {product.stock} stok</span>
            </div>
            {/* 👆 BATAS PERBAIKAN KUANTITAS 👆 */}

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 border-2 font-bold py-4 rounded-xl transition-all shadow-sm flex justify-center items-center gap-2 ${
                  isAdded 
                    ? 'bg-green-50 border-green-500 text-green-600 cursor-not-allowed' 
                    : 'bg-white border-[#B07D60] text-[#B07D60] hover:bg-[#B07D60] hover:text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Berhasil Ditambah!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    + Keranjang
                  </>
                )}
              </button>
              {/* --- 4. PASANG FUNGSI KLIK DI SINI --- */}
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-[#1B2422] text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-md"
              >
                Beli Sekarang
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}