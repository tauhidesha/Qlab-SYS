'use client'

import Slider from 'react-slick'
import Image from 'next/image'
import * as fpixel from '@/lib/fpixel'

type BundlingItem = {
  label: string;
  desc: string;
  before: string;
  after: string;
  hemat: string;
  populer?: boolean;
  note?: string;
};

const promoBundling: BundlingItem[] = [
  {
    label: 'S',
    desc: 'beat, supra, revo, mio, vega, jupiter z',
    before: '1.450.000',
    after: '1.200.000',
    hemat: '250rb'
  },
  {
    label: 'M',
    desc: 'vario, lexi, scoopy, fino, aerox, fazzio, nmax',
    before: '1.800.000',
    after: '1.499.000',
    hemat: '301rb',
    populer: true
  },
  {
    label: 'L',
    desc: 'pcx, adv, alva one, satria 120r, astrea grand, c70',
    before: '1.950.000',
    after: '1.650.000',
    hemat: '300rb'
  },
  {
    label: 'XL',
    desc: 'cb 150r, r15, cbr 150r, ninja 250 fi, xmax, mx king',
    before: '2.550.000',
    after: '2.200.000',
    hemat: '350rb',
    note: '⚠️ Detailing hanya tersedia sampai ukuran L. XL khusus untuk matic besar dan sport 250cc, bukan moge 400cc ke atas.'
  }
];

export default function Home() {
  const handleWhatsAppClick = () => {
    console.log('Meta Pixel Event: Contact Triggered');

    fpixel.event('Contact', {
      content_name: 'Chat via WhatsApp',
      content_category: 'Landing Page CTA',
    });

    const message = encodeURIComponent(
      'Halo Kak Zoya, Tertarik promo bundling repaint. Motornya .... (isi dengan motor mu)'
    );
    window.open(`https://wa.me/62895401527556?text=${message}`, '_blank');
  };

  return (
    <main className="max-w-screen-sm bg-white rounded-xl shadow-lg mx-auto px-5 py-6 mt-6 text-gray-900 leading-relaxed text-sm">
      {/* Logo */}
      <div className="w-[100px] mx-auto mb-4">
        <Image src="/images/logo-bosmat.webp" alt="Logo Bosmat" width={500} height={500} className="w-full h-auto" />
      </div>

      {/* Hook */}
      <section className="mb-6 text-center">
        <h1 className="text-xl font-bold text-yellow-500">Motor Kusam? Baret? Udah Gak Cakep?</h1>
        <p className="text-base font-semibold mt-1">Bosmat Bikin Kinclong Lagi Tanpa Ribet!</p>
        <p className="text-sm mt-1">Full repaint + detailing luar dalam, hasil ganteng maksimal. Bebas pilih warna, garansi puas.</p>
        <button
          onClick={handleWhatsAppClick}
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-full mt-3 font-bold"
        >
          Chat Bosmat Sekarang
        </button>
      </section>

      {/* Review Pelanggan */}
      <section className="mb-10">
        <h3 className="text-base font-semibold mb-3 text-center">💬 Review Pelanggan</h3>
        <Slider
          dots={false}
          infinite
          speed={500}
          autoplay
          autoplaySpeed={4000}
          arrows={false}
          slidesToShow={1}
          slidesToScroll={1}
          pauseOnHover
          adaptiveHeight
        >
          {[
            "“Gue kira nggak bakal sebagus itu, ternyata kinclong banget! Warna doff-nya cakep parah!” — Andi, Depok",
            "“Awalnya cuma iseng repaint, eh malah jadi langganan. Detail banget kerjaannya!” — Putra, Cibubur",
            "“Nggak nyangka NMAX gue bisa balik kinclong gitu. Udah kek motor baru!” — Rizky, Sawangan",
            "“Pelayanan ramah, hasil presisi. Worth every rupiah bro!” — Dimas, Cinere",
            "“Detailingnya sampe kolong bersih. Gue sampe nggak tega make motornya wkwk.” — Bagas, Bekasi",
            "“Warnanya bisa request bebas, hasilnya rapih. Bosmat emang bukan kaleng-kaleng.” — Yusuf, Cipayung",
            "“Baru nyampe rumah langsung banyak yang nanya, repaint di mana bang? Hahaha.” — Rian, Tapos",
            "“Pernah nyoba tempat lain, tapi paling puas emang di Bosmat.” — Fajar, Limo",
            "“Udah 3x repaint di sini. Selalu puas sama hasilnya. Lo wajib coba sih.” — Aldi, Cilangkap",
            "“Gue suka banget sama hasil polesnya, baret halus ilang semua.” — Fikri, Cimanggis",
          ].map((text, i) => (
            <div key={i}>
              <div className="bg-gray-50 p-4 rounded-md border shadow-sm text-sm text-center leading-snug mx-4">
                <p>🗣️ <em>{text}</em></p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Hasil Kerjaan */}
      <section className="mb-10">
        <h3 className="text-base font-semibold mb-3 text-center">📸 Hasil Kerjaan Bosmat</h3>
        <Slider
          dots
          infinite
          speed={500}
          slidesToShow={2}
          slidesToScroll={2}
          responsive={[
            { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
          ]}
        >
          {Array.from({ length: 45 }).map((_, i) => (
            <div key={i} className="px-1">
              <div className="relative w-full pt-[133%] overflow-hidden rounded-md">
                <Image
                  src={`/images/hasil/hasil-${i + 1}.webp`}
                  alt={`Hasil ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </Slider>
        <div className="text-center mt-4">
          <p className="text-sm">➡️ Dari motor kusam jadi ganteng paripurna bro. Baret? Hilang. Kusam? Kinclong lagi!</p>
          <button
            onClick={handleWhatsAppClick}
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-full mt-3 font-bold"
          >
            Chat Bosmat Sekarang
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-6">
        <h3 className="text-base font-semibold mb-2">✨ Apa Aja yang Lo Dapet?</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>🔧 Cat ulang full body – warna bisa request</li>
          <li>🎨 Finishing doff atau glossy</li>
          <li>🧼 Detailing mesin, kolong, bodi, poles lengkap</li>
          <li>🛠️ Teknik oven, masking rapi, hasil presisi</li>
          <li>💯 Garansi puas – revisi kalau ada kurang</li>
          <li>📷 Before-after dokumentasi (bisa request)</li>
        </ul>
      </section>

      {/* How It Works */}
      <section className="mb-6">
        <h3 className="text-base font-semibold mb-2">⚙️ Gimana Prosesnya?</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Chat via WhatsApp</li>
          <li>Diskusi kondisi & warna yang lo mau</li>
          <li>Booking jadwal & bawa motor</li>
          <li>Tunggu kabar motor lo jadi ganteng lagi</li>
        </ol>
      </section>

      {/* Urgency */}
      <section className="mb-6 text-center">
        <p className="text-red-600 font-semibold animate-pulse">⚠️ Promo hanya untuk 10 motor pertama tiap bulan!</p>
      </section>

      {/* FAQ */}
      <section className="mb-6">
        <h3 className="text-base font-semibold mb-2">❓ Pertanyaan Umum (FAQ)</h3>
        <div className="space-y-3">
          <div className="border-b pb-2">
            <p><strong>T:</strong> Bisa pilih warna sendiri?</p>
            <p><strong>J:</strong> Aman bro! Bebas request warna, kita diskusiin sampe ketemu yang pas.</p>
          </div>
          <div className="border-b pb-2">
            <p><strong>T:</strong> Bisa repaint sebagian aja (nyicil)?</p>
            <p><strong>J:</strong> Bisa banget, tapi harga promo bundling ini khusus untuk full repaint. Kalau mau sebagian, harga menyesuaikan ya.</p>
          </div>
          <div>
            <p><strong>T:</strong> Berapa lama pengerjaannya?</p>
            <p><strong>J:</strong> Tergantung kondisi dan antrian, rata-rata sekitar 3–7 hari kerja biar hasilnya maksimal.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center mt-10 space-y-3">
        <p className="text-base font-semibold">🚀 SIAPIN MOTOR LO BUAT TAMPIL GANTENG?</p>
        <button
          onClick={handleWhatsAppClick}
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-full mt-3 font-bold"
        >
          Chat Bosmat Sekarang
        </button>
      </section>

      {/* Footer */}
      <footer className="text-xs text-gray-500 mt-10 border-t pt-4 text-center">
        © 2025 Bosmat Detailing & Repainting Studio | Cimanggis, Depok | Jam buka: 09.00–17.00 (by booking only)
      </footer>
    </main>
  );
}
