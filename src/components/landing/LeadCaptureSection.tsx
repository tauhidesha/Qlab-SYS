'use client';

import React from 'react';
import LeadCaptureForm from './LeadCaptureForm';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Shield, Award, CheckCircle } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Konsultasi Gratis',
    description: 'Tim expert kami akan memberikan konsultasi gratis sesuai kebutuhan kendaraan Anda'
  },
  {
    icon: Shield,
    title: 'Estimasi Transparan',
    description: 'Dapatkan estimasi harga yang jelas dan transparan sebelum memutuskan'
  },
  {
    icon: Award,
    title: 'Kualitas Terjamin',
    description: 'Pengerjaan dengan standar tinggi dan garansi untuk kepuasan Anda'
  }
];

const guarantees = [
  'Konsultasi 100% gratis tanpa kewajiban',
  'Estimasi harga transparan dan akurat',
  'Survey langsung ke lokasi (area Jadetabek)',
  'Garansi kualitas untuk semua layanan',
  'Tim berpengalaman 10+ tahun',
  'Gunakan produk premium internasional'
];

export default function LeadCaptureSection() {
  return (
    <section className="py-16 bg-gray-50 lead-capture-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">
              <CheckCircle className="w-4 h-4 mr-2" />
              Konsultasi Gratis
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dapatkan Konsultasi Gratis & Estimasi Harga
            </h2>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto font-medium">
              Isi form di bawah untuk mendapatkan konsultasi gratis dari tim expert kami. 
              Dapatkan estimasi harga yang akurat dan rekomendasi terbaik untuk kendaraan Anda.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Benefits Side Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Benefits Cards */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500 bg-white shadow-sm">
                    <CardContent className="p-4 bg-white">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <benefit.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {benefit.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Guarantees */}
              <Card className="bg-green-50 border-green-200 shadow-sm">
                <CardContent className="p-6 bg-green-50">
                  <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Yang Anda Dapatkan:
                  </h4>
                  <ul className="space-y-2">
                    {guarantees.map((guarantee, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {guarantee}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Social Proof */}
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 shadow-sm">
                <CardContent className="p-6 text-center bg-transparent">
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-purple-600">500+</div>
                    <p className="text-sm text-gray-600">
                      Customer yang puas dengan layanan konsultasi gratis kami
                    </p>
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">4.9/5 Rating</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-2">
              <LeadCaptureForm />
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Masih Ragu? Hubungi Kami Langsung! 📞
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Tim customer service kami siap membantu Anda 24/7 untuk menjawab 
                semua pertanyaan tentang layanan dan harga.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/6281282882728"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Chat WhatsApp
                </a>
                <a
                  href="tel:+6281282882728"
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Clock className="w-5 h-5" />
                  Call Langsung
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
