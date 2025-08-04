// @file: src/components/landing/ProblemSolutionSection.tsx
"use client";
import React from 'react';

interface ProblemSolutionProps {
  onCtaClick: () => void;
}

export default function ProblemSolutionSection({ onCtaClick }: ProblemSolutionProps) {
  const problems = [
    {
      icon: "😔",
      title: "Cat Kusam & Baret",
      description: "Motor kesayangan jadi keliatan tua dan gak terawat. Confidence berkendara menurun drastis.",
      impact: "Malu ketika parkir di tempat umum"
    },
    {
      icon: "💸",
      title: "Harga Mahal di Tempat Lain", 
      description: "Service premium tapi kantong tipis? Susah banget nemuin yang berkualitas tapi terjangkau.",
      impact: "Budget bengkak tapi hasil gak sesuai"
    },
    {
      icon: "⏰",
      title: "Ribet & Lama",
      description: "Gak ada waktu antar-jemput motor kesana kemari. Belum lagi proses yang berbelit-belit.",
      impact: "Ganggu aktivitas sehari-hari"
    }
  ];

  const solutions = [
    {
      icon: "✨",
      title: "Transformasi Total",
      description: "Full repaint + detailing yang bikin motor lo seperti baru lagi. Cat premium yang tahan lama.",
      benefit: "Confidence level naik 100%"
    },
    {
      icon: "💰",
      title: "Harga Transparan",
      description: "Bundling promo yang bikin hemat sampai 300rb. Kualitas premium dengan harga masuk akal.",
      benefit: "Value for money terbaik"
    },
    {
      icon: "🚚",
      title: "Pickup Service",
      description: "Gak perlu ribet antar motor. Tim kita yang jemput dan antar. Lo tinggal terima hasil aja.",
      benefit: "Zero hassle, maximum result"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Problems Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Masalah yang Bikin Motor Lo Jadi{' '}
              <span className="text-red-500">Gak Percaya Diri?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kita paham banget perjuangan lo sebagai pemilik motor. Ini masalah yang sering dialami:
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {problems.map((problem, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-red-100 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4 text-center">{problem.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{problem.title}</h3>
                <p className="text-gray-600 mb-4 text-center leading-relaxed">{problem.description}</p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700 font-medium text-center">
                    💔 Dampaknya: {problem.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transition */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-lg border-2 border-dashed border-yellow-300">
            <span className="text-2xl">🎯</span>
            <span className="text-lg font-semibold text-gray-900">Tapi tenang, semua masalah itu ada solusinya!</span>
          </div>
        </div>

        {/* Solutions Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-green-500">Solusi Complete</span> dari Bosmat Studio
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dengan pengalaman 10+ tahun, kita udah tau persis gimana caranya solve semua problem lo:
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4 text-center">{solution.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{solution.title}</h3>
                <p className="text-gray-600 mb-4 text-center leading-relaxed">{solution.description}</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-700 font-medium text-center">
                    ✅ Hasilnya: {solution.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Udah Siap Transform Motor Lo dari Kusam Jadi Ganteng?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Jangan biarkan motor lo terus jadi sumber insecurity. Saatnya upgrade!
            </p>
            
            <button
              onClick={onCtaClick}
              className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
              </svg>
              Konsultasi Gratis Sekarang
              <span className="ml-2">→</span>
            </button>
            
            <p className="text-sm mt-4 opacity-80">
              💬 Ceritain masalah motor lo, kita kasih solusi terbaik dalam 5 menit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
