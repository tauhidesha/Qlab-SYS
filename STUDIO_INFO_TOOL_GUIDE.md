# 🏢 Studio Info Tool - Comprehensive Guide

Tool khusus untuk informasi studio Bosmat yang akurat dan konsisten, menggantikan vector search yang sering miss.

## 🎯 Problem yang Diselesaikan

**Issue**: Vector search (`searchKnowledgeBase`) sering miss untuk info studio dasar seperti alamat, jam buka, dan kontak.

**Solution**: Tool khusus `getStudioInfo` dengan data hardcoded yang selalu akurat.

## 🔧 Implementation

### Tool: `getStudioInfo`

```typescript
// Input
{
  infoType: 'location' | 'hours' | 'contact' | 'booking_policy' | 'all'
}

// Output - Structured response dengan format WhatsApp yang konsisten
```

### Studio Information Database

```typescript
const studioInfo = {
  location: {
    address: "Bukit Cengkeh 1, Jl. Medan No. B3/2, Cimanggis – Depok, Jawa Barat",
    landmark: "Dekat dari jalan raya Bogor atau tol Cijago",
    googleMaps: "https://maps.app.goo.gl/do4DBYiMntyV7oqc7"
  },
  contact: {
    phone: "0895-4015-27556"
  },
  hours: {
    senin: "09.00–17.00",
    selasa: "09.00–17.00", 
    rabu: "09.00–17.00",
    kamis: "09.00–17.00",
    jumat: "Tutup",
    sabtu: "09.00–17.00",
    minggu: "09.00–17.00"
  },
  bookingPolicy: {
    walkIn: false,
    appointmentRequired: true,
    description: "Wajib janjian atau booking, no walk-in"
  }
};
```

## 📋 Response Types

### 1. **Location Info** (`infoType: 'location'`)

```
📍 *Lokasi Bosmat Detailing & Repainting Studio:*

Bukit Cengkeh 1, Jl. Medan No. B3/2, Cimanggis – Depok, Jawa Barat
Dekat dari jalan raya Bogor atau tol Cijago

Google Maps: https://maps.app.goo.gl/do4DBYiMntyV7oqc7

⚠️ *Penting:* Wajib janjian atau booking, no walk-in
```

### 2. **Operating Hours** (`infoType: 'hours'`)

```
🕒 *Jam Operasional Bosmat Studio:*

• Senin: 09.00–17.00
• Selasa: 09.00–17.00
• Rabu: 09.00–17.00
• Kamis: 09.00–17.00
• Jumat: Tutup
• Sabtu: 09.00–17.00
• Minggu: 09.00–17.00

⚠️ *Penting:* Wajib janjian atau booking, no walk-in
```

### 3. **Contact Information** (`infoType: 'contact'`)

```
📞 *Kontak Bosmat Studio:*

Telepon/WhatsApp: 0895-4015-27556

📍 Alamat: Bukit Cengkeh 1, Jl. Medan No. B3/2, Cimanggis – Depok, Jawa Barat

⚠️ *Penting:* Wajib janjian atau booking, no walk-in
```

### 4. **Booking Policy** (`infoType: 'booking_policy'`)

```
📋 *Kebijakan Kunjungan Bosmat Studio:*

⚠️ *WAJIB JANJIAN ATAU BOOKING, NO WALK-IN*

Untuk datang ke studio, mas harus:
• Booking slot dulu via WhatsApp
• Tentukan tanggal & jam kunjungan
• Konfirmasi 1 hari sebelumnya

Kontak booking: 0895-4015-27556
```

### 5. **Complete Info** (`infoType: 'all'`)

```
🏢 *Info Lengkap Bosmat Detailing & Repainting Studio*

📍 *Alamat:*
Bukit Cengkeh 1, Jl. Medan No. B3/2, Cimanggis – Depok, Jawa Barat
Dekat dari jalan raya Bogor atau tol Cijago
Google Maps: https://maps.app.goo.gl/do4DBYiMntyV7oqc7

📞 *Kontak:*
Telepon/WhatsApp: 0895-4015-27556

🕒 *Jam Operasional:*
• Senin-Kamis: 09.00–17.00
• Jumat: Tutup
• Sabtu-Minggu: 09.00–17.00

⚠️ *PENTING - Kebijakan Kunjungan:*
WAJIB JANJIAN ATAU BOOKING, NO WALK-IN
Wajib booking slot dulu sebelum datang ke studio!
```

## 🔄 Updated AI Prompts

### LightweightPrompt (Primary)
```typescript
**WAJIB TOOLS**:
• Lokasi/jam/garansi/kontak → getStudioInfo (akurat & lengkap!)
• Foto motor → analyzeMotorImage
• Customer di luar area/minta stop → detectConversationRelevance
• Repaint → getPromoBundleDetails dulu (promo bundling)
```

### MinimalPrompt (Backup)
```typescript
WAJIB getStudioInfo: lokasi/jam/kontak (akurat!)
REPAINT: getPromoBundleDetails dulu
```

## 🎯 Key Features

### ✅ **Always Accurate**
- Hardcoded data, no vector search variability
- Consistent formatting across all responses
- Always includes booking policy reminder

### ✅ **Comprehensive Coverage**
- Complete address with landmark
- Full operating hours (including Friday closed)
- Contact information (phone/WhatsApp same number)
- Google Maps link for navigation
- Clear booking policy explanation

### ✅ **WhatsApp Optimized**
- Proper formatting with emojis and bullets
- Bold headers for easy scanning
- Important warnings highlighted
- Concise but complete information

## 🚀 Usage Scenarios

### Customer Asks: "Alamat nya dmn"
**AI Response**: Uses `getStudioInfo('location')` 
- Full address with Google Maps
- Landmark information
- Booking policy reminder

### Customer Asks: "Jam buka kapan?"
**AI Response**: Uses `getStudioInfo('hours')`
- Complete weekly schedule
- Friday closure highlighted
- Booking policy reminder

### Customer Asks: "Nomor telepon berapa?"
**AI Response**: Uses `getStudioInfo('contact')`
- Phone/WhatsApp number
- Address summary
- Booking policy reminder

### Customer Asks: "Bisa langsung datang?"
**AI Response**: Uses `getStudioInfo('booking_policy')`
- Clear NO WALK-IN policy
- Booking procedure explanation
- Contact for booking

## 📊 Benefits vs Vector Search

| Aspect | Vector Search | getStudioInfo Tool |
|--------|---------------|-------------------|
| **Accuracy** | ❌ Sering miss | ✅ 100% akurat |
| **Consistency** | ❌ Bervariasi | ✅ Selalu sama |
| **Completeness** | ❌ Partial info | ✅ Lengkap |
| **Booking Policy** | ❌ Kadang lupa | ✅ Selalu included |
| **Format** | ❌ Tidak konsisten | ✅ WhatsApp optimized |

## 🔮 Customer Experience Impact

**Before** (Vector Search):
```
Customer: "Alamat nya dmn"
Bot: "Bosmat studio di Depok..." (incomplete, inconsistent)
```

**After** (getStudioInfo Tool):
```
Customer: "Alamat nya dmn"
Bot: "📍 *Lokasi Bosmat Detailing & Repainting Studio:*
Bukit Cengkeh 1, Jl. Medan No. B3/2, Cimanggis – Depok, Jawa Barat
Dekat dari jalan raya Bogor atau tol Cijago
Google Maps: https://maps.app.goo.gl/do4DBYiMntyV7oqc7
⚠️ *Penting:* Wajib janjian atau booking, no walk-in"
```

---

**Result**: Customer selalu dapat info studio yang akurat, lengkap, dan konsisten! 🎉
