"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import promoBundling from '../data/promoBundling';
import { event as trackEvent } from '@/lib/fpixel';
import Link from 'next/link';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleWhatsAppClick = () => {
    trackEvent('Contact', {
      content_name: 'Promo Repaint Bundling',
      content_category: 'WhatsApp',
    });
    const message = "Halo Bosmat, saya tertarik dengan promo repaint bundling. Bisa minta info lebih lanjut?";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=628128Bosmat&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <main className="max-w-screen-sm bg-white rounded-xl shadow-lg mx-auto px-5 py-6 mt-6 text-gray-900 leading-relaxed text-sm relative">
        {/* Admin Link */}
        <Link 
          href="/login" 
          className="absolute top-4 right-4 text-xs text-gray-500 hover:text-gray-700 transition-colors z-20"
        >
          Admin
        </Link>
        
        {/* Logo */}
        {/* ...rest of your content... */}
        <div className="w-[100px] mx-auto mb-4">
          <Image src="/images/logo-bosmat.webp" alt="Logo Bosmat" width={500} height={500} className="w-full h-auto" />
        </div>

        {/* Gradient Background for Hero */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-yellow-100 to-transparent rounded-t-xl z-0"></div>
        {/* Hook */}
        <section className="mb-6 text-center relative z-10">
          <h1 className="text-2xl font-extrabold text-yellow-500 drop-shadow-lg">Motor Kusam? Baret? Udah Gak Cakep?</h1>
          <p className="text-base font-semibold mt-1">Bosmat Bikin Kinclong Lagi Tanpa Ribet!</p>
          <p className="text-sm mt-1">Full repaint + detailing luar dalam, hasil ganteng maksimal. Bebas pilih warna, garansi puas.</p>
          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full mt-3 font-bold shadow-lg hover:bg-green-700 transition-transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" className="inline-block"><path fill="#fff" d="M16 2C8.268 2 2 8.268 2 16c0 7.732 6.268 14 14 14s14-6.268 14-14C30 8.268 23.732 2 16 2zm0 26c-6.627 0-12-5.373-12-12S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12zm-1.5-7.5c-.276 0-.526-.112-.707-.293l-3.5-3.5a1 1 0 011.414-1.414l2.793 2.793 6.793-6.793a1 1 0 111.414 1.414l-7.5 7.5a.997.997 0 01-.707.293z"/></svg>
            Chat Bosmat Sekarang
          </button>
        </section>
        <div className="border-t border-gray-200 my-6"></div>

        {/* Review Pelanggan */}
        <section className="mb-10">
          <h3 className="text-base font-bold mb-3 text-center text-green-700 flex items-center justify-center gap-2">
            <span className="inline-block"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-700"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" /></svg></span>💬 Review Pelanggan
          </h3>
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
        {/* Hasil Kerjaan Bosmat */}
        <section className="mb-10">
          <h3 className="text-base font-semibold mb-3 text-center">📸 Hasil Kerjaan Bosmat</h3>
          <Slider
            dots={false}
            infinite
            speed={500}
            autoplay
            autoplaySpeed={4000}
            slidesToShow={2}
            slidesToScroll={1}
          >
            {Array.from({ length: 45 }).map((_, i) => (
              <div key={i} className="px-1">
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md shadow-lg">
                  <Image
                    src={`/images/hasil/hasil-${i + 1}.webp`}
                    alt={`Hasil ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </Slider>
          <div className="text-center mt-4">
            <p className="text-sm">➡️ Dari motor kusam jadi ganteng paripurna bro. Baret? Hilang. Kusam? Kinclong lagi!</p>
            <button
              onClick={handleWhatsAppClick}
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-full mt-3 font-bold shadow-lg hover:bg-green-700 transition-transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" className="inline-block"><path fill="#fff" d="M16 2C8.268 2 2 8.268 2 16c0 7.732 6.268 14 14 14s14-6.268 14-14C30 8.268 23.732 2 16 2zm0 26c-6.627 0-12-5.373-12-12S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12zm-1.5-7.5c-.276 0-.526-.112-.707-.293l-3.5-3.5a1 1 0 011.414-1.414l2.793 2.793 6.793-6.793a1 1 0 111.414 1.414l-7.5 7.5a.997.997 0 01-.707.293z"/></svg>
              Chat Bosmat Sekarang
            </button>
          </div>
        </section>
        {/* Scarcity/Kuota Promo Section */}
        {/* Benefit/Checklist Ringkas Section */}
        <section className="mb-6">
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-3 py-1 text-green-700 text-xs font-semibold shadow-sm">
              <span className="text-green-500 text-base">✅</span> Bebas pilih warna
            </div>
            <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-blue-700 text-xs font-semibold shadow-sm">
              <span className="text-blue-500 text-base">🛡️</span> Garansi 30 hari
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 rounded-full px-3 py-1 text-yellow-700 text-xs font-semibold shadow-sm">
              <span className="text-yellow-500 text-base">🚚</span> Pickup Service
            </div>
            <div className="flex items-center gap-1 bg-purple-50 border border-purple-200 rounded-full px-3 py-1 text-purple-700 text-xs font-semibold shadow-sm">
              <span className="text-purple-500 text-base">💳</span> Bisa Cicilan
            </div>
            <div className="flex items-center gap-1 bg-pink-50 border border-pink-200 rounded-full px-3 py-1 text-pink-700 text-xs font-semibold shadow-sm">
              <span className="text-pink-500 text-base">🎨</span> Cat PU & Clear HS
            </div>
          </div>
        </section>
        <section className="text-center mt-10 mb-6">
          <div className="flex flex-col items-center gap-2 mb-3">
            <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">SISA SLOT PROMO: <span className="font-extrabold">7</span> / 15</span>
            <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-400 to-green-400 rounded-full" style={{ width: '47%' }}></div>
            </div>
            <span className="text-xs text-gray-500">Slot promo terbatas, amankan sekarang!</span>
          </div>
          <p className="text-base font-semibold">🚀 SIAPIN MOTOR LO BUAT TAMPIL GANTENG?</p>
          <button
            onClick={handleWhatsAppClick}
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-full mt-3 font-bold"
          >
            Chat Bosmat Sekarang
          </button>
        </section>

        {/* Apa Aja yang Didapat */}
        <section className="mb-10">
          <h3 className="text-base font-semibold mb-3 text-center">🎓 Apa Aja yang Didapat?</h3>
          <ul className="space-y-2 text-sm list-inside list-none bg-gray-50 p-4 rounded-lg border shadow-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✅</span>
              <span><strong>Full Repaint:</strong> Pengerokan total, dempul presisi, dan pengecatan bodi halus untuk hasil maksimal.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✅</span>
              <span><strong>Pilih Warna Bebas:</strong> Kreasikan gayamu! Bebas pilih warna custom, candy, hingga bunglon.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✅</span>
              <span><strong>Full Detailing Luar Dalam:</strong> Membersihkan rangka, mesin, jok, dan area kolong motor sampai kinclong.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✅</span>
              <span><strong>Kilap Awet & Terlindungi:</strong> Finishing dengan coating premium yang tahan cuaca dan bikin kilap tahan lama.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✅</span>
              <span><strong>Pickup Service (Opsional):</strong> Gak sempat antar motor? Tenang, tim kami bisa jemput ke lokasi kamu.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✅</span>
              <span><strong>Bisa Dicicil:</strong> Gantengin motor jadi lebih ringan dengan opsi pembayaran via Tokopedia.</span>
            </li>
          </ul>
        </section>

        {/* Harga Bundling Promo */}
        <section className="mb-10">
          <h3 className="text-xl font-bold mb-3 text-center text-yellow-600 drop-shadow">💥 Harga Bundling Promo</h3>
          <div className="space-y-4">
            {promoBundling.map((item) => {
              // Motor populer per size (edit sesuai kebutuhan)
              const populerPerSize = {
                S: ['Beat', 'Supra', 'Mio', 'Revo', 'Vega', 'Jupiter Z'],
                M: ['Vario', 'Nmax', 'Lexi', 'Scoopy', 'Fino', 'Aerox'],
                L: ['PCX', 'ADV', 'Grand Filano', 'X-Ride', 'Satria', 'Alva One'],
                XL: ['CB 150R', 'R15', 'CBR 150R', 'Ninja 250 FI', 'XMAX', 'MX King'],
              };
              const motors = populerPerSize[item.repaintSize] || [];
              return (
                <div
                  key={item.repaintSize}
                  className={`p-4 rounded-xl shadow-lg border relative overflow-hidden bg-white border-gray-200 transition-transform hover:scale-105`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg">{item.repaintSize}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {motors.map((motor) => (
                          <span key={motor} className="inline-block bg-gray-200 text-gray-700 text-[11px] px-2 py-0.5 rounded-full">
                            {motor}
                          </span>
                        ))}
                      </div>
                      {item.description && (
                        <p className="text-[11px] text-gray-400 mt-1">{item.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">Rp {item.promoPrice.toLocaleString('id-ID')}</p>
                      <p className="text-sm text-gray-500">
                        <s>Rp {item.normalPrice.toLocaleString('id-ID')}</s>
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-dashed">
                    <span className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full animate-pulse">
                      ✨ Hemat Rp {item.savings.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="mb-10">
          <h3 className="text-base font-semibold mb-3 text-center">🤔 Masih Ragu? Cek FAQ</h3>
          <div className="space-y-2">
            {[
              { q: 'Berapa lama pengerjaannya?', a: 'Estimasi 7-14 hari kerja, tergantung antrian dan tingkat kesulitan.' },
              { q: 'Ada garansi?', a: 'Tentu! Garansi 30 hari meliputi cat mengelupas atau pudar. Kepuasan lo prioritas.' },
              { q: 'Bisa jemput motor?', a: 'Bisa banget! Kita ada layanan pickup service buat area Depok dan sekitarnya.' },
              { q: 'Pakai cat apa?', a: 'Kita pakai cat PU (Polyurethane) kualitas premium dan clear coat High Solid (HS) biar awet dan kinclong maksimal.' },
              { q: 'Bisa bayar cicilan?', a: 'Bisa! Kita sediakan opsi cicilan biar lo makin gampang gantengin motor.' },
            ].map((faq, i) => (
              <div key={i} className="border rounded-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-3 font-semibold flex justify-between items-center"
                >
                  {faq.q}
                  <span className={`transform transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaq === i && (
                  <div className="p-3 bg-gray-50 border-t">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Lokasi & Peta */}
        <section className="mb-10">
          <h3 className="text-base font-semibold mb-3 text-center">📍 Lokasi Workshop</h3>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.874920832908!2d106.85148927429844!3d-6.371565193618636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed2a27f69c6d%3A0x4a2b0d84aea6a7bd!2sBosmat%20Repaint%20Detailing%20Motor!5e1!3m2!1sid!2sid!4v1752412961847!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="text-center mt-3">
            <p className="font-semibold">Bosmat Repaint Detailing Motor</p>
            <p className="text-xs text-gray-600">Bukit Cengkeh 1, Jl. Medan No.B3/2, Kota Depok, Jawa Barat 16451</p>
            <a
              href="https://maps.app.goo.gl/yDZfpyyRBHv4LyRe8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm mt-1 inline-block"
            >
              Buka di Google Maps
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center mt-10 mb-6">
          <h3 className="text-xl font-bold">Udah Siap Bikin Motor Lo Jadi Pusat Perhatian?</h3>
          <p className="mt-2">Jangan tunda lagi, slot promo terbatas! Klik tombol di bawah buat konsultasi gratis via WhatsApp.</p>
          <button
            onClick={handleWhatsAppClick}
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-full mt-4 font-bold text-lg shadow-xl hover:bg-green-700 transition-transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" className="inline-block mr-2"><path fill="#fff" d="M16 2C8.268 2 2 8.268 2 16c0 7.732 6.268 14 14 14s14-6.268 14-14C30 8.268 23.732 2 16 2zm0 26c-6.627 0-12-5.373-12-12S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12zm-1.5-7.5c-.276 0-.526-.112-.707-.293l-3.5-3.5a1 1 0 011.414-1.414l2.793 2.793 6.793-6.793a1 1 0 111.414 1.414l-7.5 7.5a.997.997 0 01-.707.293z"/></svg>
            Amankan Slot Promo Sekarang!
          </button>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-500 mt-10 border-t pt-4">
          <p>&copy; {new Date().getFullYear()} Bosmat Auto Garage. Repaint & Detailing Specialist.</p>
          <p>Depok, Jawa Barat.</p>
        </footer>
      </main>
    </>
  );
}
