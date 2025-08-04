// @file: src/components/landing/ProcessSection.tsx
"use client";
import React from 'react';

interface ProcessSectionProps {
  onCtaClick: () => void;
}

export default function ProcessSection({ onCtaClick }: ProcessSectionProps) {
  const steps = [
    {
      number: "1",
      title: "Konsultasi Gratis",
      description: "Chat via WhatsApp, kirim foto motor, dapat estimasi harga real-time yang akurat",
      duration: "⏱️ 5 menit",
      details: [
        "Analisis kondisi motor dari foto",
        "Rekomendasi service yang tepat", 
        "Quote harga transparan",
        "Jadwal pickup fleksibel"
      ],
      color: "blue"
    },
    {
      number: "2", 
      title: "Pickup Service",
      description: "Tim kami jemput motor lo langsung ke lokasi dengan asuransi penuh",
      duration: "📅 Jadwal fleksibel",
      details: [
        "Gratis pickup radius 15km",
        "Dokumentasi kondisi awal",
        "Asuransi selama transport",
        "Estimasi kerja final on-site"
      ],
      color: "purple"
    },
    {
      number: "3",
      title: "Magic Transformation", 
      description: "Full repaint + detailing dengan teknisi berpengalaman 10+ tahun",
      duration: "🔧 7-14 hari kerja",
      details: [
        "Pengerokan & persiapan bodi",
        "Dempul & finishing halus",
        "Cat premium PU + Clear HS",
        "Full detailing luar dalam"
      ],
      color: "green"
    },
    {
      number: "4",
      title: "Quality Check & Delivery",
      description: "Inspeksi kualitas ketat + foto dokumentasi sebelum pengantaran",
      duration: "✅ Same day delivery",
      details: [
        "QC 17 checkpoint kualitas",
        "Foto dokumentasi hasil",
        "Test ride final check",
        "Garansi 30 hari tertulis"
      ],
      color: "yellow"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-500",
        border: "border-blue-200", 
        text: "text-blue-700",
        bgLight: "bg-blue-50"
      },
      purple: {
        bg: "bg-purple-500",
        border: "border-purple-200",
        text: "text-purple-700", 
        bgLight: "bg-purple-50"
      },
      green: {
        bg: "bg-green-500",
        border: "border-green-200",
        text: "text-green-700",
        bgLight: "bg-green-50"
      },
      yellow: {
        bg: "bg-yellow-500",
        border: "border-yellow-200",
        text: "text-yellow-700",
        bgLight: "bg-yellow-50"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gimana Prosesnya? <span className="text-green-500">Simple Banget!</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proses yang udah terbukti berhasil transform 500+ motor. 
            Gak ribet, transparan, dan hasil dijamin memuaskan.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gray-200"></div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => {
              const colors = getColorClasses(step.color);
              
              return (
                <div key={index} className="relative">
                  {/* Step Number Circle */}
                  <div className={`w-16 h-16 ${colors.bg} text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto shadow-lg relative z-10`}>
                    {step.number}
                  </div>

                  {/* Step Card */}
                  <div className={`bg-white rounded-xl p-6 shadow-lg border ${colors.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-center leading-relaxed">
                      {step.description}
                    </p>

                    <div className={`${colors.bgLight} rounded-lg p-3 mb-4`}>
                      <p className={`text-sm ${colors.text} font-medium text-center`}>
                        {step.duration}
                      </p>
                    </div>

                    {/* Step Details */}
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-green-500 text-base">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Highlight */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Kenapa Proses Bosmat Beda dari yang Lain?
            </h3>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="font-semibold text-gray-900 mb-2">Transparan 100%</h4>
              <p className="text-sm text-gray-600">
                Update progress harian via foto WhatsApp. Lo bisa liat perkembangan motor real-time.
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-2">Fast Response</h4>
              <p className="text-sm text-gray-600">
                Tim customer service available 14 jam/hari. Pertanyaan dijawab dalam 2 menit.
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">🛡️</div>
              <h4 className="font-semibold text-gray-900 mb-2">Zero Risk</h4>
              <p className="text-sm text-gray-600">
                Garansi 30 hari + asuransi transport. Gak puas? Refund 100% tanpa pertanyaan.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Siap Mulai Transformasi Motor Lo?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Mulai dari konsultasi gratis. Gak ada komitmen, gak ada biaya hidden.
            </p>
            
            <button
              onClick={onCtaClick}
              className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
              </svg>
              Mulai Konsultasi Gratis
              <span className="ml-2">→</span>
            </button>
            
            <p className="text-sm mt-4 opacity-80">
              💬 Tim expert siap bantu lo dalam 2 menit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
