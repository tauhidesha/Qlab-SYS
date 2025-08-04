// @file: src/components/landing/ValuePropositionSection.tsx
"use client";
import React from 'react';

interface ValuePropositionSectionProps {
  onCtaClick: () => void;
}

export default function ValuePropositionSection({ onCtaClick }: ValuePropositionSectionProps) {
  const valuePropositions = [
    {
      icon: "🏆",
      title: "Kualitas Premium",
      subtitle: "Cat PU + Clear HS Grade A",
      description: "Material berkualitas internasional yang tahan 3x lebih lama dari cat biasa. Warna tidak mudah pudar dan anti gores ringan.",
      benefits: [
        "Cat premium yang awet 5+ tahun",
        "Finish glossy seperti motor baru",
        "Anti UV dan weatherproof",
        "Color matching 99% akurat"
      ],
      highlight: "Garansi 30 hari tertulis",
      color: "bg-blue-500"
    },
    {
      icon: "⚡",
      title: "Service Super Fast",
      subtitle: "7-14 hari kerja, bukan bulanan",
      description: "Proses optimized dengan teknologi modern. Tim berpengalaman 10+ tahun yang paham waktu customer yang berharga.",
      benefits: [
        "Pickup & delivery gratis area JKT",
        "Progress update harian via foto",
        "Express service untuk urgent case",
        "No delay, tepat waktu guaranteed"
      ],
      highlight: "Same day pickup available",
      color: "bg-purple-500"
    },
    {
      icon: "💎",
      title: "Value Terdepan",
      subtitle: "Premium quality, competitive price", 
      description: "Harga transparan dengan kualitas yang gak pernah mengecewakan. ROI terbaik untuk investasi motor lo.",
      benefits: [
        "Harga all-in, no hidden cost",
        "Free konsultasi & estimasi",
        "Payment flexible (cash/transfer)",
        "Discount untuk repeat customer"
      ],
      highlight: "30% lebih murah dari kompetitor",
      color: "bg-green-500"
    }
  ];

  const comparisonData = [
    {
      feature: "Kualitas Cat",
      bosmat: "Premium PU + Clear HS",
      others: "Cat biasa/ekonomis",
      advantage: "3x lebih awet & glossy"
    },
    {
      feature: "Waktu Pengerjaan", 
      bosmat: "7-14 hari kerja",
      others: "3-6 minggu",
      advantage: "50% lebih cepat"
    },
    {
      feature: "Garansi",
      bosmat: "30 hari tertulis",
      others: "Verbal/tidak ada",
      advantage: "Peace of mind guaranteed"
    },
    {
      feature: "Pickup/Delivery",
      bosmat: "Gratis area JKT",
      others: "Biaya tambahan",
      advantage: "Save cost & time"
    },
    {
      feature: "Progress Update",
      bosmat: "Foto harian via WA",
      others: "Telepon sesekali",
      advantage: "Full transparency"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kenapa Bosmat <span className="text-green-500">Worth Every Penny?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lebih dari sekedar repaint. Ini tentang memberikan value terbaik 
            dengan kualitas premium yang bikin motor lo jadi investment, bukan expense.
          </p>
        </div>

        {/* Value Propositions */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {valuePropositions.map((vp, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full">
                
                {/* Icon & Title */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{vp.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{vp.title}</h3>
                  <p className="text-sm text-gray-500 font-medium">{vp.subtitle}</p>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6 text-center">
                  {vp.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-3 mb-6">
                  {vp.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Highlight */}
                <div className={`${vp.color} text-white text-center py-3 px-4 rounded-xl text-sm font-medium`}>
                  ⭐ {vp.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table - Mobile Optimized */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Bosmat vs Bengkel Biasa: <span className="text-green-500">Clear Winner!</span>
            </h3>
            <p className="text-gray-600">
              Comparison objektif yang bikin lo gak akan nyesel pilih Bosmat
            </p>
          </div>

          {/* Mobile Version - Card Layout */}
          <div className="md:hidden space-y-4">
            {comparisonData.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3 text-center">{item.feature}</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">🏆 Bosmat:</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      {item.bosmat}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Bengkel Lain:</span>
                    <span className="text-xs text-gray-500">{item.others}</span>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100 text-center">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      💪 {item.advantage}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Version - Table Layout */}
          <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[120px]">Feature</th>
                    <th className="text-center py-4 px-3 font-semibold text-green-600 min-w-[140px]">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-sm">🏆 Bosmat</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-3 font-semibold text-gray-500 min-w-[120px]">
                      <span className="text-sm">Bengkel Lain</span>
                    </th>
                    <th className="text-center py-4 px-3 font-semibold text-blue-600 min-w-[140px]">
                      <span className="text-sm">Advantage</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr key={index} className={`border-t border-gray-100 ${index % 2 === 0 ? 'bg-gray-25' : 'bg-white'}`}>
                      <td className="py-4 px-4 font-medium text-gray-900 text-sm">{item.feature}</td>
                      <td className="py-4 px-3 text-center">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          {item.bosmat}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-center text-gray-600 text-xs">{item.others}</td>
                      <td className="py-4 px-3 text-center">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                          {item.advantage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ROI Calculator Preview */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ROI Calculator: <span className="text-green-500">Investasi Cerdas!</span>
            </h3>
            <p className="text-gray-600">
              Repaint premium di Bosmat = investasi yang menguntungkan long term
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full -translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready untuk Transform Motor Lo? 🔥
              </h3>
              <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                Join exclusive circle of smart motor owners yang udah rasain 
                premium quality Bosmat. Limited slot available!
              </p>
              
              <button
                onClick={onCtaClick}
                className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 mb-4"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
                </svg>
                Claim Premium Slot Sekarang
                <span className="ml-2">🎯</span>
              </button>
              
              <p className="text-sm opacity-80">
                💎 Premium member dapat priority booking + exclusive discount
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
