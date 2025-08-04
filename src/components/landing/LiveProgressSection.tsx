'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Camera, MessageCircle, Phone, Truck, Wrench, Sparkles, ArrowRight } from 'lucide-react';

interface LiveProgressSectionProps {
  onCtaClick: () => void;
}

interface ProgressStep {
  id: string;
  day: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  time: string;
  images?: string[];
  message?: string;
  isLive?: boolean;
}

export default function LiveProgressSection({ onCtaClick }: LiveProgressSectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Sample progress timeline
  const progressSteps: ProgressStep[] = [
    {
      id: 'pickup',
      day: 1,
      title: 'Motor Dijemput Tim Kami',
      description: 'Motor Honda Vario 150 berhasil dipickup dari rumah Bapak di Kelapa Gading',
      status: 'completed',
      time: '09:15 WIB',
      message: 'Motor udah sampai bengkel dengan selamat. Kondisi cat lama difoto dulu sebelum proses dimulai ya pak 📸',
      isLive: false
    },
    {
      id: 'inspection',
      day: 1,
      title: 'Inspeksi & Dokumentasi Awal',
      description: 'Tim teknisi melakukan pengecekan menyeluruh dan foto dokumentasi',
      status: 'completed',
      time: '10:30 WIB',
      message: 'Inspeksi selesai pak. Ternyata ada beberapa baret kecil di spatbor belakang, nanti kita ratakan dulu sebelum cat ya',
      isLive: false
    },
    {
      id: 'disassembly',
      day: 2,
      title: 'Pembongkaran Part Motor',
      description: 'Proses pembongkaran body panel dan persiapan pengecatan',
      status: 'completed',
      time: '08:45 WIB',
      message: 'Body panel udah dibongkar semua. Sekarang masuk tahap amplas dan primer. Estimasi 2 hari ya pak 🔧',
      isLive: false
    },
    {
      id: 'sanding',
      day: 3,
      title: 'Amplas & Primer Base',
      description: 'Penghalusan permukaan dan aplikasi primer untuk hasil optimal',
      status: 'completed',
      time: '14:20 WIB',
      message: 'Proses amplas selesai. Permukaan udah halus banget, siap untuk base coating besok 👌',
      isLive: false
    },
    {
      id: 'painting',
      day: 4,
      title: 'Proses Pengecatan Utama',
      description: 'Aplikasi cat warna biru metalik dengan teknik spray professional',
      status: 'in-progress',
      time: '11:00 WIB',
      message: 'Lagi proses cat nih pak. Warna biru metaliknya cakep banget! Nanti sore kita kasih liat hasil sementara ya 🎨',
      isLive: true
    },
    {
      id: 'clearcoat',
      day: 5,
      title: 'Clear Coat & Finishing',
      description: 'Lapisan pelindung dan finishing touches untuk hasil mengkilap',
      status: 'pending',
      time: '-',
      message: '',
      isLive: false
    },
    {
      id: 'assembly',
      day: 6,
      title: 'Pemasangan & Quality Check',
      description: 'Assembly ulang dan inspeksi kualitas final',
      status: 'pending',
      time: '-',
      message: '',
      isLive: false
    },
    {
      id: 'delivery',
      day: 7,
      title: 'Siap Diantar ke Rumah',
      description: 'Motor siap untuk pengantaran dengan kondisi prima',
      status: 'pending',
      time: '-',
      message: '',
      isLive: false
    }
  ];

  // Auto-simulate progress
  useEffect(() => {
    if (isSimulating && currentStep < progressSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => Math.min(prev + 1, progressSteps.length - 1));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isSimulating, progressSteps.length]);

  const startSimulation = () => {
    setIsSimulating(true);
    setCurrentStep(0);
  };

  const completedSteps = progressSteps.filter(step => step.status === 'completed').length;
  const progressPercentage = (completedSteps / progressSteps.length) * 100;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            📱 Live Progress Update Real-Time
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Gak perlu khawatir motor lo gimana. Tim kami update progress setiap hari via WhatsApp grup khusus!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Overview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Progress Overview
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Honda Vario 150 - Repaint Biru Metalik
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Total Progress</span>
                      <span className="font-semibold">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>

                  {/* Status Badges */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        Dalam Proses
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Hari ke:</span>
                      <span className="font-semibold">4 dari 7</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Estimasi selesai:</span>
                      <span className="font-semibold text-green-600">3 hari lagi</span>
                    </div>
                  </div>

                  {/* Live Indicator */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-green-700">LIVE UPDATE</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Teknisi sedang aktif mengerjakan motor Anda
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <Button 
                      onClick={onCtaClick}
                      variant="outline" 
                      className="w-full"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat dengan Teknisi
                    </Button>
                    <Button 
                      onClick={startSimulation}
                      disabled={isSimulating}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {isSimulating ? 'Simulasi Berjalan...' : 'Lihat Demo Progress'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Timeline */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {progressSteps.map((step, index) => (
                <Card 
                  key={step.id}
                  className={`border-2 transition-all duration-500 ${
                    step.status === 'completed' 
                      ? 'border-green-200 bg-green-50' 
                      : step.status === 'in-progress'
                      ? 'border-blue-200 bg-blue-50 shadow-md'
                      : 'border-gray-200'
                  } ${
                    isSimulating && index === currentStep ? 'animate-pulse ring-2 ring-blue-300' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Status Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.status === 'completed' 
                          ? 'bg-green-500 text-white' 
                          : step.status === 'in-progress'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step.status === 'completed' ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : step.status === 'in-progress' ? (
                          <Wrench className="w-6 h-6 animate-spin" />
                        ) : (
                          <Clock className="w-6 h-6" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{step.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            Hari {step.day}
                          </Badge>
                          {step.time && (
                            <span className="text-sm text-gray-500">{step.time}</span>
                          )}
                          {step.isLive && (
                            <Badge className="bg-red-100 text-red-700 border-red-200 animate-pulse">
                              🔴 LIVE
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-3">{step.description}</p>
                        
                        {step.message && (
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="flex items-start gap-2">
                              <MessageCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-semibold text-blue-600">Tim Teknisi Bosmat</span>
                                  <span className="text-xs text-gray-500">{step.time}</span>
                                </div>
                                <p className="text-sm text-gray-700">{step.message}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6 border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <Camera className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Foto Progress Harian</h3>
            <p className="text-sm text-gray-600">
              Dokumentasi lengkap setiap tahap pengerjaan motor lo
            </p>
          </Card>
          
          <Card className="text-center p-6 border-2 border-gray-200 hover:border-green-300 transition-colors">
            <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">WhatsApp Grup Khusus</h3>
            <p className="text-sm text-gray-600">
              Chat langsung dengan teknisi yang handle motor lo
            </p>
          </Card>
          
          <Card className="text-center p-6 border-2 border-gray-200 hover:border-purple-300 transition-colors">
            <Phone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Konsultasi Real-Time</h3>
            <p className="text-sm text-gray-600">
              Ada pertanyaan? Langsung tanya teknisi via call/chat
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Pengen Motor Lo Diupdate Kayak Gini Juga?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Dapetin transparansi penuh dan peace of mind dengan sistem tracking progress real-time kami. 
              Motor lo bakal dihandle dengan profesional dan lo bisa pantau terus dari rumah!
            </p>
            <Button 
              onClick={onCtaClick}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
            >
              Mulai Progress Tracking Motor Lo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
