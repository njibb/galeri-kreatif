import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/navbar"; 
import Footer from "./components/footer"; 
import { CartProvider } from "./context/cartcontext"; // <-- 1. IMPORT CART PROVIDER
import "./globals.css";

// --- INI BAGIAN FONT YANG TADI HILANG ---
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// ----------------------------------------

export const metadata: Metadata = {
  title: "Galeri Kreatif | Platform Produk Lokal",
  description: "Platform Technopreneurship untuk Karya Mahasiswa dan UMKM Desa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F9F9F9] text-gray-800">
        
        {/* --- 2. BUNGKUS SEMUA KONTEN DENGAN CART PROVIDER --- */}
        <CartProvider>
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </CartProvider>

      </body>
    </html>
  );
}