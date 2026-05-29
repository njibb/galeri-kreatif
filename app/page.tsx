import React from 'react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="font-sans text-gray-900 bg-white">
      
      {/* --- 1. HERO SECTION --- */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center overflow-hidden">
        
        {/* Gambar Background Penuh (menggunakan gambar yang kamu upload) */}
        <div className="absolute inset-0 z-0">
          <Image 
            // Pastikan nama file ini sesuai dengan gambar yang kamu simpan di folder public
            src="/bkgron.png" 
            alt="Ceramic Craft Group Background" 
            fill 
            style={{ objectFit: 'cover', objectPosition: 'center' }} 
            priority 
          />
        </div>

        {/* Area Konten Teks */}
        <div className="relative z-10 max-w-7xl mx-auto px-10 md:px-20 w-full flex items-center">
          <div className="max-w-xl md:w-1/2">
            <h1 className="text-5xl md:text-6xl font-serif text-[#1F2937] mb-6 leading-[1.1]">
              JELAJAHI <br/> KARYA LOKAL.
            </h1>
            <p className="text-gray-700 mb-10 max-w-md text-sm md:text-base leading-relaxed">
              Menghubungkan Mahasiswa Inovatif dan UMKM Desa Melalui Technopreneurship.
            </p>
            <button className="bg-[#B07D60] text-white px-10 py-3 rounded-md font-medium text-sm hover:bg-[#8D6E63] transition-colors shadow-md">
              MULAI EKSPLORASI
            </button>
          </div>
        </div>
      </section>

     {/* --- 2. KATEGORI PRODUK (DENGAN KOTAK BORDER EKSKLUSIF) --- */}
      <section className="py-12 px-6 md:px-20 max-w-7xl mx-auto mt-4">
        
        {/* Kotak Pembungkus (Container Box) */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-6 md:p-10">
          
          <h2 className="text-xl md:text-2xl text-gray-900 mb-8 font-serif border-b border-gray-100 pb-4">
            Kategori Jelajah
          </h2>
          
          {/* Grid Kategori */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-y-8 gap-x-2 md:gap-4">
            {[
              { id: 1, name: 'Gerabah & Kriya', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=200' },
              { id: 2, name: 'Tenun & Batik', img: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=200' },
              { id: 3, name: 'Tas Artisan', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=200' },
              { id: 4, name: 'Inovasi Kampus', img: 'https://images.unsplash.com/photo-1527443195645-1138f7929fac?q=80&w=200' },
              { id: 5, name: 'Dekorasi Rumah', img: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=200' },
              { id: 6, name: 'Aksesoris', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200' },
              { id: 7, name: 'Kopi & Rempah', img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=200' },
              { id: 8, name: 'Daur Ulang', img: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?q=80&w=200' },
            ].map((cat) => (
              <div key={cat.id} className="flex flex-col items-center group cursor-pointer">
                
                {/* Lingkaran Gambar */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] bg-[#F5F2ED] rounded-full mb-3 overflow-hidden border border-gray-100 group-hover:border-[#B07D60] group-hover:shadow-md transition-all duration-300 relative">
                   <Image 
                      src={cat.img} 
                      alt={cat.name} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                      className="group-hover:scale-110 transition-transform duration-700"
                    />
                </div>
                
                {/* Teks Kategori */}
                <span className="text-[10px] md:text-xs text-center font-medium text-gray-700 group-hover:text-[#B07D60] transition-colors leading-tight px-1 max-w-[80px] md:max-w-full">
                  {cat.name}
                </span>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- 3. PRODUK PILIHAN TERKURASI (Ini yang tadi hilang) --- */}
      <section className="pb-20 px-10 md:px-20 max-w-7xl mx-auto">
         <h2 className="text-2xl text-gray-900 mb-6 font-serif">Produk Pilihan Terkurasi</h2>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { id: 1, title: 'Woven Bag', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400', price: 'Rp 450.000' },
              { id: 2, title: 'Hand-Painted Textiles', img: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=400', price: 'Rp 450.000' },
              { id: 3, title: 'Innovative Student Gadget', img: 'https://images.unsplash.com/photo-1527443195645-1138f7929fac?q=80&w=400', price: 'Rp 450.000' },
              { id: 4, title: 'Art Print', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400', price: 'Rp 450.000' }
            ].map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="w-full h-64 rounded-2xl overflow-hidden relative mb-4 bg-gray-100">
                  <Image 
                    src={product.img} 
                    alt={product.title} 
                    fill 
                    style={{ objectFit: 'cover' }} 
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <h3 className="font-bold text-gray-900 text-sm mb-1">{product.title}</h3>
                
                <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-1">
                  Verified Creators 
                  <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <p className="font-bold text-[#B07D60] text-sm mt-1">{product.price}</p>
              </div>
            ))}
         </div>
      </section>

      
    </div>
  );
}