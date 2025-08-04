// @file: src/components/landing/EnhancedHero.tsx
"use client";
import React from 'react';
import Image from 'next/image';

interface EnhancedHeroProps {
  onCtaClick: () => void;
}

export default function EnhancedHero({ onCtaClick }: EnhancedHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-green-50 pt-6 md:pt-8 pb-8 md:pb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-400 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
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

        {/* Main Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Transform Motor Kusam Jadi{' '}
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            GANTENG MAKSIMAL
          </span>
          {' '}dalam 7 Hari
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Full Repaint + Detailing Premium dengan Garansi 30 Hari.{' '}
          <span className="font-semibold text-gray-800">Bebas pilih warna, hasil seperti motor baru!</span>
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-medium text-gray-700">4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border">
            <span className="text-green-500">🏆</span>
            <span className="text-sm font-medium text-gray-700">500+ Motor Transformed</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border">
            <span className="text-blue-500">📞</span>
            <span className="text-sm font-medium text-gray-700">Response &lt; 2 Menit</span>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="space-y-4">
          <button
            onClick={onCtaClick}
            className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
            </svg>
            Dapatkan Quote Gratis Sekarang
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          
          <p className="text-sm text-gray-500">
            💬 Konsultasi & estimasi harga dalam 5 menit via WhatsApp
          </p>
        </div>

        {/* Secondary Info */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Trusted by 500+ satisfied customers in Depok & Jakarta</p>
          
          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">7-14</div>
              <div className="text-xs text-gray-500">Hari Pengerjaan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">30</div>
              <div className="text-xs text-gray-500">Hari Garansi</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">10+</div>
              <div className="text-xs text-gray-500">Tahun Pengalaman</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
