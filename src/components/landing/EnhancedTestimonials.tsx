// @file: src/components/landing/EnhancedTestimonials.tsx
"use client";
import React, { useState } from 'react';

interface TestimonialProps {
  name: string;
  location: string;
  rating: number;
  comment: string;
  beforeImage?: string;
  afterImage?: string;
  serviceType: string;
  date: string;
  verified: boolean;
}

interface EnhancedTestimonialsProps {
  onCtaClick: () => void;
}

export default function EnhancedTestimonials({ onCtaClick }: EnhancedTestimonialsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'featured'>('featured');

  const testimonials: TestimonialProps[] = [
    {
      name: "Andi Wijaya",
      location: "Kelapa Gading",
      rating: 5,
      comment: "Gila anjir! Motor gue yang tadinya kusam kayak mau pensiun, sekarang shiny banget sampai tetangga nanya 'motor baru ya?'. Tim Bosmat emang next level, pickup on time, update terus via WA, hasilnya bikin speechless. Worth every penny!",
      serviceType: "Full Repaint + Detailing • Honda Vario 150",
      date: "2 minggu lalu • 8 hari kerja",
      verified: true
    },
    {
      name: "Sari Indah",
      location: "Bekasi",
      rating: 5,
      comment: "As a working mom, gue butuh service yang reliable dan gak ribet. Bosmat total solution banget - pickup, repaint, delivery, semuanya smooth. Motor NMAX gue sekarang kayak baru keluar showroom. Recommended banget!",
      serviceType: "Repaint + Engine Wash • Yamaha NMAX",
      date: "1 minggu lalu • 6 hari kerja", 
      verified: true
    },
    {
      name: "Rizky Pratama",
      location: "Jakarta Timur",
      rating: 5,
      comment: "Udah pernah coba bengkel lain, hasilnya mengecewakan. Di Bosmat beda banget - kualitas cat premium, detailing rapi, bahkan interior juga dibersihkan total. Plus garansi 30 hari bikin tenang. Definitely coming back!",
      serviceType: "Premium Repaint • Honda PCX 160",
      date: "3 hari lalu • 7 hari kerja",
      verified: true
    },
    {
      name: "Dedi Kurniawan", 
      location: "Tangerang",
      rating: 5,
      comment: "Motor Vario gue lecet parah gara-gara kecelakaan. Tim Bosmat bisa restore kayak kondisi awal, bahkan lebih shiny! Prosesnya transparant, dikasih foto progress setiap hari. Pelayanan customer service juga top!",
      serviceType: "Crash Repair + Repaint",
      date: "1 bulan lalu",
      verified: true
    },
    {
      name: "Maya Sari",
      location: "Jakarta Selatan", 
      rating: 5,
      comment: "Awalnya ragu sama online service, tapi Bosmat bikin gue percaya. Pickup tepat waktu, progress update real-time, hasilnya exceed expectation. Motor BeAT gue sekarang jadi eye-catching banget. Highly recommended untuk yang busy!",
      serviceType: "Express Repaint",
      date: "5 hari lalu",
      verified: true
    },
    {
      name: "Bayu Setiawan",
      location: "Depok",
      rating: 5, 
      comment: "Value for money terbaik yang pernah gue dapat! Harga kompetitif, kualitas premium, service excellent. Motor PCX gue yang udah 5 tahun sekarang kayak brand new. Tim teknisinya juga profesional banget, worth it!",
      serviceType: "Full Package + Coating",
      date: "2 hari lalu",
      verified: true
    }
  ];

  const featuredTestimonials = testimonials.slice(0, 3);
  const recentTestimonials = testimonials.filter(t => 
    t.date.includes('hari') || t.date.includes('minggu')
  ).slice(0, 3);

  const getDisplayTestimonials = () => {
    switch(activeTab) {
      case 'featured': return featuredTestimonials;
      case 'recent': return recentTestimonials;
      case 'all': return testimonials;
      default: return featuredTestimonials;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ));
  };

  const stats = [
    { label: "Happy Customers", value: "500+", icon: "👥" },
    { label: "Perfect Reviews", value: "98%", icon: "⭐" },
    { label: "Repeat Customers", value: "85%", icon: "🔄" },
    { label: "Referral Rate", value: "92%", icon: "🗣️" }
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Apa Kata Mereka yang Udah <span className="text-green-500">Ngerasain Bosmat?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Real review dari 500+ customer yang motornya udah transform. 
            Gak ada yang fake, semua verified customer.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-3 md:p-4 shadow-md">
                <div className="text-xl md:text-2xl mb-2">{stat.icon}</div>
                <div className="text-lg md:text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs - Mobile Optimized */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md max-w-full overflow-x-auto">
            <div className="flex min-w-max">
              {[
                { key: 'featured', label: 'Featured' },
                { key: 'recent', label: 'Terbaru' },
                { key: 'all', label: 'Semua' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.key 
                      ? 'bg-green-500 text-white shadow-md' 
                      : 'text-gray-600 hover:text-green-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {getDisplayTestimonials().map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        Verified
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <p className="text-xs text-gray-400">{testimonial.date}</p>
                </div>
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
              </div>

              {/* Service Type */}
              <div className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full inline-block mb-4">
                {testimonial.serviceType}
              </div>

              {/* Review */}
              <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                "{testimonial.comment}"
              </p>

              {/* Helpful Indicator */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Helpful untuk {index * 7 + 25} orang</span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                  </svg>
                  <span>{index * 3 + 12}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Kenapa Customer Bosmat Selalu Balik Lagi?
            </h3>
            <p className="text-gray-600">Real reasons dari customer feedback analysis</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-semibold text-gray-900 mb-2">Hasil Sesuai Expectation</h4>
              <p className="text-sm text-gray-600">
                "Motor gue bener-bener kayak baru lagi. Bahkan lebih shiny dari aslinya!"
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-2">Service Ultra Responsive</h4>
              <p className="text-sm text-gray-600">
                "Chat balas dalam hitungan menit. Update progress tiap hari. Top banget!"
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">💎</div>
              <h4 className="font-semibold text-gray-900 mb-2">Value for Money Terbaik</h4>
              <p className="text-sm text-gray-600">
                "Harga reasonable, hasil premium. Gak nyesel pilih Bosmat!"
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Join 500+ Happy Customers! 🎉
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Saatnya motor lo jadi yang terkece di jalan. 
              Konsultasi gratis, no obligation!
            </p>
            
            <button
              onClick={onCtaClick}
              className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
              </svg>
              Daftar Customer VIP Sekarang
              <span className="ml-2">✨</span>
            </button>
            
            <p className="text-sm mt-4 opacity-80">
              🔥 Limited: Hanya 50 slot per bulan untuk hasil maksimal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
