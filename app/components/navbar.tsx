'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/cartcontext'; 

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // --- STATE BARU UNTUK MENU HP (HAMBURGER) ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cartItems, removeFromCart, cartTotal } = useCart(); 

  return (
    <>
      {/* Padding diperkecil sedikit di HP (px-5) dan normal di Desktop (md:px-10) */}
      <nav className="flex justify-between items-center px-5 md:px-10 py-4 md:py-5 bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm relative">
        
        {/* Bagian Kiri: Logo */}
        <Link href="/" className="flex items-center shrink-0">
          {/* Ukuran logo disesuaikan lebih pas di HP */}
          <div className="relative w-12 h-12 md:w-20 md:h-20">
            <Image src="/logo.png" alt="Logo Galeri Kreatif" fill style={{ objectFit: 'contain' }} priority />
          </div>
        </Link>

        {/* Bagian Tengah: Search Bar (HANYA MUNCUL DI DESKTOP - hidden md:flex) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 focus-within:border-[#B07D60] focus-within:bg-white transition-all hover:shadow-sm">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="text" className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700 placeholder-gray-400" placeholder="Cari karya lokal..." />
          </div>
        </div>

        {/* Bagian Kanan: Menu, Cart & Hamburger */}
        <div className="flex items-center gap-4 md:gap-8 shrink-0">
          
          {/* MENU TEKS (HANYA MUNCUL DI DESKTOP - hidden md:flex) */}
          <div className="hidden md:flex space-x-8 text-sm font-medium items-center text-gray-700">
            <Link href="/katalog" className="hover:text-[#B07D60] transition-colors">Katalog</Link>
            <Link href="/kisah-kreator" className="hover:text-[#B07D60] transition-colors">Kisah Kreator</Link>
            <button 
              onClick={() => { setIsLoginOpen(true); setIsRegisterMode(false); }}
              className="hover:text-[#B07D60] transition-colors font-medium"
            >
              Login/Daftar
            </button>
          </div>
          
          {/* IKON KERANJANG & POPOVER (MUNCUL DI HP & DESKTOP) */}
          <div className="relative">
            <div 
              className="cursor-pointer hover:scale-105 transition-transform flex items-center gap-1.5 p-1 md:p-2"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <svg className={`w-6 h-6 md:w-6 md:h-6 ${isCartOpen ? 'text-[#B07D60]' : 'text-gray-800'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span className="text-gray-900 font-bold bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                {cartItems.length}
              </span>
            </div>

            {/* Kotak Pop-over Keranjang (Disesuaikan lebarnya untuk HP) */}
            {isCartOpen && (
              <div className="absolute right-0 top-full mt-4 w-[300px] md:w-[360px] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                {cartItems.length === 0 ? (
                  <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-[#F5F2ED] rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl">🛒</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 font-serif">Wah, keranjang belanjamu kosong</h3>
                    <p className="text-gray-500 text-xs mb-6">Yuk, isi dengan karya-karya lokal impianmu!</p>
                    <Link 
                      href="/katalog"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full bg-white border border-[#B07D60] text-[#B07D60] font-bold py-2 rounded-lg hover:bg-[#B07D60] hover:text-white transition-colors block text-center text-sm"
                    >
                      Mulai Belanja
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col max-h-[400px]">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                      <h3 className="font-bold text-gray-900 text-sm">Keranjang ({cartItems.length})</h3>
                    </div>
                    
                    <div className="overflow-y-auto p-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors group relative">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg relative overflow-hidden shrink-0">
                            <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-[11px] font-bold text-gray-800 line-clamp-1 mb-1">{item.title}</h4>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-medium text-gray-500">
                                {item.qty} x {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price)}
                              </span>
                            </div>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-1 transition-colors">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-medium text-gray-500">Total Harga</span>
                        <span className="font-bold text-[#B07D60] text-base">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(cartTotal)}
                        </span>
                      </div>
                      <Link 
                        href="/checkout"
                        onClick={() => setIsCartOpen(false)}
                        className="w-full bg-[#1B2422] text-white font-bold py-2.5 rounded-lg hover:bg-black transition-colors block text-center text-sm"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* TOMBOL HAMBURGER (HANYA MUNCUL DI HP - md:hidden) */}
          <button 
            className="md:hidden text-gray-800 p-1 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

        </div>
      </nav>

      {/* --- MENU SIDEBAR HP (OFF-CANVAS) --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          {/* Background gelap (Klik untuk tutup) */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Panel Menu Putih dari Kanan */}
          <div className="relative w-64 bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Header Sidebar */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <span className="font-serif font-bold text-lg text-gray-900">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Link Navigasi HP */}
            <div className="flex flex-col p-4 space-y-2">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#B07D60] rounded-xl transition-colors"
              >
                Beranda
              </Link>
              <Link 
                href="/katalog" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#B07D60] rounded-xl transition-colors"
              >
                Katalog Produk
              </Link>
              <Link 
                href="/kisah-kreator" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#B07D60] rounded-xl transition-colors"
              >
                Kisah Kreator
              </Link>
            </div>

            {/* Tombol Login HP di Bawah */}
            <div className="mt-auto p-5 border-t border-gray-100">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); setIsRegisterMode(false); }}
                className="w-full bg-[#B07D60] text-white font-bold py-3 rounded-xl hover:bg-[#8D6E63] transition-colors shadow-sm"
              >
                Login / Daftar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- POPUP / MODAL LOGIN --- */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsLoginOpen(false)}></div>
          <div className="bg-white w-full max-w-[400px] rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsLoginOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 transition-colors rounded-full hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 font-serif mb-8">{isRegisterMode ? 'Daftar' : 'Masuk'}</h2>
              <button className="w-full bg-[#B07D60] text-white font-bold py-3.5 rounded-lg hover:bg-[#8D6E63] transition-colors mb-6 shadow-md shadow-[#B07D60]/20">Selanjutnya</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}