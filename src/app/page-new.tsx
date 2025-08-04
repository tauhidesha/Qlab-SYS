"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import promoBundling from '../data/promoBundling';
import { event as trackEvent } from '@/lib/fpixel';
import * as gtag from '@/lib/gtag';
import Link from 'next/link';

// Import new landing page components
import EnhancedHero from '@/components/landing/EnhancedHero';
import ProblemSolutionSection from '@/components/landing/ProblemSolutionSection';
import ProcessSection from '@/components/landing/ProcessSection';
import EnhancedTestimonials from '@/components/landing/EnhancedTestimonials';
import ValuePropositionSection from '@/components/landing/ValuePropositionSection';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Track page view on component mount
  useEffect(() => {
    // Google Analytics page view
    gtag.event('page_view', {
      event_category: 'engagement',
      event_label: 'home_page',
    });
  }, []);

  const handleFaqClick = (index: number, question: string) => {
    setOpenFaq(openFaq === index ? null : index);
    
    // Track FAQ interactions
    gtag.event('faq_click', {
      event_category: 'engagement',
      event_label: `faq_${index}_${question.substring(0, 30)}`,
    });
  };

  const handleWhatsAppClick = () => {
    // Facebook Pixel tracking
    trackEvent('Contact', {
      content_name: 'Enhanced Landing Page CTA',
      content_category: 'WhatsApp',
    });
    
    // Google Analytics tracking
    gtag.event('contact_whatsapp', {
      event_category: 'engagement',
      event_label: 'enhanced_landing_page',
    });
    
    const message = "Halo Bosmat! Saya tertarik dengan layanan repaint motor. Bisa konsultasi gratis?";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=62895401527556&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Enhanced Hero Section */}
      <EnhancedHero onCtaClick={handleWhatsAppClick} />
      
      {/* Problem-Solution Framework */}
      <ProblemSolutionSection onCtaClick={handleWhatsAppClick} />
      
      {/* Process Explanation */}
      <ProcessSection onCtaClick={handleWhatsAppClick} />
      
      {/* Enhanced Testimonials */}
      <EnhancedTestimonials onCtaClick={handleWhatsAppClick} />
      
      {/* Value Proposition */}
      <ValuePropositionSection onCtaClick={handleWhatsAppClick} />

      {/* Legacy Content - Gallery, Pricing & Additional Sections */}
      <main className="max-w-screen-sm bg-white rounded-xl shadow-lg mx-auto px-5 py-6 mt-6 text-gray-900 leading-relaxed text-sm relative">
        {/* Admin Link */}
        <Link 
          href="/login" 
          className="absolute top-4 right-4 text-xs text-gray-500 hover:text-gray-700 transition-colors z-20"
        >
          Admin
        </Link>
        
        {/* Logo */}
        <div className="w-[100px] mx-auto mb-6">
          <Image src="/images/logo-bosmat.webp" alt="Logo Bosmat" width={500} height={500} className="w-full h-auto" />
        </div>

        {/* Portfolio Gallery */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">📸 Portfolio Transformation</h3>
          <p className="text-center text-gray-600 mb-6">
            500+ motor yang udah transform jadi ganteng maksimal. Motor lo selanjutnya!
          </p>
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
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
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
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 mb-4">
              ➡️ Dari motor kusam jadi ganteng paripurna. Baret? Hilang. Kusam? Kinclong lagi!
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
              </svg>
              Lihat Motor Lo Transform
            </button>
          </div>
        </section>

        {/* Quick Benefits */}
        <section className="mb-8">
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

        {/* Scarcity/Slot Promo */}
        <section className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 mb-3">
            <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              SISA SLOT PROMO: <span className="font-extrabold">7</span> / 15
            </span>
            <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-400 to-green-400 rounded-full" style={{ width: '47%' }}></div>
            </div>
            <span className="text-xs text-gray-500">Slot promo terbatas, amankan sekarang!</span>
          </div>
        </section>

        {/* Promo Bundling */}
        <section className="mb-10">
          <h3 className="text-xl font-bold mb-6 text-center text-gray-900">🔥 Promo Bundling Hemat Maksimal</h3>
          <div className="space-y-4">
            {promoBundling.map((item, index) => {
              return (
                <div key={index} className="border rounded-lg p-4 shadow-md bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-900">
                        Paket {item.repaintSize} - Repaint + Detailing
                      </h4>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
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

        {/* FAQ */}
        <section className="mb-10">
          <h3 className="text-xl font-bold mb-6 text-center text-gray-900">🤔 Masih Ragu? Cek FAQ</h3>
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
                  onClick={() => handleFaqClick(i, faq.q)}
                  className="w-full text-left p-3 font-semibold flex justify-between items-center hover:bg-gray-50"
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
          <h3 className="text-xl font-bold mb-6 text-center text-gray-900">📍 Lokasi Workshop</h3>
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
        <section className="text-center mb-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">
              Udah Siap Bikin Motor Lo Jadi Pusat Perhatian? 🚀
            </h3>
            <p className="mb-6">
              Jangan tunda lagi, slot promo terbatas! Konsultasi gratis sekarang via WhatsApp.
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
              </svg>
              Amankan Slot Premium Sekarang!
            </button>
          </div>
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
