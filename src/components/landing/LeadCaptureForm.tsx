'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, ArrowLeft, Phone, MessageCircle, Star, Sparkles } from 'lucide-react';
import hargaLayanan from '@/data/hargaLayanan';
import deskripsiLayanan from '@/data/deskripsiLayanan';
import promoBundling from '@/data/promoBundling';

// Process service data from hargaLayanan
const processServiceData = () => {
  const serviceCategories: any = {
    'promo': {
      name: '🔥 PROMO BUNDLING SPESIAL',
      priority: 1,
      services: []
    },
    'repaint': {
      name: 'Repaint & Bodywork',
      priority: 2,
      services: []
    },
    'detailing': {
      name: 'Detailing & Restoration', 
      priority: 3,
      services: []
    },
    'coating': {
      name: 'Coating & Protection',
      priority: 4,
      services: []
    }
  };

  // Add PROMO BUNDLING as single highlighted package
  const maxSpecialColorCost = 450000; // Biaya cat spesial tertinggi (XL Bunglon/Moonlight/dll)
  const maxNormalPrice = Math.max(...promoBundling.map(p => p.normalPrice));
  const maxPromoPrice = Math.max(...promoBundling.map(p => p.promoPrice));
  const totalMaxSavings = (maxNormalPrice + maxSpecialColorCost) - maxPromoPrice;
  
  serviceCategories.promo.services.push({
    id: 'promo-bundling-special',
    name: 'Paket Repaint + Detailing BEBAS WARNA',
    price: '1.2jt - 2.2jt',
    duration: '5-6 hari kerja',
    popular: true,
    summary: 'Repaint bodi halus + full detailing. BEBAS PILIH WARNA termasuk cat spesial seperti candy, bunglon, moonlight, dll. Hemat hingga 800rb!',
    normalPrice: maxNormalPrice + maxSpecialColorCost,
    promoPrice: maxPromoPrice,
    savings: `Hemat hingga 800rb`,
    savingsPercent: Math.round(totalMaxSavings / (maxNormalPrice + maxSpecialColorCost) * 100),
    isPromo: true,
    isSpecialHighlight: true,
    variants: promoBundling.map(p => ({
      name: p.repaintSize,
      price: p.promoPrice,
      normalPrice: p.normalPrice + maxSpecialColorCost, // Include max special color cost
      savings: (p.normalPrice + maxSpecialColorCost) - p.promoPrice
    }))
  });

  // Add regular services
  hargaLayanan.forEach(service => {
    const description = deskripsiLayanan.find(desc => desc.name === service.name);
    
    let priceRange = '';
    let duration = '';
    
    if (service.variants && service.variants.length > 0) {
      const minPrice = Math.min(...service.variants.map(v => v.price));
      const maxPrice = Math.max(...service.variants.map(v => v.price));
      
      if (minPrice >= 1000000) {
        priceRange = `${(minPrice/1000000).toFixed(1)} - ${(maxPrice/1000000).toFixed(1)} jt`;
      } else {
        priceRange = `${(minPrice/1000).toFixed(0)}rb - ${(maxPrice/1000).toFixed(0)}rb`;
      }
    } else if (service.price > 0) {
      if (service.price >= 1000000) {
        priceRange = `${(service.price/1000000).toFixed(1)} jt`;
      } else {
        priceRange = `${(service.price/1000).toFixed(0)}rb`;
      }
    }

    // Convert duration from minutes to readable format
    if (service.estimatedDuration) {
      const minutes = parseInt(service.estimatedDuration);
      if (minutes >= 1440) { // >= 1 day
        duration = `${Math.round(minutes/1440)} hari`;
      } else if (minutes >= 60) { // >= 1 hour
        duration = `${Math.round(minutes/60)} jam`;
      } else {
        duration = `${minutes} menit`;
      }
    }

    const isPopular = ['Full Detailing Glossy', 'Coating Motor Glossy', 'Repaint Bodi Halus'].includes(service.name);
    
    if (serviceCategories[service.category]) {
      serviceCategories[service.category].services.push({
        id: service.name.toLowerCase().replace(/\s+/g, '-'),
        name: service.name,
        price: priceRange,
        duration: duration,
        popular: isPopular,
        summary: description?.summary || '',
        variants: service.variants || []
      });
    }
  });

  return serviceCategories;
};

const serviceCategories = processServiceData();

const vehicleTypes = [
  { id: 'S', name: 'Motor Kecil (S)', multiplier: 1, description: 'Bebek, Vario, Beat, dll' },
  { id: 'M', name: 'Motor Sedang (M)', multiplier: 1.25, description: 'PCX, N-Max, Aerox, dll' },
  { id: 'L', name: 'Motor Besar (L)', multiplier: 1.4, description: 'R15, CBR, Ninja, dll' },
  { id: 'XL', name: 'Motor Jumbo (XL)', multiplier: 1.9, description: 'Big Bike, Harley, dll' }
];

interface FormData {
  // Step 1: Service Selection
  selectedCategory: string;
  selectedServices: string[];
  vehicleType: string;
  
  // Step 2: Vehicle Details
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  vehicleCondition: string;
  
  // Step 3: Contact & Preferences
  name: string;
  phone: string;
  email: string;
  location: string;
  preferredDate: string;
  additionalNotes: string;
  
  // Marketing
  hearAboutUs: string;
}

export default function LeadCaptureForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    selectedCategory: '',
    selectedServices: [],
    vehicleType: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    vehicleCondition: '',
    name: '',
    phone: '',
    email: '',
    location: '',
    preferredDate: '',
    additionalNotes: '',
    hearAboutUs: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 3;

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    // Scroll to top of form smoothly when changing steps
    setTimeout(() => {
      document.querySelector('.lead-capture-form')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const toggleService = (serviceId: string) => {
    const currentServices = formData.selectedServices;
    if (currentServices.includes(serviceId)) {
      updateFormData('selectedServices', currentServices.filter(id => id !== serviceId));
    } else {
      updateFormData('selectedServices', [...currentServices, serviceId]);
    }
  };

  const getEstimatedPrice = () => {
    if (!formData.selectedServices.length || !formData.vehicleType) return null;
    
    let totalMin = 0;
    let totalMax = 0;
    
    formData.selectedServices.forEach(serviceId => {
      for (const category of Object.values(serviceCategories)) {
        const service = (category as any).services.find((s: any) => s.id === serviceId);
        if (service) {
          if (service.isPromo && service.id === 'promo-bundling-special') {
            // For promo bundling, use vehicle size specific price
            const variant = service.variants.find((v: any) => v.name === formData.vehicleType);
            if (variant) {
              totalMin += variant.price;
              totalMax += variant.price;
            } else {
              // Fallback to min/max if exact size not found
              const prices = service.variants.map((v: any) => v.price);
              totalMin += Math.min(...prices);
              totalMax += Math.max(...prices);
            }
          } else if (service.variants && service.variants.length > 0) {
            // Use vehicle size to get specific variant price
            const variant = service.variants.find((v: any) => v.name === formData.vehicleType);
            if (variant) {
              totalMin += variant.price;
              totalMax += variant.price;
            } else {
              // Fallback to min/max if exact size not found
              const prices = service.variants.map((v: any) => v.price);
              totalMin += Math.min(...prices);
              totalMax += Math.max(...prices);
            }
          } else {
            // Parse price range from string
            const priceStr = service.price.replace(/[^\d.-]/g, '');
            if (priceStr.includes('-')) {
              const [min, max] = priceStr.split('-').map((p: string) => parseFloat(p) * (service.price.includes('jt') ? 1000000 : 1000));
              totalMin += min;
              totalMax += max;
            } else {
              const price = parseFloat(priceStr) * (service.price.includes('jt') ? 1000000 : 1000);
              totalMin += price;
              totalMax += price;
            }
          }
        }
      }
    });
    
    // Don't apply multiplier for promo bundles as they have fixed prices
    const hasPromo = formData.selectedServices.includes('promo-bundling-special');
    if (!hasPromo) {
      const vehicleMultiplier = vehicleTypes.find(v => v.id === formData.vehicleType)?.multiplier || 1;
      totalMin = Math.round(totalMin * vehicleMultiplier);
      totalMax = Math.round(totalMax * vehicleMultiplier);
    }
    
    if (totalMin >= 1000000) {
      if (totalMin === totalMax) {
        return `${(totalMin/1000000).toFixed(1)} jt`;
      } else {
        return `${(totalMin/1000000).toFixed(1)} - ${(totalMax/1000000).toFixed(1)} jt`;
      }
    } else {
      if (totalMin === totalMax) {
        return `${(totalMin/1000).toFixed(0)}rb`;
      } else {
        return `${(totalMin/1000).toFixed(0)}rb - ${(totalMax/1000).toFixed(0)}rb`;
      }
    }
  };

  const canProceedToStep = (step: number) => {
    switch (step) {
      case 2:
        return formData.selectedServices.length > 0 && formData.vehicleType;
      case 3:
        return formData.vehicleBrand && formData.vehicleModel && formData.vehicleYear;
      default:
        return true;
    }
  };

  const isFormValid = () => {
    return formData.name && formData.phone && 
           formData.selectedServices.length > 0 && 
           formData.vehicleType;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare WhatsApp message with detailed service info
      const selectedServicesDetails = formData.selectedServices.map(serviceId => {
        for (const category of Object.values(serviceCategories)) {
          const service = (category as any).services.find((s: any) => s.id === serviceId);
          if (service) {
            let priceInfo = service.price;
            
            if (service.id === 'promo-bundling-special') {
              const variant = service.variants.find((v: any) => v.name === formData.vehicleType);
              if (variant) {
                priceInfo = `Rp ${variant.price.toLocaleString('id-ID')} (HEMAT ${(variant.savings/1000).toFixed(0)}rb!)`;
              } else {
                priceInfo = `${service.price} (${service.savings})`;
              }
              return `🔥 ${service.name} - ${priceInfo}`;
            } else if (service.variants && service.variants.length > 0) {
              const variant = service.variants.find((v: any) => v.name === formData.vehicleType);
              if (variant) {
                priceInfo = `Rp ${variant.price.toLocaleString('id-ID')}`;
              }
            }
            return `• ${service.name} - ${priceInfo}`;
          }
        }
        return `• ${serviceId}`;
      }).filter(Boolean).join('\n');

      const vehicleTypeName = vehicleTypes.find(v => v.id === formData.vehicleType)?.name || formData.vehicleType;
      const estimatedPrice = getEstimatedPrice();
      
      const hasPromo = formData.selectedServices.includes('promo-bundling-special');
      
      const message = `*${hasPromo ? '🔥 PROMO BUNDLING - Lead dari Website' : 'KONSULTASI GRATIS - Lead dari Website'}* 📋

*LAYANAN YANG DIMINATI:*
${selectedServicesDetails}

*DETAIL MOTOR:*
• Ukuran: ${vehicleTypeName}
• Merek/Model: ${formData.vehicleBrand} ${formData.vehicleModel}
• Tahun: ${formData.vehicleYear}
• Warna: ${formData.vehicleColor}
• Kondisi: ${formData.vehicleCondition}

*ESTIMASI HARGA:* Rp ${estimatedPrice}

*KONTAK CUSTOMER:*
• Nama: ${formData.name}
• No. HP: ${formData.phone}
• Email: ${formData.email}
• Lokasi: ${formData.location}
• Waktu Preferred: ${formData.preferredDate}

*CATATAN TAMBAHAN:*
${formData.additionalNotes || 'Tidak ada'}

*SUMBER:* ${formData.hearAboutUs || 'Website'}

${hasPromo ? '🔥 **PRIORITAS TINGGI: CUSTOMER TERTARIK PROMO BUNDLING!**' : ''}
---
*Tim, tolong follow up untuk konsultasi gratis dan jadwalkan survey jika diperlukan* 🏍️✨`;

      // Send to WhatsApp Business
      const whatsappUrl = `https://wa.me/62895401527556?text=${encodeURIComponent(message)}`;
      
      // Track conversion event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Lead Generation',
          event_label: 'Lead Capture Form',
          value: 1,
          currency: 'IDR'
        });
      }
      
      // Meta Pixel tracking
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Lead Capture Form',
          content_category: 'Lead Generation',
          value: 1,
          currency: 'IDR'
        });
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      
      // Open WhatsApp after short delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 2000);
      
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto bg-white shadow-lg border-0 animate-in fade-in duration-500">
        <CardContent className="text-center py-12 bg-white">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Terima Kasih! 🎉
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Permintaan konsultasi Anda telah kami terima. Tim Bosmat akan segera menghubungi Anda melalui WhatsApp untuk konsultasi gratis.
          </p>
          <div className="space-y-4">
            <Button 
              onClick={() => {
                // Smooth scroll to top of lead capture section instead of reload
                document.querySelector('.lead-capture-section')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
                // Reset form after short delay
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              }} 
              variant="outline" 
              className="w-full sm:w-auto"
            >
              Buat Permintaan Lain
            </Button>
            <div className="text-center">
              <Button 
                onClick={() => {
                  // Smooth scroll to top of page
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                variant="ghost" 
                className="text-blue-600 hover:text-blue-700"
              >
                Kembali ke Beranda
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-transparent lead-capture-form">
      {/* Progress Bar */}
      <div className="mb-8 bg-transparent">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Konsultasi Gratis</h2>
          <span className="text-sm text-gray-700 font-semibold">Langkah {currentStep} dari {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <Card className="bg-gradient-to-br from-blue-50 via-white to-blue-50 shadow-xl border border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="text-xl font-bold">
            {currentStep === 1 && "Pilih Layanan & Motor"}
            {currentStep === 2 && "Detail Motor"}
            {currentStep === 3 && "Informasi Kontak"}
          </CardTitle>
          <CardDescription className="text-blue-100 font-medium mt-2">
            {currentStep === 1 && "Pilih layanan yang Anda butuhkan dan jenis motor"}
            {currentStep === 2 && "Berikan detail motor untuk estimasi yang lebih akurat"}
            {currentStep === 3 && "Informasi kontak untuk konsultasi gratis"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 bg-gradient-to-br from-white via-blue-50/30 to-white">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Service Categories */}
              <div>
                <Label className="text-lg font-bold mb-4 block text-gray-900">Layanan yang Diminati</Label>
                <div className="space-y-6">
                  {/* PROMO BUNDLING - Special Highlight */}
                  {Object.entries(serviceCategories)
                    .sort(([,a], [,b]) => (a.priority || 999) - (b.priority || 999))
                    .map(([categoryId, category]) => {
                      if (categoryId === 'promo') {
                        return (
                          <div key={categoryId} className="space-y-3">
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-lg text-white relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-2">
                                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                              </div>
                              <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                                {(category as any).name}
                                <Badge className="bg-yellow-400 text-orange-900 font-bold">
                                  TRAFIK UTAMA
                                </Badge>
                              </h4>
                              <p className="text-orange-100 text-sm mb-3">
                                Paket terlaris! Repaint + detailing dengan bebas pilih warna termasuk cat spesial
                              </p>
                              {(category as any).services.map((service: any) => (
                                <div 
                                  key={service.id}
                                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                    formData.selectedServices.includes(service.id)
                                      ? 'border-yellow-300 bg-yellow-100 text-orange-900'
                                      : 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                                  }`}
                                  onClick={() => toggleService(service.id)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="font-bold text-lg">{service.name}</span>
                                        <Badge className="bg-yellow-400 text-orange-900 font-bold text-xs">
                                          {service.savings}
                                        </Badge>
                                      </div>
                                      <div className="text-sm mb-1">
                                        Rp {service.price} • {service.duration}
                                      </div>
                                      <div className="text-xs opacity-90">
                                        {service.summary}
                                      </div>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                      formData.selectedServices.includes(service.id)
                                        ? 'border-yellow-300 bg-yellow-300'
                                        : 'border-white'
                                    }`}>
                                      {formData.selectedServices.includes(service.id) && (
                                        <CheckCircle className="w-4 h-4 text-orange-900 fill-current" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      // Regular service categories
                      return (
                        <div key={categoryId} className="space-y-3">
                          <h4 className="font-bold text-gray-900 text-lg">{(category as any).name}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {(category as any).services.map((service: any) => (
                              <div 
                                key={service.id}
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                  formData.selectedServices.includes(service.id)
                                    ? 'border-blue-500 bg-gradient-to-br from-blue-100 to-blue-50 shadow-md'
                                    : 'border-gray-300 hover:border-gray-400 bg-gradient-to-br from-white to-gray-50 hover:shadow-sm'
                                }`}
                                onClick={() => toggleService(service.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-gray-900">{service.name}</span>
                                      {service.popular && (
                                        <Badge variant="default" className="text-xs bg-blue-600 text-white hover:bg-blue-700">
                                          <Star className="w-3 h-3 mr-1 fill-current" />
                                          Popular
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="text-sm text-gray-700 mt-1 font-medium">
                                      Rp {service.price} • {service.duration}
                                    </div>
                                    {service.summary && (
                                      <div className="text-xs text-gray-600 mt-2 leading-relaxed">
                                        {service.summary}
                                      </div>
                                    )}
                                  </div>
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    formData.selectedServices.includes(service.id)
                                      ? 'border-blue-500 bg-blue-500'
                                      : 'border-gray-400'
                                  }`}>
                                    {formData.selectedServices.includes(service.id) && (
                                      <CheckCircle className="w-4 h-4 text-white fill-current" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Vehicle Type */}
              <div>
                <Label className="text-lg font-bold mb-4 block text-gray-900">Jenis Motor</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {vehicleTypes.map((vehicle) => (
                    <button
                      key={vehicle.id}
                      type="button"
                      className={`p-3 text-sm font-semibold border rounded-lg transition-colors ${
                        formData.vehicleType === vehicle.id
                          ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                          : 'border-gray-300 hover:border-gray-400 text-gray-900 bg-gradient-to-br from-white to-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => updateFormData('vehicleType', vehicle.id)}
                    >
                      {vehicle.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Estimation */}
              {formData.selectedServices.length > 0 && formData.vehicleType && (
                <div className="bg-gradient-to-r from-blue-100 via-blue-50 to-green-50 p-6 rounded-xl border-2 border-blue-200 shadow-lg">
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">💰 Estimasi Harga</h4>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Rp {getEstimatedPrice()}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 font-medium">
                    *Harga dapat berubah setelah survey kondisi motor
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Vehicle Details */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vehicleBrand" className="text-sm font-semibold text-gray-900">Merek Motor *</Label>
                <Input
                  id="vehicleBrand"
                  placeholder="Honda, Yamaha, Kawasaki, Suzuki, dll"
                  value={formData.vehicleBrand}
                  onChange={(e) => updateFormData('vehicleBrand', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="vehicleModel" className="text-sm font-semibold text-gray-900">Model/Tipe *</Label>
                <Input
                  id="vehicleModel"
                  placeholder="Vario, PCX, Beat, N-Max, R15, dll"
                  value={formData.vehicleModel}
                  onChange={(e) => updateFormData('vehicleModel', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="vehicleYear" className="text-sm font-semibold text-gray-900">Tahun *</Label>
                <Input
                  id="vehicleYear"
                  type="number"
                  placeholder="2020"
                  min="1990"
                  max="2025"
                  value={formData.vehicleYear}
                  onChange={(e) => updateFormData('vehicleYear', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="vehicleColor" className="text-sm font-semibold text-gray-900">Warna</Label>
                <Input
                  id="vehicleColor"
                  placeholder="Hitam, Putih, Merah, Silver, Abu-abu, dll"
                  value={formData.vehicleColor}
                  onChange={(e) => updateFormData('vehicleColor', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="vehicleCondition" className="text-sm font-semibold text-gray-900">Kondisi Motor</Label>
                <Select value={formData.vehicleCondition} onValueChange={(value) => updateFormData('vehicleCondition', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih kondisi motor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Sangat Baik (seperti baru)</SelectItem>
                    <SelectItem value="good">Baik (terawat)</SelectItem>
                    <SelectItem value="fair">Cukup (perlu perawatan)</SelectItem>
                    <SelectItem value="poor">Kurang baik (butuh restorasi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-900">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    placeholder="Nama lengkap Anda"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-900">No. WhatsApp *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08123456789"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-900">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-sm font-semibold text-gray-900">Lokasi/Kota</Label>
                  <Input
                    id="location"
                    placeholder="Jakarta, Bandung, Surabaya, dll"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="preferredDate" className="text-sm font-semibold text-gray-900">Waktu Preferred</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => updateFormData('preferredDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="hearAboutUs" className="text-sm font-semibold text-gray-900">Tahu Bosmat dari mana?</Label>
                  <Select value={formData.hearAboutUs} onValueChange={(value) => updateFormData('hearAboutUs', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih sumber" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Search</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="friend">Teman/Keluarga</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="additionalNotes" className="text-sm font-semibold text-gray-900">Catatan Tambahan</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Ada permintaan khusus atau pertanyaan? Tulis di sini..."
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Final Summary */}
              <div className="bg-gradient-to-br from-gray-50 via-blue-50/50 to-gray-50 p-6 rounded-xl border-2 border-gray-200 shadow-md">
                <h4 className="font-bold mb-4 text-lg text-gray-900">📋 Ringkasan Permintaan</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/60 p-3 rounded-lg border border-gray-300">
                    <span className="font-bold text-gray-900">Layanan:</span> 
                    <span className="ml-2 font-medium text-gray-800">{
                      formData.selectedServices.map(serviceId => {
                        for (const category of Object.values(serviceCategories)) {
                          const service = (category as any).services.find((s: any) => s.id === serviceId);
                          if (service) return service.name;
                        }
                        return serviceId;
                      }).join(', ')
                    }</span>
                  </div>
                  <div className="bg-white/60 p-3 rounded-lg border border-gray-300">
                    <span className="font-bold text-gray-900">Motor:</span> 
                    <span className="ml-2 font-medium text-gray-800">{
                      vehicleTypes.find(v => v.id === formData.vehicleType)?.name
                    } - {formData.vehicleBrand} {formData.vehicleModel} {formData.vehicleYear}</span>
                  </div>
                  <div className="bg-white/60 p-3 rounded-lg border border-gray-300">
                    <span className="font-bold text-gray-900">Estimasi:</span> 
                    <span className="ml-2 font-bold text-green-700 text-base">Rp {getEstimatedPrice()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-blue-200 bg-gradient-to-r from-blue-50/50 to-white rounded-b-lg">
            <Button
              type="button"
              variant="outline"
              onClick={() => goToStep(currentStep - 1)}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={() => goToStep(currentStep + 1)}
                disabled={!canProceedToStep(currentStep + 1)}
                className="flex items-center gap-2"
              >
                Lanjut
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  'Mengirim...'
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Kirim Permintaan
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
