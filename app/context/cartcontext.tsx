'use client';

import React, { createContext, useContext, useState } from 'react';

// 1. Tentukan bentuk data barang di keranjang
type CartItem = {
  id: string | number;
  title: string;
  price: number;
  img: string;
  qty: number;
};

// 2. Tentukan fungsi apa saja yang bisa dilakukan keranjang
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  cartTotal: number;
};

// 3. Buat Context (Gudangnya)
const CartContext = createContext<CartContextType | undefined>(undefined);

// 4. Buat Provider (Penjaganya yang mendistribusikan data)
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fungsi Tambah Barang
  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      // Cek apakah barang sudah ada di keranjang
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        // Kalau ada, tambahkan jumlahnya (qty) saja
        return prevItems.map((item) =>
          item.id === newItem.id ? { ...item, qty: item.qty + newItem.qty } : item
        );
      }
      // Kalau belum ada, masukkan barang baru ke array
      return [...prevItems, newItem];
    });
  };

  // Fungsi Hapus Barang
  const removeFromCart = (id: string | number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Hitung total harga semua barang
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// 5. Buat custom hook biar gampang dipanggil di file lain
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart harus digunakan di dalam CartProvider');
  }
  return context;
}