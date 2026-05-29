import React from 'react';

export default function SyaratKetentuanPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-gray-900 py-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-100 pb-6">Syarat & Ketentuan</h1>
        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
          <p>Selamat datang di Galeri Kreatif. Dengan menggunakan platform ini, Anda menyetujui syarat dan ketentuan berikut:</p>
          <h3 className="font-bold text-gray-900 text-base mt-6">1. Transaksi & Pembayaran</h3>
          <p>Semua harga yang tercantum adalah dalam Rupiah (IDR). Pembayaran dianggap sah apabila telah diverifikasi oleh sistem payment gateway kami atau melalui unggahan bukti transfer manual yang valid.</p>
          <h3 className="font-bold text-gray-900 text-base mt-6">2. Kebijakan Pengiriman</h3>
          <p>Barang kerajinan UMKM diproses langsung dari desa mitra kami. Estimasi waktu pengiriman bergantung pada lokasi pengrajin dan alamat tujuan Anda. Segala kerusakan selama pengiriman yang bukan kelalaian pihak logistik dapat diklaim maksimal 1x24 jam sejak barang diterima.</p>
          <h3 className="font-bold text-gray-900 text-base mt-6">3. Hak Kekayaan Intelektual</h3>
          <p>Seluruh foto produk, deskripsi, dan desain antarmuka platform ini merupakan karya mahasiswa SI UNAS dan dilindungi undang-undang.</p>
        </div>
      </div>
    </div>
  );
}