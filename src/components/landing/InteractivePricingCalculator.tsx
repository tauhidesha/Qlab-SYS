"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calculator, Sparkles, TrendingDown, Zap } from 'lucide-react';
import promoBundling from '@/data/promoBundling';
import daftarUkuranMotor from '@/data/daftarUkuranMotor';
import hargaLayanan from '@/data/hargaLayanan';

interface InteractivePricingCalculatorProps {
  onCtaClick: () => void;
}

interface PricingOption {
  size: string;
  basePrice: number;
  promoPrice: number;
  features: string[];
}

export default function InteractivePricingCalculator({ onCtaClick }: InteractivePricingCalculatorProps) {
  const [selectedMotor, setSelectedMotor] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('normal');
  const [selectedServices, setSelectedServices] = useState<string[]>(['repaint', 'detailing']);
  const [animationStep, setAnimationStep] = useState(0);

  // Get motor data and group by category
  const motorData = daftarUkuranMotor as any[];
  const motorsByCategory = motorData.reduce((acc: any, motor: any) => {
    if (!motor.model || !motor.repaint_size) return acc;
    
    const category = motor.type || 'Lainnya';
    if (!acc[category]) acc[category] = [];
    acc[category].push(motor);
    return acc;
  }, {});

  // Get selected motor info
  const getSelectedMotorInfo = () => {
    if (!selectedMotor) return null;
    return motorData.find(motor => motor.model === selectedMotor);
  };

  // Get pricing based on motor size
  const getPricingForSize = (size: string) => {
    return promoBundling.find(item => item.repaintSize === size) || promoBundling[1];
  };

  const colorOptions = [
    { value: 'normal', label: 'Warna Normal', surcharge: 0 },
    { value: 'candy', label: 'Candy Color', surcharge: 0, badge: 'GRATIS!' },
    { value: 'moonlight', label: 'Moonlight Pearl', surcharge: 0, badge: 'GRATIS!' },
    { value: 'xyrallic', label: 'Xyrallic Metallic', surcharge: 0, badge: 'GRATIS!' },
    { value: 'bunglon', label: 'Cat Bunglon', surcharge: 450000 },
  ];

  const serviceOptions = [
    { value: 'repaint', label: 'Repaint Bodi Halus', included: true },
    { value: 'detailing', label: 'Full Detailing', included: true },
    { 
      value: 'repaint_velg', 
      label: 'Repaint Velg', 
      getSizePrice: (size: string) => {
        const repaintVelgData = hargaLayanan.find(h => h.name === "Repaint Velg");
        const variant = repaintVelgData?.variants?.find(v => v.name === size);
        return variant ? variant.price : 350000;
      }
    },
    { 
      value: 'repaint_kasar', 
      label: 'Repaint Bodi Kasar', 
      getSizePrice: (size: string) => {
        const repaintKasarData = hargaLayanan.find(h => h.name === "Repaint Bodi Kasar");
        const variant = repaintKasarData?.variants?.find(v => v.name === size);
        return variant ? variant.price : 300000;
      }
    },
    { 
      value: 'repaint_arm', 
      label: 'Repaint Cover CVT / Arm', 
      price: 150000
    },
    { 
      value: 'ceramic_coating', 
      label: 'Ceramic Coating Glossy', 
      getSizePrice: (size: string) => {
        // Harga ceramic coating = complete service - full detailing
        const completeServiceData = hargaLayanan.find(h => h.name === "Complete Service Glossy");
        const fullDetailingData = hargaLayanan.find(h => h.name === "Full Detailing Glossy");
        
        const completeServiceVariant = completeServiceData?.variants?.find(v => v.name === size);
        const fullDetailingVariant = fullDetailingData?.variants?.find(v => v.name === size);
        
        const completeServicePrice = completeServiceVariant ? completeServiceVariant.price : 750000;
        const fullDetailingPrice = fullDetailingVariant ? fullDetailingVariant.price : 450000;
        
        return completeServicePrice - fullDetailingPrice;
      }
    },
  ];

  // Animation sequence
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentOption = () => {
    const motorInfo = getSelectedMotorInfo();
    if (!motorInfo) return promoBundling[1]; // Default to M
    return getPricingForSize(motorInfo.repaint_size);
  };

  const calculateTotal = () => {
    const baseOption = getCurrentOption();
    const motorInfo = getSelectedMotorInfo();
    const motorSize = motorInfo?.repaint_size || 'M';
    
    const colorSurcharge = colorOptions.find(c => c.value === selectedColor)?.surcharge || 0;
    const additionalServices = selectedServices
      .filter(service => service !== 'repaint' && service !== 'detailing')
      .reduce((total, service) => {
        const serviceOption = serviceOptions.find(s => s.value === service);
        if (serviceOption?.getSizePrice) {
          return total + serviceOption.getSizePrice(motorSize);
        }
        const servicePrice = serviceOption?.price || 0;
        return total + servicePrice;
      }, 0);

    return {
      basePrice: baseOption.promoPrice + colorSurcharge + additionalServices,
      originalPrice: baseOption.normalPriceWithMaxSurcharge + colorSurcharge + additionalServices,
      savings: (baseOption.normalPriceWithMaxSurcharge + colorSurcharge + additionalServices) - (baseOption.promoPrice + colorSurcharge + additionalServices)
    };
  };

  const toggleService = (service: string) => {
    // Can't remove services that are included
    const serviceOption = serviceOptions.find(s => s.value === service);
    if (serviceOption?.included) return;
    
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const totals = calculateTotal();

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Calculator className="w-4 h-4 mr-2" />
            Interactive Calculator
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🧮 Hitung Biaya Motor Lo Real-Time
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pilih motor, warna impian, dan service tambahan. 
            Lihat estimasi harga langsung dengan promo yang berlaku!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Calculator Panel */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border border-blue-200 bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Kustomisasi Paket Lo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6 bg-white">
                
                {/* Motor Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    1. Pilih Motor Lo
                  </label>
                  <Select value={selectedMotor} onValueChange={setSelectedMotor}>
                    <SelectTrigger className="w-full h-12 text-left bg-white border-gray-300">
                      <SelectValue placeholder="Cari motor lo di sini..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {Object.entries(motorsByCategory).map(([category, motors]: [string, any]) => (
                        <div key={category}>
                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100">
                            {category}
                          </div>
                          {motors.map((motor: any) => (
                            <SelectItem key={motor.model} value={motor.model} className="bg-white hover:bg-gray-50">
                              <div className="flex items-center justify-between w-full">
                                <span className="text-gray-900">{motor.model}</span>
                                <Badge className="ml-2 bg-blue-100 text-blue-700 text-xs">
                                  Paket {motor.repaint_size}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedMotor && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        ✅ Motor: <strong>{selectedMotor}</strong> - Paket {getSelectedMotorInfo()?.repaint_size}
                      </p>
                    </div>
                  )}
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    2. Pilih Warna Impian
                  </label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="w-full h-12 text-left bg-white border-gray-300">
                      <SelectValue placeholder="Pilih warna cat" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {colorOptions.map((color) => (
                        <SelectItem key={color.value} value={color.value} className="bg-white hover:bg-gray-50">
                          <div className="flex items-center justify-between w-full">
                            <span className="text-gray-900">{color.label}</span>
                            {color.badge && (
                              <Badge className="ml-2 bg-green-500 text-white text-xs">
                                {color.badge}
                              </Badge>
                            )}
                            {color.surcharge > 0 && (
                              <span className="ml-2 text-sm text-orange-600">
                                +Rp {color.surcharge.toLocaleString('id-ID')}
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Services */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    3. Pilihan Service Repaint & Tambahan (Opsional)
                  </label>
                  <div className="space-y-3">
                    {serviceOptions.map((service) => (
                      <div
                        key={service.value}
                        className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-300 bg-white ${
                          selectedServices.includes(service.value)
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        } ${service.included ? 'opacity-100' : 'cursor-pointer'}`}
                        onClick={() => !service.included && toggleService(service.value)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selectedServices.includes(service.value)
                              ? 'border-green-500 bg-green-500 text-white'
                              : 'border-gray-300'
                          }`}>
                            {selectedServices.includes(service.value) && '✓'}
                          </div>
                          <span className="font-medium text-gray-900">
                            {service.label}
                          </span>
                          {service.included && (
                            <Badge className="bg-blue-500 text-white text-xs">INCLUDED</Badge>
                          )}
                        </div>
                        {service.getSizePrice && (
                          <span className="font-semibold text-gray-700">
                            +Rp {service.getSizePrice(getSelectedMotorInfo()?.repaint_size || 'M').toLocaleString('id-ID')}
                          </span>
                        )}
                        {service.price && (
                          <span className="font-semibold text-gray-700">
                            +Rp {service.price.toLocaleString('id-ID')}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className={`shadow-xl transition-all duration-500 bg-white border border-gray-200 ${
                animationStep === 0 ? 'transform scale-105 shadow-2xl' : ''
              }`}>
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5" />
                    Estimasi Biaya
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                  
                  {/* Selected Package */}
                  {selectedMotor && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Motor Dipilih:</h4>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="font-bold text-blue-900">{selectedMotor}</p>
                        <p className="text-sm text-blue-700">
                          Paket {getSelectedMotorInfo()?.repaint_size} • Full Repaint + Detailing
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedMotor ? (
                    <>
                      {/* Price Breakdown */}
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Harga Normal:</span>
                          <span className="text-gray-500 line-through">
                            Rp {totals.originalPrice.toLocaleString('id-ID')}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Harga Promo:</span>
                          <span className="font-bold text-green-600 text-lg">
                            Rp {totals.basePrice.toLocaleString('id-ID')}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2">
                          <span className="text-green-700 font-semibold">Hemat:</span>
                          <span className="font-bold text-green-600">
                            Rp {totals.savings.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>

                      {/* Savings Badge */}
                      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-xl p-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl mb-2">🎉</div>
                          <p className="font-bold text-orange-800">
                            Total Hemat
                          </p>
                          <p className="text-2xl font-bold text-orange-600">
                            Rp {totals.savings.toLocaleString('id-ID')}
                          </p>
                          <p className="text-xs text-orange-700 mt-1">
                            vs harga normal bengkel lain
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🏍️</div>
                      <p className="text-gray-500">Pilih motor lo dulu untuk lihat estimasi harga</p>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Button 
                      onClick={onCtaClick}
                      disabled={!selectedMotor}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      {selectedMotor ? 'Booking Sekarang!' : 'Pilih Motor Dulu'}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={onCtaClick}
                      className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl bg-white"
                    >
                      Konsultasi Gratis Dulu
                    </Button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <div className="text-lg font-bold text-green-600">30</div>
                        <div className="text-xs text-gray-600">Hari Garansi</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">7-14</div>
                        <div className="text-xs text-gray-600">Hari Kerja</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              💡 Estimasi ini 90% akurat dengan harga real!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Tim kami akan kasih quote final yang lebih detail via WhatsApp. 
              Gak ada biaya hidden, semua transparan!
            </p>
            <Button 
              onClick={onCtaClick}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Chat untuk Konfirmasi Harga 💬
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
