'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Clock, Truck, Shield, Sparkles, TrendingUp, ArrowRight, MessageCircle } from 'lucide-react';
import hargaLayanan from '@/data/hargaLayanan';
import promoBundling from '@/data/promoBundling';
import daftarUkuranMotor from '@/data/daftarUkuranMotor';

interface InteractivePricingSectionProps {
  onCtaClick: () => void;
}

interface PriceCalculation {
  basePrice: number;
  bundleDiscount: number;
  totalPrice: number;
  savings: number;
  savingsPercent: number;
  estimatedDays: number;
}

export default function InteractivePricingSection({ onCtaClick }: InteractivePricingSectionProps) {
  const [selectedMotor, setSelectedMotor] = useState<string>('vario');
  const [motorSearch, setMotorSearch] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['repaint', 'detailing']);
  const [calculation, setCalculation] = useState<PriceCalculation>({
    basePrice: 0,
    bundleDiscount: 0,
    totalPrice: 0,
    savings: 0,
    savingsPercent: 0,
    estimatedDays: 6
  });

  // Get motor data from selected motor
  const getSelectedMotorData = () => {
    return daftarUkuranMotor.find(motor => motor.model === selectedMotor) || daftarUkuranMotor[0];
  };

  // Group motors by category for better UX
  const groupedMotors = () => {
    const groups: { [key: string]: typeof daftarUkuranMotor } = {
      matic: [],
      manual: [],
      sport: [],
      klasik: []
    };

    daftarUkuranMotor.forEach(motor => {
      // Group based on motor characteristics
      if (['beat', 'scoopy', 'vario', 'pcx', 'nmax', 'aerox', 'lexi', 'freego', 'spacy', 'fino', 'mio', 'gesits', 'fazzio', 'grand filano'].includes(motor.model)) {
        groups.matic.push(motor);
      } else if (['jupiter z', 'jupiter mx', 'supra', 'revo', 'blade', 'vega', 'smash', 'hayate', 'shogun', 'soul gt'].includes(motor.model)) {
        groups.manual.push(motor);
      } else if (['cbr 150r', 'cb 150r', 'r15', 'r25', 'mt-15', 'mt-25', 'ninja 250', 'ninja zx-25r', 'gsx-r150', 'satria f150', 'vixion', 'byson'].includes(motor.model)) {
        groups.sport.push(motor);
      } else {
        groups.klasik.push(motor);
      }
    });

    return groups;
  };

  // Filter motors based on search
  const filteredMotors = (motors: typeof daftarUkuranMotor) => {
    if (!motorSearch) return motors;
    
    return motors.filter(motor => 
      motor.model.toLowerCase().includes(motorSearch.toLowerCase()) ||
      motor.aliases.some(alias => alias.toLowerCase().includes(motorSearch.toLowerCase()))
    );
  };

  // Service options - Menggunakan data real dari hargaLayanan
  const serviceOptions = [
    {
      id: 'repaint',
      name: 'Full Repaint Bodi Halus',
      description: 'Cat ulang total dengan pilihan warna',
      getSizePrice: (size: string) => {
        const repaintData = hargaLayanan.find(h => h.name === "Repaint Bodi Halus");
        const variant = repaintData?.variants?.find(v => v.name === size);
        return variant ? variant.price : 1000000;
      },
      duration: 4, // dari estimatedDuration 2400 menit = 4 hari
      icon: '🎨',
      required: true
    },
    {
      id: 'detailing', 
      name: 'Full Detailing Glossy',
      description: 'Cuci menyeluruh + poles + wax',
      getSizePrice: (size: string) => {
        const detailingData = hargaLayanan.find(h => h.name === "Full Detailing Glossy");
        const variant = detailingData?.variants?.find(v => v.name === size);
        return variant ? variant.price : 450000;
      },
      duration: 1, // dari estimatedDuration 420 menit = 1 hari
      icon: '✨',
      popular: true
    },
    {
      id: 'coating',
      name: 'Nano Coating Motor',
      description: 'Perlindungan cat premium',
      getSizePrice: (size: string) => {
        const coatingData = hargaLayanan.find(h => h.name === "Coating Motor Glossy");
        const variant = coatingData?.variants?.find(v => v.name === size);
        return variant ? variant.price : 350000;
      },
      duration: 1,
      icon: '🛡️'
    },
    {
      id: 'pickup',
      name: 'Pickup Service',
      description: 'Antar-jemput motor',
      getSizePrice: () => 100000, // flat rate
      duration: 0,
      icon: '🚚'
    }
  ];

  // Calculate pricing based on selections
  useEffect(() => {
    const calculatePrice = () => {
      const motorData = getSelectedMotorData();
      const repaintSize = motorData.repaint_size;
      const detailingSize = motorData.service_size;
      
      let baseTotal = 0;
      let totalDays = 0;

      // Find promo bundling for repaint size
      const promoData = promoBundling.find(p => p.repaintSize === repaintSize);
      
      if (selectedServices.includes('repaint') && selectedServices.includes('detailing') && promoData) {
        // Use promo bundling price - dengan rule khusus detailing
        baseTotal = promoData.normalPrice;
        const finalPrice = promoData.promoPrice;
        
        // No motor type multiplier needed - prices already specific
        let adjustedPromoPrice = finalPrice;
        let adjustedNormalPrice = baseTotal;
        
        totalDays = 5; // 4 hari repaint + 1 hari detailing

        // Add other services
        selectedServices.forEach(serviceId => {
          if (serviceId !== 'repaint' && serviceId !== 'detailing') {
            const service = serviceOptions.find(s => s.id === serviceId);
            if (service) {
              const servicePrice = service.getSizePrice(repaintSize); // Use repaint size for other services
              adjustedPromoPrice += servicePrice;
              adjustedNormalPrice += servicePrice;
              totalDays += service.duration;
            }
          }
        });

        setCalculation({
          basePrice: adjustedNormalPrice,
          bundleDiscount: adjustedNormalPrice - adjustedPromoPrice,
          totalPrice: adjustedPromoPrice,
          savings: adjustedNormalPrice - adjustedPromoPrice,
          savingsPercent: Math.round(((adjustedNormalPrice - adjustedPromoPrice) / adjustedNormalPrice) * 100),
          estimatedDays: totalDays
        });
      } else {
        // Individual pricing - menggunakan harga real berdasarkan motor-specific sizes
        selectedServices.forEach(serviceId => {
          const service = serviceOptions.find(s => s.id === serviceId);
          if (service) {
            let servicePrice;
            if (serviceId === 'repaint') {
              servicePrice = service.getSizePrice(repaintSize);
            } else if (serviceId === 'detailing') {
              servicePrice = service.getSizePrice(detailingSize);
            } else {
              servicePrice = service.getSizePrice(repaintSize); // Default to repaint size
            }
            baseTotal += servicePrice;
            totalDays += service.duration;
          }
        });

        setCalculation({
          basePrice: baseTotal,
          bundleDiscount: 0,
          totalPrice: baseTotal,
          savings: 0,
          savingsPercent: 0,
          estimatedDays: Math.max(totalDays, 3) // Minimum 3 days
        });
      }
    };

    calculatePrice();
  }, [selectedMotor, selectedServices]);

  const toggleService = (serviceId: string) => {
    const service = serviceOptions.find(s => s.id === serviceId);
    if (service?.required) return; // Can't toggle required services

    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}jt`;
    }
    return `${(price / 1000).toFixed(0)}rb`;
  };

  const hasPromoBundle = selectedServices.includes('repaint') && selectedServices.includes('detailing');
  const motorData = getSelectedMotorData();

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            💰 Hitung Biaya Motor Lo Sekarang
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kalkulator interaktif dengan database {daftarUkuranMotor.length}+ motor lengkap dengan sizing yang akurat!
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm text-gray-500">
            <span>🏍️ {daftarUkuranMotor.filter(m => m.repaint_size === 'S').length} Motor Size S</span>
            <span>🏍️ {daftarUkuranMotor.filter(m => m.repaint_size === 'M').length} Motor Size M</span>
            <span>🏍️ {daftarUkuranMotor.filter(m => m.repaint_size === 'L').length} Motor Size L</span>
            <span>🏍️ {daftarUkuranMotor.filter(m => m.repaint_size === 'XL').length} Motor Size XL</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Motor Selection */}
            <Card className="border-2 border-yellow-200 hover:border-yellow-300 transition-colors shadow-lg">
              <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Pilih Motor Lo
                </CardTitle>
                <CardDescription className="text-yellow-50">
                  Cari dan pilih motor lo dari database lengkap kami
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-gradient-to-br from-white to-gray-50 p-6">
                <div className="space-y-4">
                  {/* Motor Search */}
                  <div>
                    <Label htmlFor="motor-search" className="text-gray-700 font-semibold">Cari Motor</Label>
                    <input
                      id="motor-search"
                      type="text"
                      placeholder="Ketik nama motor lo... (contoh: vario, beat, cbr)"
                      value={motorSearch}
                      onChange={(e) => setMotorSearch(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none text-gray-900 bg-gradient-to-r from-white to-gray-50"
                    />
                  </div>

                  {/* Motor Search/Select */}
                  <div>
                    <Label htmlFor="motor-select" className="text-gray-700 font-semibold">Pilih dari Hasil Pencarian</Label>
                    <select 
                      id="motor-select"
                      value={selectedMotor}
                      onChange={(e) => setSelectedMotor(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none text-gray-900 bg-gradient-to-r from-white to-gray-50"
                    >
                      {Object.entries(groupedMotors()).map(([category, motors]) => {
                        const filtered = filteredMotors(motors);
                        if (filtered.length === 0) return null;
                        
                        return (
                          <optgroup key={category} label={`Motor ${category.charAt(0).toUpperCase() + category.slice(1)} (${filtered.length})`}>
                            {filtered.map(motor => (
                              <option key={motor.model} value={motor.model}>
                                {motor.model.charAt(0).toUpperCase() + motor.model.slice(1)} 
                                {motor.aliases.length > 0 && ` (${motor.aliases[0]})`}
                              </option>
                            ))}
                          </optgroup>
                        );
                      })}
                    </select>
                  </div>

                  {/* Motor Info Display */}
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                    <h4 className="font-bold text-yellow-900 mb-6 text-lg">
                      🏍️ {motorData.model.charAt(0).toUpperCase() + motorData.model.slice(1)}
                    </h4>
                    <div className="grid grid-cols-2 gap-6 text-sm">
                      <div className="space-y-3">
                        <span className="text-yellow-800 font-bold text-base block">Repaint Size:</span>
                        <div className="bg-yellow-300 text-yellow-900 px-4 py-2 rounded-full inline-block font-bold text-lg">
                          {motorData.repaint_size}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <span className="text-yellow-800 font-bold text-base block">Detailing Size:</span>
                        <div className="bg-green-300 text-green-900 px-4 py-2 rounded-full inline-block font-bold text-lg">
                          {motorData.service_size}
                        </div>
                      </div>
                    </div>
                    {motorData.aliases.length > 0 && (
                      <div className="mt-4">
                        <span className="text-yellow-800 font-bold text-base">Alias:</span>
                        <span className="text-yellow-900 text-sm ml-3 bg-yellow-200 px-3 py-2 rounded-lg font-medium">
                          {motorData.aliases.slice(0, 3).join(', ')}
                          {motorData.aliases.length > 3 && '...'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Selection */}
            <Card className="border-2 border-yellow-200 hover:border-yellow-300 transition-colors shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-t-lg">
                <CardTitle>Pilih Layanan</CardTitle>
                <CardDescription className="text-orange-50">
                  Centang layanan yang lo butuhkan. Bundling repaint + detailing dapat diskon!
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-gradient-to-br from-white to-gray-50 p-6">
                <div className="space-y-3">
                  {serviceOptions.map(service => (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedServices.includes(service.id)
                          ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md'
                          : 'border-gray-200 hover:border-yellow-300 hover:bg-gradient-to-br hover:from-yellow-50 hover:to-yellow-100 bg-gradient-to-br from-white to-gray-50'
                      } ${service.required ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{service.icon}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-800 text-lg">{service.name}</span>
                              {service.required && <Badge variant="secondary" className="text-xs">Wajib</Badge>}
                              {service.popular && <Badge className="text-xs bg-green-100 text-green-700">Populer</Badge>}
                            </div>
                            <p className="text-sm text-gray-700 font-medium mt-1">{service.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-orange-600 text-xl">
                            {service.id === 'repaint' 
                              ? formatPrice(service.getSizePrice(motorData.repaint_size))
                              : service.id === 'detailing'
                              ? formatPrice(service.getSizePrice(motorData.service_size))
                              : formatPrice(service.getSizePrice(motorData.repaint_size))
                            }
                          </div>
                          {service.duration > 0 && (
                            <div className="text-sm text-gray-600 font-medium">+{service.duration} hari</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-2 border-yellow-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Estimasi Total
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-gradient-to-br from-white to-gray-50 p-6">
                <div className="space-y-6">
                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-base">
                      <span className="font-bold text-gray-700">Harga Normal:</span>
                      <span className={calculation.savings > 0 ? 'line-through text-gray-500 font-medium' : 'font-bold text-gray-800'}>
                        Rp {calculation.basePrice.toLocaleString()}
                      </span>
                    </div>
                    
                    {calculation.savings > 0 && (
                      <>
                        <div className="flex justify-between text-base text-green-700">
                          <span className="font-bold">Diskon Bundling:</span>
                          <span className="font-bold">-Rp {calculation.bundleDiscount.toLocaleString()}</span>
                        </div>
                        <hr className="border-gray-300" />
                      </>
                    )}
                    
                    <div className="flex justify-between text-xl font-bold text-orange-700">
                      <span>Total Bayar:</span>
                      <span>Rp {calculation.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Savings Highlight */}
                  {calculation.savings > 0 && (
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-800">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-bold text-lg">Hemat {calculation.savingsPercent}%!</span>
                      </div>
                      <p className="text-base text-green-700 mt-2 font-medium">
                        Lo udah ngirit Rp {calculation.savings.toLocaleString()} dengan paket bundling!
                      </p>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="space-y-3 text-base text-gray-700">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Estimasi: {calculation.estimatedDays} hari kerja</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Pickup & delivery tersedia</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Garansi 30 hari</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    onClick={onCtaClick}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Book Sekarang via WhatsApp
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  {/* Promo Notice */}
                  {hasPromoBundle && (
                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 text-center">
                      <p className="text-base text-yellow-800 font-bold">
                        🔥 <strong>Bundling Detected!</strong> Lo dapet harga promo spesial karena ambil repaint + detailing bareng.
                      </p>
                      <p className="text-sm text-yellow-700 mt-2 font-medium">
                        Harga sudah sesuai data bisnis real dari owner Bosmat Studio
                      </p>
                    </div>
                  )}

                  {/* Pricing Note */}
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 text-center">
                    <p className="text-sm text-yellow-800 font-bold">
                      💡 <strong>Database Motor Lengkap:</strong> Harga sudah disesuaikan per motor sesuai ukuran repaint dan detailing yang spesifik. 
                      Motor {motorData.model} pakai repaint size {motorData.repaint_size} dan detailing size {motorData.service_size}.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-700 font-medium">Garansi 30 Hari</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-700 font-medium">Tepat Waktu</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm text-gray-700 font-medium">Kualitas Premium</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <MessageCircle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm text-gray-700 font-medium">Support 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
