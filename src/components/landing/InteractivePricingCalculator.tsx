"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Calculator, Sparkles, TrendingDown, Zap, Check, ChevronsUpDown } from 'lucide-react';

interface InteractivePricingCalculatorProps {
  onCtaClick: () => void;
}

interface VehicleModel {
  id: string;
  brand: string;
  modelName: string;
  serviceSize: string;
  repaintSize: string;
}

interface ServicePrice {
  id: string;
  size: string | null;
  vehicleModelId: string | null;
  price: number;
}

interface Service {
  id: string;
  name: string;
  category: string;
  usesModelPricing: boolean;
  prices: ServicePrice[];
}

interface Surcharge {
  id: string;
  name: string;
  amount: number;
}

export default function InteractivePricingCalculator({ onCtaClick }: InteractivePricingCalculatorProps) {
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [surcharges, setSurcharges] = useState<Surcharge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedMotorId, setSelectedMotorId] = useState<string>('');
  const [selectedColorId, setSelectedColorId] = useState<string>('normal');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Repaint Bodi Halus', 'Full Detailing Glossy']);
  const [motorComboboxOpen, setMotorComboboxOpen] = useState(false);

  useEffect(() => {
    async function fetchPricing() {
      try {
        const res = await fetch('/api/pricing');
        const json = await res.json();
        if (json.success) {
          setVehicleModels(json.data.vehicleModels);
          setServices(json.data.services);
          setSurcharges(json.data.surcharges);
        }
      } catch (error) {
        console.error("Failed to load pricing data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPricing();
  }, []);

  const motorsByCategory = vehicleModels.reduce((acc: any, motor) => {
    const category = motor.brand || 'Lainnya';
    if (!acc[category]) acc[category] = [];
    acc[category].push(motor);
    return acc;
  }, {});

  const getSelectedMotorInfo = () => {
    return vehicleModels.find(m => m.id === selectedMotorId) || null;
  };

  const getServicePrice = (serviceName: string, motor: VehicleModel | null): number => {
    if (!motor) return 0;
    const service = services.find(s => s.name === serviceName);
    if (!service) return 0;

    if (service.usesModelPricing) {
      const sp = service.prices.find(p => p.vehicleModelId === motor.id);
      return sp ? sp.price : 0;
    } else {
      // Find by size. Assuming repaint services use repaintSize and others use serviceSize
      const sizeToUse = service.category === 'repaint' ? motor.repaintSize : motor.serviceSize;
      const sp = service.prices.find(p => p.size === sizeToUse);
      return sp ? sp.price : 0;
    }
  };

  const getSurchargeAmount = (colorId: string) => {
    if (colorId === 'normal') return 0;
    const surcharge = surcharges.find(s => s.id === colorId);
    return surcharge ? surcharge.amount : 0;
  };

  const calculateTotal = () => {
    const motor = getSelectedMotorInfo();
    if (!motor) return 0;

    const colorSurcharge = getSurchargeAmount(selectedColorId);
    const servicesTotal = selectedServices.reduce((total, serviceName) => {
      return total + getServicePrice(serviceName, motor);
    }, 0);

    return servicesTotal + colorSurcharge;
  };

  const toggleService = (serviceName: string) => {
    // Prevent unchecking the default base service (Repaint Bodi Halus) if it's the core package
    if (serviceName === 'Repaint Bodi Halus') return;
    
    setSelectedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const availableServicesList = [
    { name: 'Repaint Bodi Halus', label: 'Repaint Bodi Halus', included: true },
    { name: 'Full Detailing Glossy', label: 'Full Detailing', included: false },
    { name: 'Repaint Velg', label: 'Repaint Velg', included: false },
    { name: 'Repaint Bodi Kasar', label: 'Repaint Bodi Kasar', included: false },
    { name: 'Repaint Cover CVT', label: 'Repaint Cover CVT', included: false },
    { name: 'Repaint Arm', label: 'Repaint Arm', included: false },
    { name: 'Coating Motor Glossy', label: 'Ceramic Coating Glossy', included: false },
  ];

  const totalEstimasi = calculateTotal();

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
            Lihat estimasi harga langsung!
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500 font-medium">Memuat data harga real-time...</p>
          </div>
        ) : (
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
                    <Popover open={motorComboboxOpen} onOpenChange={setMotorComboboxOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={motorComboboxOpen}
                          className="w-full h-12 justify-between bg-white border-gray-300 font-normal hover:bg-white"
                        >
                          {selectedMotorId
                            ? vehicleModels.find((motor) => motor.id === selectedMotorId)?.modelName
                            : "Cari motor lo di sini..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-white" align="start">
                        <Command className="bg-white">
                          <CommandInput placeholder="Ketik nama motor atau merek..." className="border-none focus:ring-0" />
                          <CommandList className="max-h-[300px]">
                            <CommandEmpty>Motor tidak ditemukan.</CommandEmpty>
                            {Object.entries(motorsByCategory).map(([category, motors]: [string, any]) => (
                              <CommandGroup key={category} heading={category}>
                                {motors.map((motor: any) => (
                                  <CommandItem
                                    key={motor.id}
                                    value={`${category} ${motor.modelName}`}
                                    onSelect={() => {
                                      setSelectedMotorId(motor.id === selectedMotorId ? "" : motor.id)
                                      setMotorComboboxOpen(false)
                                    }}
                                    className="cursor-pointer hover:bg-gray-50 aria-selected:bg-gray-100"
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <div className="flex items-center gap-2">
                                        <Check
                                          className={`h-4 w-4 ${
                                            selectedMotorId === motor.id ? "opacity-100 text-green-600" : "opacity-0"
                                          }`}
                                        />
                                        <span className="text-gray-900">{motor.modelName}</span>
                                      </div>
                                      <Badge className="ml-2 bg-blue-100 text-blue-700 text-xs">
                                        Paket {motor.repaintSize}
                                      </Badge>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {selectedMotorId && (
                      <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          ✅ Motor: <strong>{getSelectedMotorInfo()?.modelName}</strong> - Paket {getSelectedMotorInfo()?.repaintSize}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      2. Pilih Warna Impian
                    </label>
                    <Select value={selectedColorId} onValueChange={setSelectedColorId}>
                      <SelectTrigger className="w-full h-12 text-left bg-white border-gray-300">
                        <SelectValue placeholder="Pilih warna cat" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="normal" className="bg-white hover:bg-gray-50">
                          <div className="flex items-center justify-between w-full">
                            <span className="text-gray-900">Warna Normal / Solid / Metallic</span>
                          </div>
                        </SelectItem>
                        {surcharges.map((surcharge) => (
                          <SelectItem key={surcharge.id} value={surcharge.id} className="bg-white hover:bg-gray-50">
                            <div className="flex items-center justify-between w-full">
                              <span className="text-gray-900">{surcharge.name}</span>
                              <span className="ml-2 text-sm text-orange-600">
                                +Rp {surcharge.amount.toLocaleString('id-ID')}
                              </span>
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
                      {availableServicesList.map((service) => {
                        const price = getServicePrice(service.name, getSelectedMotorInfo());
                        // Only show services that exist in the database with a valid price
                        if (price === 0 && selectedMotorId) return null;

                        const isSelected = selectedServices.includes(service.name);

                        return (
                          <div
                            key={service.name}
                            className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-300 bg-white ${
                              isSelected
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 hover:border-green-300'
                            } ${service.included ? 'opacity-100 cursor-not-allowed' : 'cursor-pointer'}`}
                            onClick={() => toggleService(service.name)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                isSelected
                                  ? 'border-green-500 bg-green-500 text-white'
                                  : 'border-gray-300'
                              }`}>
                                {isSelected && '✓'}
                              </div>
                              <span className="font-medium text-gray-900">
                                {service.label}
                              </span>
                              {service.included && (
                                <Badge className="bg-blue-500 text-white text-xs">WAJIB</Badge>
                              )}
                            </div>
                            <span className="font-semibold text-gray-700">
                              {price > 0 ? `+Rp ${price.toLocaleString('id-ID')}` : '-'}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="shadow-xl transition-all duration-500 bg-white border border-gray-200">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingDown className="w-5 h-5" />
                      Estimasi Biaya
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    
                    {/* Selected Package */}
                    {selectedMotorId && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Motor Dipilih:</h4>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="font-bold text-blue-900">{getSelectedMotorInfo()?.modelName}</p>
                          <p className="text-sm text-blue-700">
                            Paket {getSelectedMotorInfo()?.repaintSize}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedMotorId ? (
                      <>
                        <div className="flex flex-col items-center py-6 mb-6 border-y border-gray-100">
                          <span className="text-gray-600 mb-2">Total Estimasi Biaya</span>
                          <span className="font-bold text-green-600 text-3xl text-center">
                            Rp {totalEstimasi.toLocaleString('id-ID')}
                          </span>
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
                        disabled={!selectedMotorId}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        {selectedMotorId ? 'Booking Sekarang!' : 'Pilih Motor Dulu'}
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
        )}

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
