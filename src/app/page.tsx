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
import InteractivePricingCalculator from '@/components/landing/InteractivePricingCalculator';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [promoSlots, setPromoSlots] = useState(7); // Dynamic slot count
  const [timeLeft, setTimeLeft] = useState('');
  const [socialProof, setSocialProof] = useState({ name: '', action: '', time: '', visible: false });

  // Photo Management System - Easy to update with Google Business photos
  const photos = {
    hero: "/images/hasil/hasil-43.webp", // Main hero image - Google Business photo
    beforeAfter: [
      {
        before: "/images/hasil/hasil-3.webp", // Before image
        after: "/images/hasil/hasil-4.webp",  // After image  
        title: "Honda Vario"
      },
      {
        before: "/images/hasil/nmax-before-1.webp", // NMAX before - kondisi kusam
        after: "/images/hasil/nmax-after-1.webp",   // NMAX after - hasil repaint
        title: "Yamaha NMAX"
      },
      {
        before: "/images/hasil/hasil-9.webp",
        after: "/images/hasil/hasil-10.webp",
        title: "Honda PCX"
      }
    ],
    testimonials: [
      "/images/hasil/hasil-4.webp",
      "/images/hasil/hasil-5.webp", 
      "/images/hasil/hasil-6.webp"
    ],
    portfolio: [
      "/images/hasil/hasil-7.webp",
      "/images/hasil/hasil-8.webp",
      "/images/hasil/hasil-9.webp", 
      "/images/hasil/hasil-10.webp",
      "/images/hasil/hasil-11.webp",
      "/images/hasil/hasil-12.webp",
      "/images/hasil/hasil-13.webp",
      "/images/hasil/hasil-14.webp"
    ]
  };

  // Social proof data
  const socialProofData = [
    { name: 'Budi S.', action: 'baru saja booking paket M', time: '2 menit lalu' },
    { name: 'Andi P.', action: 'memilih cat bunglon untuk Vario', time: '5 menit lalu' },
    { name: 'Sari M.', action: 'booking pickup service', time: '8 menit lalu' },
    { name: 'Dedi R.', action: 'konsultasi via WhatsApp', time: '12 menit lalu' },
    { name: 'Lina K.', action: 'booking paket XL', time: '15 menit lalu' },
    { name: 'Rizki A.', action: 'pilih cicilan Tokopedia', time: '18 menit lalu' },
  ];

  // Track page view on component mount
  useEffect(() => {
    // Google Analytics page view
    gtag.event('page_view', {
      event_category: 'engagement',
      event_label: 'home_page',
    });

    // Dynamic slot countdown (simulates real bookings)
    const slotTimer = setInterval(() => {
      const now = new Date();
      const minute = now.getMinutes();
      // Decrease slots based on time (simulated bookings)
      const dynamicSlots = Math.max(3, 7 - Math.floor(minute / 10));
      setPromoSlots(dynamicSlots);
    }, 60000); // Update every minute

    // Countdown timer for urgency
    const countdownTimer = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const timeDiff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    // Social proof notifications
    const socialProofTimer = setInterval(() => {
      const randomProof = socialProofData[Math.floor(Math.random() * socialProofData.length)];
      setSocialProof({ ...randomProof, visible: true });
      
      // Hide after 4 seconds
      setTimeout(() => {
        setSocialProof(prev => ({ ...prev, visible: false }));
      }, 4000);
    }, 8000); // Show every 8 seconds

    return () => {
      clearInterval(slotTimer);
      clearInterval(countdownTimer);
      clearInterval(socialProofTimer);
    };
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
      {/* Social Proof Notification */}
      {socialProof.visible && (
        <div className="fixed bottom-6 left-6 z-50 bg-white border border-green-200 rounded-lg shadow-lg p-4 max-w-sm animate-in slide-in-from-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm">👤</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{socialProof.name}</p>
              <p className="text-xs text-gray-600">{socialProof.action}</p>
              <p className="text-xs text-green-600">{socialProof.time}</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Simplified Hero with Visual Impact */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-green-50 pt-6 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Logo */}
          <div className="w-24 mx-auto mb-6">
            <Image 
              src="/images/logo-bosmat.webp" 
              alt="Bosmat Studio" 
              width={200} 
              height={200} 
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Headlines & CTA */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Motor Kusam Jadi{' '}
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  GANTENG MAKSIMAL
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Repaint + Detailing Premium dalam 7 hari. 
                <span className="font-semibold text-gray-800"> Garansi 30 hari!</span>
              </p>

              {/* Quick Benefits */}
              <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">✅ Bebas Pilih Warna</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">🚚 Pickup Service</span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">💳 Bisa Cicilan</span>
              </div>

              {/* CTA */}
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
                </svg>
                Konsultasi Gratis
              </button>
            </div>

            {/* Right: Hero Visual */}
            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src={photos.hero}
                  alt="Hasil Repaint Premium"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-2xl shadow-2xl"
                  priority
                />
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  ⭐ 500+ Motor
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Visual Section - Simplified */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">✨ Transformasi Nyata</h2>
          
          {/* 3 Column Before/After */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {photos.beforeAfter.map((item, i) => (
              <div key={i} className="relative group bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  {/* Before */}
                  <div className="absolute inset-0 transition-opacity duration-1000 group-hover:opacity-0">
                    <Image
                      src={item.before}
                      alt={`Before ${item.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover filter brightness-75 sepia"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      BEFORE
                    </div>
                  </div>
                  
                  {/* After */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
                    <Image
                      src={item.after}
                      alt={`After ${item.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                      AFTER
                    </div>
                  </div>
                </div>
                
                <div className="p-4 text-center">
                  <p className="font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600">Hover untuk lihat hasil</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-all"
            >
              Lihat Lebih Banyak Hasil
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Pricing Calculator */}
      <InteractivePricingCalculator onCtaClick={handleWhatsAppClick} />

      {/* Key Benefits Section */}
      <section className="py-12 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kenapa Bosmat <span className="text-green-500">Worth Every Penny?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lebih dari sekedar repaint. Ini tentang memberikan value terbaik dengan kualitas premium yang bikin motor lo jadi investment, bukan expense.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Kualitas Premium</h3>
                <p className="text-sm text-gray-500 font-medium">Cat PU + Clear HS Grade A</p>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 text-center">
                Material berkualitas internasional yang tahan 3x lebih lama dari cat biasa. Warna tidak mudah pudar dan anti gores ringan.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm text-gray-700">Cat premium yang awet 5+ tahun</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm text-gray-700">Finish glossy seperti motor baru</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm text-gray-700">Anti UV dan weatherproof</span>
                </li>
              </ul>

              <div className="bg-blue-500 text-white text-center py-3 px-4 rounded-xl text-sm font-medium">
                ⭐ Garansi 30 hari tertulis
              </div>
            </div>

            {/* Speed */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Service Super Fast</h3>
                <p className="text-sm text-gray-500 font-medium">7-14 hari kerja, bukan bulanan</p>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 text-center">
                Proses optimized dengan teknologi modern. Tim berpengalaman 10+ tahun yang paham waktu customer yang berharga.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm text-gray-700">Pickup & delivery gratis area JKT</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm text-gray-700">Progress update harian via foto</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm text-gray-700">No delay, tepat waktu guaranteed</span>
                </li>
              </ul>

              <div className="bg-purple-500 text-white text-center py-3 px-4 rounded-xl text-sm font-medium">
                ⭐ Same day pickup available
              </div>
            </div>

            {/* Value */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Value Terdepan</h3>
                <p className="text-sm text-gray-500 font-medium">Premium quality, competitive price</p>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 text-center">
                Harga transparan dengan kualitas yang gak pernah mengecewakan. ROI terbaik untuk investasi motor lo.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm text-gray-700">Harga all-in, no hidden cost</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm text-gray-700">Free konsultasi & estimasi</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm text-gray-700">Payment flexible (cash/transfer)</span>
                </li>
              </ul>

              <div className="bg-green-500 text-white text-center py-3 px-4 rounded-xl text-sm font-medium">
                ⭐ 30% lebih murah dari kompetitor
              </div>
            </div>
          </div>

          {/* ROI Benefits */}
          <div className="mt-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ROI Calculator: <span className="text-green-500">Investasi Cerdas!</span>
              </h3>
              <p className="text-gray-600">
                Repaint premium di Bosmat = investasi yang menguntungkan long term
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="text-3xl mb-3">💰</div>
                <h4 className="font-bold text-gray-900 mb-2">Harga Jual Motor</h4>
                <p className="text-2xl font-bold text-green-600 mb-2">+15-25%</p>
                <p className="text-sm text-gray-600">
                  Motor dengan cat bagus harga jualnya jauh lebih tinggi
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="text-3xl mb-3">⏰</div>
                <h4 className="font-bold text-gray-900 mb-2">Durability</h4>
                <p className="text-2xl font-bold text-blue-600 mb-2">5+ tahun</p>
                <p className="text-sm text-gray-600">
                  Sekali repaint awet bertahun-tahun, hemat maintenance
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="text-3xl mb-3">🚀</div>
                <h4 className="font-bold text-gray-900 mb-2">Confidence Boost</h4>
                <p className="text-2xl font-bold text-purple-600 mb-2">Priceless</p>
                <p className="text-sm text-gray-600">
                  Motor kece bikin PD naik, mood jadi lebih good
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-green-700 transition-all hover:scale-105"
            >
              Claim Premium Slot Sekarang 🎯
            </button>
            <p className="text-sm text-gray-600 mt-4">💎 Premium member dapat priority booking + exclusive discount</p>
          </div>
        </div>
      </section>

      {/* Testimonials with Photos */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">💬 Kata Mereka</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                name: "Budi Santoso", 
                motor: "Honda Vario 150", 
                review: "Hasil repaint-nya keren banget! Motor jadi kelihatan baru lagi. Pelayanannya juga ramah.",
                rating: 5,
                image: photos.testimonials[0]
              },
              { 
                name: "Sari Melati", 
                motor: "Yamaha NMAX", 
                review: "Pickup service-nya membantu banget. Gak ribet antar motor, hasil memuaskan!",
                rating: 5,
                image: photos.testimonials[1]
              },
              { 
                name: "Andi Pratama", 
                motor: "Honda PCX", 
                review: "Cat bunglon-nya mantap! Garansi 30 hari bikin tenang. Recommended!",
                rating: 5,
                image: photos.testimonials[2]
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                
                <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.motor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Promo Bundling */}
      <section className="py-12 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">🔥 Promo Bundling</h2>
          <p className="text-center text-gray-600 mb-8">Hemat hingga Rp 300,000 dengan paket bundling!</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {promoBundling.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-xl border-2 border-yellow-200 hover:shadow-2xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Paket {item.repaintSize}
                    </h3>
                    <p className="text-sm text-gray-600">Repaint + Detailing</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      Rp {item.promoPrice.toLocaleString('id-ID')}
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      Rp {item.normalPriceWithMaxSurcharge.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-green-700 text-sm font-medium">
                    🎨 Cat spesial GRATIS (kecuali bunglon)
                  </p>
                </div>
                
                <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-3 text-center">
                  <p className="text-yellow-800 font-bold">
                    ✨ Hemat Rp {item.savingsWithMaxSurcharge.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-4">💳 Cicilan tersedia • 🚚 Pickup service gratis • 🛡️ Garansi 30 hari</p>
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-green-700 transition-all hover:scale-105"
            >
              Ambil Promo Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">🤔 Pertanyaan Sering Ditanya</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: 'Berapa lama pengerjaan?', a: '7-14 hari kerja tergantung antrian' },
              { q: 'Ada garansi?', a: '30 hari garansi untuk cat mengelupas' },
              { q: 'Bisa jemput motor?', a: 'Ya, gratis pickup service area Depok' },
              { q: 'Pakai cat apa?', a: 'Cat PU premium + clear coat HS' },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Gallery Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">📸 Portfolio Hasil Kerja</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.portfolio.map((photo, i) => (
              <div key={i} className="relative aspect-square group overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={photo}
                  alt={`Portfolio ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-all"
            >
              Lihat Semua Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Location with Visual */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">📍 Lokasi Workshop</h2>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
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
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Bosmat Repaint Detailing Motor</h3>
              <p className="text-gray-600">
                Bukit Cengkeh 1, Jl. Medan No.B3/2<br/>
                Kota Depok, Jawa Barat 16451
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-green-600">🕒</span>
                  <span>Senin - Sabtu: 08:00 - 18:00</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">📱</span>
                  <span>WhatsApp: 0895-4015-27556</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">🚚</span>
                  <span>Pickup Service tersedia</span>
                </div>
              </div>
              
              <div className="pt-4">
                <a
                  href="https://maps.app.goo.gl/yDZfpyyRBHv4LyRe8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-all"
                >
                  <span>📍</span>
                  Buka di Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Siap Transform Motor Lo? 🚀
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Jangan tunggu lagi! Slot promo terbatas, konsultasi gratis sekarang.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleWhatsAppClick}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
              </svg>
              Chat WhatsApp Sekarang
            </button>
            
            <div className="text-center sm:text-left">
              <p className="text-sm opacity-75">💰 Gratis Konsultasi</p>
              <p className="text-sm opacity-75">🚚 Pickup Service Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="w-16 mx-auto mb-4">
            <Image 
              src="/images/logo-bosmat.webp" 
              alt="Bosmat" 
              width={100} 
              height={100} 
              className="w-full h-auto filter brightness-0 invert"
            />
          </div>
          <p className="text-gray-400 text-sm">
            &copy; 2025 Bosmat Auto Garage. Repaint & Detailing Specialist.
          </p>
          <p className="text-gray-500 text-xs mt-2">Depok, Jawa Barat</p>
        </div>
      </footer>

      {/* Admin Link */}
      <Link 
        href="/login" 
        className="fixed top-6 right-6 text-sm text-gray-500 hover:text-gray-700 transition-colors z-20 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
      >
        Admin
      </Link>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-gradient-to-r from-green-500 to-green-600 p-4 shadow-lg">
        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-white text-green-600 px-6 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
          </svg>
          Konsultasi Gratis Sekarang!
        </button>
      </div>
    </>
  );
}
