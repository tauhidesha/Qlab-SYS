# Google Analytics Setup Guide

## Cara Setup Google Analytics di Project Ini

### 1. Buat Google Analytics Property ✅ COMPLETED
1. Kunjungi [Google Analytics](https://analytics.google.com)
2. Buat akun baru atau gunakan akun yang ada
3. Buat property baru untuk website Anda
4. Pilih "Web" sebagai platform
5. Masukkan URL website Anda
6. **✅ Measurement ID sudah didapat: `G-4WWPQB84CT`**

### 2. Konfigurasi Environment Variable ✅ COMPLETED
1. ✅ File `.env.local` sudah dibuat di root project
2. ✅ Variable sudah ditambahkan:
```bash
NEXT_PUBLIC_GA_ID="G-4WWPQB84CT"
```

### 3. Fitur Tracking yang Sudah Aktif

#### Automatic Tracking:
- ✅ **Page Views** - Otomatis track setiap halaman yang dikunjungi
- ✅ **WhatsApp Button Clicks** - Track semua klik tombol WhatsApp
- ✅ **FAQ Interactions** - Track FAQ mana yang sering dibuka
- ✅ **Navigation Events** - Track perpindahan halaman

#### Custom Events:
- `contact_whatsapp` - Ketika user klik tombol WhatsApp
- `faq_click` - Ketika user buka/tutup FAQ
- `page_view` - Ketika user kunjungi halaman

### 4. Cara Melihat Data Analytics

1. Buka [Google Analytics](https://analytics.google.com)
2. Pilih property Anda
3. Menu **Reports** > **Real-time** untuk data live
4. Menu **Reports** > **Engagement** > **Events** untuk melihat custom events
5. Menu **Reports** > **Acquisition** untuk sumber traffic

### 5. Tips Optimasi

1. **Monitor Real-time** untuk test tracking
2. **Cek Events** di GA4 untuk validasi custom events
3. **Setup Goals** untuk conversion tracking
4. **Enable Enhanced Ecommerce** jika ada transaksi

### 6. Privacy & GDPR Compliance

Google Analytics sudah dikonfigurasi dengan:
- ✅ IP anonymization
- ✅ Consent mode ready
- ✅ Cookie-less tracking options

## Troubleshooting

### GA tidak muncul data:
1. Cek apakah `NEXT_PUBLIC_GA_ID` sudah benar
2. Tunggu 24-48 jam untuk data pertama muncul
3. Test dengan Real-time reports

### Events tidak track:
1. Cek browser console untuk errors
2. Pastikan ad-blocker tidak aktif saat testing
3. Validate events di GA4 DebugView

---

**Note**: Data Google Analytics butuh waktu 24-48 jam untuk muncul di dashboard. Gunakan Real-time reports untuk testing immediately.
