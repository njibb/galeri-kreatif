'use client'; 

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/cartcontext'; 

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // STATE BARU BUAT MENU LIPAT (ACCORDION) DI HP
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loggedInUser, setLoggedInUser] = useState<{name: string, email: string, profile_picture?: string} | null>(null);

  const { cartItems, removeFromCart, cartTotal } = useCart(); 

  const isFormValid = isRegisterMode 
    ? name.trim() !== '' && email.trim() !== '' && password.trim() !== ''
    : email.trim() !== '' && password.trim() !== '';

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setLoggedInUser(JSON.parse(storedUser));
      }
    };

    loadUser(); 
    window.addEventListener('profileUpdated', loadUser);
    return () => window.removeEventListener('profileUpdated', loadUser);
  }, []);

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsRegisterMode(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedInUser(null);
    setIsMobileProfileOpen(false); // Tutup lipatan kalau logout
    alert('Berhasil keluar abangku! 👋');
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isRegisterMode 
      ? 'https://backend-galeri-api.vercel.app/api/register' 
      : 'https://backend-galeri-api.vercel.app/api/login';
      
    const payload = isRegisterMode ? { name, email, password } : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message); 
        
        if (!isRegisterMode && data.token) {
           localStorage.setItem('token', data.token);
           localStorage.setItem('user', JSON.stringify(data.user));
           setLoggedInUser(data.user);
           setName(''); setEmail(''); setPassword('');
           setIsLoginOpen(false); 
        } else if (isRegisterMode) {
           setIsRegisterMode(false);
           setPassword(''); 
        }
      } else {
        alert(`Gagal: ${data.message}`); 
      }
    } catch (error) {
      console.error("Error sambungan API:", error);
      alert('Waduh, gagal nyambung ke server Back-end. Pastikan servernya jalan!');
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center px-5 md:px-10 py-4 md:py-5 bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm relative">
        
        <Link href="/" className="flex items-center shrink-0">
          <div className="relative w-12 h-12 md:w-20 md:h-20">
            <Image src="/logo.png" alt="Logo Galeri Kreatif" fill style={{ objectFit: 'contain' }} priority />
          </div>
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 focus-within:border-[#B07D60] focus-within:bg-white transition-all hover:shadow-sm">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="text" className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700 placeholder-gray-400" placeholder="Cari karya lokal..." />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8 shrink-0">
          
          <div className="hidden md:flex space-x-8 text-sm font-medium items-center text-gray-700">
            <Link href="/jual" className="text-[#B07D60] font-bold hover:text-[#8D6E63] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#B07D60] after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
              Mulai Berjualan
            </Link>
            <Link href="/katalog" className="hover:text-[#B07D60] transition-colors">Katalog</Link>
            <Link href="/kisah-kreator" className="hover:text-[#B07D60] transition-colors">Kisah Kreator</Link>
            
            {loggedInUser ? (
              <div className="relative group cursor-pointer flex items-center gap-2 py-2">
                {loggedInUser.profile_picture ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gray-200">
                    <Image src={loggedInUser.profile_picture} alt="Profil" fill style={{ objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-[#B07D60] text-white rounded-full flex items-center justify-center font-bold text-xs uppercase">
                    {loggedInUser.name.charAt(0)}
                  </div>
                )}

                <span className="text-sm font-bold text-gray-800 group-hover:text-[#B07D60] transition-colors">
                  {loggedInUser.name.split(' ')[0]}
                </span>

                <div className="absolute right-0 top-full w-40 bg-white rounded-sm shadow-md border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                  <Link href="/profil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#B07D60] transition-colors">Akun Saya</Link>
                  <Link href="/pesanan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#B07D60] transition-colors">Pesanan Saya</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#B07D60] transition-colors">Log Out</button>
                </div>
              </div>
            ) : (
              <button onClick={openLoginModal} className="hover:text-[#B07D60] transition-colors font-medium">Login/Daftar</button>
            )}
          </div>
          
          <div className="relative">
            <div className="cursor-pointer hover:scale-105 transition-transform flex items-center gap-1.5 p-1 md:p-2" onClick={() => setIsCartOpen(!isCartOpen)}>
              <svg className={`w-6 h-6 md:w-6 md:h-6 ${isCartOpen ? 'text-[#B07D60]' : 'text-gray-800'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span className="text-gray-900 font-bold bg-gray-100 px-2 py-0.5 rounded-full text-xs">{cartItems.length}</span>
            </div>

            {isCartOpen && (
              <div className="absolute right-0 top-full mt-4 w-[300px] md:w-[360px] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                {cartItems.length === 0 ? (
                  <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-[#F5F2ED] rounded-full flex items-center justify-center mb-4"><span className="text-3xl">🛒</span></div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 font-serif">Wah, keranjang belanjamu kosong</h3>
                    <p className="text-gray-500 text-xs mb-6">Yuk, isi dengan karya-karya lokal impianmu!</p>
                    <Link href="/katalog" onClick={() => setIsCartOpen(false)} className="w-full bg-white border border-[#B07D60] text-[#B07D60] font-bold py-2 rounded-lg hover:bg-[#B07D60] hover:text-white transition-colors block text-center text-sm">Mulai Belanja</Link>
                  </div>
                ) : (
                  <div className="flex flex-col max-h-[400px]">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center"><h3 className="font-bold text-gray-900 text-sm">Keranjang ({cartItems.length})</h3></div>
                    <div className="overflow-y-auto p-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors group relative">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg relative overflow-hidden shrink-0"><Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} /></div>
                          <div className="flex-1">
                            <h4 className="text-[11px] font-bold text-gray-800 line-clamp-1 mb-1">{item.title}</h4>
                            <div className="flex justify-between items-center"><span className="text-[10px] font-medium text-gray-500">{item.qty} x {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price)}</span></div>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-1 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                      <div className="flex justify-between items-center mb-4"><span className="text-xs font-medium text-gray-500">Total Harga</span><span className="font-bold text-[#B07D60] text-base">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(cartTotal)}</span></div>
                      <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="w-full bg-[#1B2422] text-white font-bold py-2.5 rounded-lg hover:bg-black transition-colors block text-center text-sm">Checkout</Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button className="md:hidden text-gray-800 p-1 focus:outline-none" onClick={() => setIsMobileMenuOpen(true)}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>

        </div>
      </nav>

      {/* --- MENU SIDEBAR HP --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative w-64 bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <span className="font-serif font-bold text-lg text-gray-900">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>
            <div className="flex flex-col p-4 space-y-2">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#B07D60] rounded-xl transition-colors">Beranda</Link>
              <Link href="/katalog" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#B07D60] rounded-xl transition-colors">Katalog Produk</Link>
              <Link href="/kisah-kreator" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#B07D60] rounded-xl transition-colors">Kisah Kreator</Link>
              <Link href="/jual" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-bold text-[#B07D60] hover:bg-gray-50 rounded-xl transition-colors border border-[#B07D60]/20 mt-2">Mulai Berjualan</Link>
            </div>
            <div className="mt-auto p-5 border-t border-gray-100">
              
              {loggedInUser ? (
                <div className="flex flex-col gap-2">
                  
                  {/* 👇 TOMBOL ACCORDION PROFIL HP 👇 */}
                  <button 
                    onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)} 
                    className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-xl transition-colors text-left"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {loggedInUser.profile_picture ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden relative border border-gray-200 shrink-0">
                          <Image src={loggedInUser.profile_picture} alt="Profil" fill style={{ objectFit: 'cover' }} />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-[#B07D60] text-white rounded-full flex items-center justify-center font-bold text-lg uppercase shrink-0">
                          {loggedInUser.name.charAt(0)}
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <p className="font-bold text-gray-900 text-sm truncate">{loggedInUser.name}</p>
                        <p className="text-xs text-gray-500 truncate">{loggedInUser.email}</p>
                      </div>
                    </div>
                    {/* Icon Panah Kecil (Muter otomatis kalau isMobileProfileOpen true) */}
                    <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 shrink-0 ${isMobileProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  {/* 👇 ISI MENU YANG MUNCUL KALAU DIPENCET 👇 */}
                  {isMobileProfileOpen && (
                    <div className="flex flex-col gap-1 mb-2 px-2 animate-in slide-in-from-top-2 duration-200">
                      <Link href="/profil" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-[#B07D60] flex items-center gap-3 transition-colors rounded-lg hover:bg-gray-50">
                        <span className="text-lg">👤</span> Akun Saya
                      </Link>
                      <Link href="/pesanan" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-[#B07D60] flex items-center gap-3 transition-colors rounded-lg hover:bg-gray-50">
                        <span className="text-lg">📦</span> Pesanan Saya
                      </Link>
                    </div>
                  )}

                  <button onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} className="w-full bg-red-50 text-red-600 border border-red-100 font-bold py-3 rounded-xl hover:bg-red-100 transition-colors shadow-sm text-sm mt-1">Keluar Akun</button>
                </div>
              ) : (
                <button onClick={() => { setIsMobileMenuOpen(false); openLoginModal(); }} className="w-full bg-[#B07D60] text-white font-bold py-3 rounded-xl hover:bg-[#8D6E63] transition-colors shadow-sm">Login / Daftar</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- POPUP / MODAL LOGIN --- */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsLoginOpen(false)}></div>
          <div className="bg-white w-full max-w-[420px] rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 pb-2">
              <h2 className="text-2xl font-bold text-gray-900">{isRegisterMode ? 'Daftar' : 'Masuk'}</h2>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => { setIsRegisterMode(!isRegisterMode); setName(''); setEmail(''); setPassword(''); }} className="font-bold text-[#B07D60] text-sm hover:underline transition-all">{isRegisterMode ? 'Masuk' : 'Daftar'}</button>
                <button onClick={() => setIsLoginOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
              </div>
            </div>
            <div className="p-6 pt-4">
              <form className="space-y-4" onSubmit={handleAuth}>
                {isRegisterMode && (
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#B07D60] focus:ring-1 focus:ring-[#B07D60] transition-all" /></div>
                )}
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP atau Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#B07D60] focus:ring-1 focus:ring-[#B07D60] transition-all" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#B07D60] focus:ring-1 focus:ring-[#B07D60] transition-all" /></div>
                {!isRegisterMode && <div className="flex justify-end pt-1"><a href="#" className="text-sm font-medium text-[#B07D60] hover:underline">Lupa kata sandi?</a></div>}
                <button type="submit" disabled={!isFormValid} className={`w-full font-bold py-3.5 rounded-xl transition-all mt-4 text-sm ${isFormValid ? 'bg-[#B07D60] text-white hover:bg-[#8D6E63] shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Selanjutnya</button>
              </form>
              <div className="flex items-center gap-4 my-6"><div className="flex-1 h-px bg-gray-200"></div><span className="text-xs text-gray-400 font-medium">atau {isRegisterMode ? 'daftar' : 'masuk'} dengan</span><div className="flex-1 h-px bg-gray-200"></div></div>
              <button type="button" className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-all mb-3 flex justify-center items-center gap-2 text-sm"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>Scan Kode QR</button>
              <button type="button" className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-all flex justify-center items-center gap-2 text-sm">Metode Lain</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}