'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/cartcontext';

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  
  // Biaya ongkir flat (contoh)
  const shippingCost = 25000;
  const grandTotal = cartTotal + shippingCost;

  // Jika user iseng buka checkout tapi keranjang kosong
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F9F9F9] px-6">
        <span className="text-6xl mb-4">🛒</span>
        <h1 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Checkout Kosong</h1>
        <p className="text-gray-500 mb-6 text-sm text-center">Kamu belum memilih karya apa pun untuk di-checkout.</p>
        <Link href="/katalog" className="bg-[#B07D60] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#8D6E63] transition-colors shadow-md">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-12 px-6 md:px-20 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Checkout Pesanan</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* KOLOM KIRI: Form Alamat & Pengiriman */}
          <div className="w-full lg:w-2/3 space-y-6">
            
            {/* Bagian 1: Alamat Pengiriman */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#B07D60] text-white flex items-center justify-center text-xs">1</span>
                Alamat Pengiriman
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Penerima</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#B07D60] focus:ring-1 focus:ring-[#B07D60]" placeholder="Cth: Nazhif Alhuwaidie" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nomor HP</label>
                  <input type="tel" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#B07D60] focus:ring-1 focus:ring-[#B07D60]" placeholder="Cth: 08123456789" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Alamat Lengkap</label>
                  <textarea rows={3} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#B07D60] focus:ring-1 focus:ring-[#B07D60]" placeholder="Nama jalan, gedung, no rumah..."></textarea>
                </div>
              </div>
            </div>

            {/* Bagian 2: Metode Pembayaran */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#B07D60] text-white flex items-center justify-center text-xs">2</span>
                Metode Pembayaran
              </h2>
              <div className="space-y-3">
                {/* Opsi 1 */}
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-[#B07D60] transition-colors bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" className="accent-[#B07D60] w-4 h-4" defaultChecked />
                    <span className="font-medium text-gray-800 text-sm">Transfer Bank (Virtual Account)</span>
                  </div>
                  <img src="https://www.svgrepo.com/show/508403/bank.svg" className="w-6 h-6 opacity-60" alt="Bank" />
                </label>
                {/* Opsi 2 */}
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-[#B07D60] transition-colors">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" className="accent-[#B07D60] w-4 h-4" />
                    <span className="font-medium text-gray-800 text-sm">QRIS (GoPay, OVO, Dana)</span>
                  </div>
                  <img src="https://www.svgrepo.com/show/328132/qrcode.svg" className="w-6 h-6 opacity-60" alt="QRIS" />
                </label>
              </div>
            </div>

          </div>

          {/* KOLOM KANAN: Ringkasan Pesanan */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>
              
              {/* List Barang Kecil */}
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg relative overflow-hidden shrink-0 border border-gray-100">
                      <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.qty} Barang</p>
                      <p className="text-xs font-bold text-[#B07D60] mt-1">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price * item.qty)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-200 w-full mb-6"></div>

              {/* Kalkulasi */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total Harga ({cartItems.length} Barang)</span>
                  <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total Ongkos Kirim</span>
                  <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(shippingCost)}</span>
                </div>
              </div>

              <div className="h-px bg-gray-200 w-full mb-6"></div>

              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-gray-900">Total Belanja</span>
                <span className="text-xl font-bold text-[#B07D60]">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(grandTotal)}
                </span>
              </div>

              <button 
                onClick={() => alert("Simulasi pembayaran berhasil! Tunggu teman back-end bikin API-nya ya cuy. 😎")}
                className="w-full bg-[#1B2422] text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-md flex items-center justify-center gap-2"
              >
                Bayar Sekarang
              </button>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}