# Bosmat-SYS: Sistem POS & AI Customer Service Bengkel Motor

Sistem manajemen bengkel motor yang lengkap dengan AI Customer Service, Point of Sale (POS), dan monitoring yang canggih. Dibangun dengan Next.js 14, Firebase/Firestore, dan OpenAI GPT-4o.

## 🚀 Fitur Utama

### 🤖 AI Customer Service (Zoya)
- **WhatsApp Integration**: Asisten AI yang merespon chat WhatsApp otomatis
- **Multi-Tool System**: 10+ tools khusus untuk layanan bengkel
- **Smart Booking**: Otomatis buat booking dengan deteksi layanan dan harga
- **Context-Aware**: Memahami konteks percakapan dan customer history
- **Image Processing**: Analisis foto motor untuk estimasi layanan

### 💰 Point of Sale (POS)
- **Transaksi Lengkap**: Penjualan produk dan layanan dalam satu sistem
- **Real-time Inventory**: Update stok otomatis saat transaksi
- **Multiple Payment**: Tunai, transfer, dan credit support
- **Receipt Generation**: Struk otomatis dengan QR code
- **Customer Database**: Integrasi dengan data customer dan motor

### 📊 Monitoring & Analytics
- **AI Performance Tracking**: Monitor performa AI real-time
- **Quality Scoring**: Penilaian kualitas percakapan otomatis
- **Predictive Analytics**: Insight dan prediksi tren
- **Self-Healing System**: Deteksi dan perbaikan masalah otomatis
- **Cost Optimization**: Tracking dan optimasi biaya AI

### 🏢 Manajemen Bengkel
- **Queue Management**: Antrian customer dan booking system
- **Staff Management**: Absensi, penggajian, dan bagi hasil
- **Financial Reports**: Laporan laba rugi, cash flow, dan revenue
- **Inventory Control**: Manajemen stok produk dan spare part
- **Client Database**: Data lengkap customer dan history motor

## 📋 Daftar Isi

- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Penggunaan](#-penggunaan)
- [Arsitektur](#-arsitektur)
- [AI Tools](#-ai-tools)
- [Monitoring](#-monitoring)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Kontribusi](#-kontribusi)

## 🛠️ Instalasi

### Prasyarat
- Node.js 18+
- Firebase Project dengan Firestore
- OpenAI API Key
- WhatsApp Business API (opsional)

### 1. Clone Repository
```bash
git clone https://github.com/tauhidesha/Qlab-SYS.git
cd Qlab-SYS
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Firebase
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (jika belum)
firebase init
```

### 4. Environment Variables
Buat file `.env.local` di root project:
```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# WhatsApp Configuration (opsional)
WHATSAPP_TOKEN=your_whatsapp_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token

# Environment
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Start Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

### 6. Setup Firebase Emulators (Development)
```bash
# Start Firebase emulators
firebase emulators:start
```

## ⚙️ Konfigurasi

### Firebase Rules
Pastikan Firestore rules sudah dikonfigurasi dengan benar di `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Izinkan akses untuk authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### AI Configuration
Konfigurasi AI ada di `src/ai/config/aiPrompts.ts`:
- **Master Prompt**: Prompt utama untuk Zoya AI
- **Lightweight Prompt**: Versi ringkas untuk response cepat
- **Tool Prompts**: Prompt khusus untuk setiap AI tool

### WhatsApp Webhook
Setup webhook di WhatsApp Business API:
- **Webhook URL**: `https://yourdomain.com/api/whatsapp/webhook`
- **Verify Token**: Sesuaikan dengan `WHATSAPP_WEBHOOK_VERIFY_TOKEN`

## 🎯 Penggunaan

### 1. Dashboard Utama
Akses `/dashboard` untuk melihat:
- Summary aktivitas bengkel
- Antrian hari ini
- Revenue dan metrics
- Quick actions

### 2. AI Customer Service
Akses `/ai-cs-assistant` untuk:
- Monitor chat WhatsApp real-time
- Lihat conversation history
- Manual intervention jika diperlukan
- **Ghost Writing Mode**: Konversi pesan manual ke style Zoya otomatis
- Template pesan cepat
- Analytics percakapan

### 3. POS System
Akses `/pos` untuk:
- Buat transaksi baru
- Scan/pilih produk dan layanan
- Proses pembayaran
- Print receipt

### 4. Monitoring AI
Akses `/monitoring` untuk:
- **Overview**: Metrics real-time AI
- **Alerts**: Notifikasi dan warning system
- **Performance**: Response time dan success rate
- **Costs**: Tracking biaya OpenAI
- **Insights**: Predictive analytics & quality analysis
- **Optimization**: Saran perbaikan AI-generated
- **Healing**: Status self-healing system & auto-fix history

### 5. Manajemen Data
- **Clients** (`/clients`): Data customer dan motor
- **Services** (`/services`): Katalog layanan bengkel
- **Queue** (`/queue`): Manajemen antrian
- **Staff** (`/staff/*`): Manajemen karyawan
- **Reports** (`/reports/*`): Laporan keuangan

## 🏗️ Arsitektur

### Arsitektur Sistem
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   WhatsApp      │    │   Web Browser   │    │   Mobile App    │
│   Business API  │────│   Dashboard     │────│   (Future)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌─────────────────┐
                       │   Next.js 14    │
                       │   (Frontend +   │
                       │    Backend)     │
                       └─────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Firestore     │    │   Firebase      │    │   OpenAI        │
│   (Database)    │    │   Functions     │    │   GPT-4o        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Struktur AI System
```
┌─────────────────┐
│   Zoya Agent    │ ← Main AI Customer Service
│   (GPT-4o)      │
└─────────────────┘
         │
    ┌────┴────┐
    │         │
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│Booking  │ │Service  │ │Payment  │ │Queue    │
│ Tools   │ │ Tools   │ │ Tools   │ │ Tools   │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
```

### Komponen Utama

#### 1. AI System (`src/ai/`)
- **Agents**: Zoya AI customer service agent
- **Tools**: 10+ specialized tools untuk bengkel
- **Flows**: Conversation flows dan logic
- **Config**: Prompts dan konfigurasi AI

#### 2. Frontend (`src/app/`)
- **Dashboard**: Main admin interface
- **POS**: Point of sale system
- **Monitoring**: AI performance dashboard
- **Client Management**: Customer data interface

#### 3. Backend (`src/lib/` & `src/services/`)
- **Firebase**: Database dan authentication
- **API Routes**: RESTful endpoints
- **Monitoring**: Metrics dan health checks
- **Utils**: Helper functions

#### 4. Types (`src/types/`)
- **Firestore Collections**: Typed interfaces
- **AI Types**: Tool dan response types
- **Business Logic**: POS dan booking types

## 🤖 AI Tools

Zoya AI dilengkapi dengan 10+ specialized tools:

### Core Tools
1. **createBooking**: Buat booking otomatis
2. **getAvailableServices**: Cek layanan tersedia
3. **calculatePrice**: Hitung harga layanan
4. **checkQueue**: Cek status antrian
5. **getBusinessInfo**: Info bengkel (jam, lokasi, dll)

### Advanced Tools
6. **analyzeImage**: Analisis foto motor untuk estimasi
7. **updateBooking**: Update booking existing
8. **cancelBooking**: Cancel booking dengan reason
9. **getCustomerHistory**: Riwayat customer
10. **processPayment**: Proses pembayaran
11. **ghostWriting**: Konversi pesan manual ke style Zoya

### Workflow Tools
- **escalateToHuman**: Handover ke human operator
- **generateReceipt**: Generate receipt/invoice
- **sendNotification**: Kirim notifikasi customer
- **ghostWritingMode**: Format otomatis pesan dengan style Zoya

## 🎭 Ghost Writing System

Fitur canggih untuk mengkonversi pesan manual admin menjadi format natural Zoya secara otomatis.

### Cara Kerja Ghost Writing

1. **Aktivasi Mode**: Toggle "Mode Zoya" di halaman AI CS Assistant
2. **Input Pesan**: Ketik pesan normal dalam bahasa sehari-hari
3. **AI Conversion**: Sistem otomatis mengkonversi ke style Zoya
4. **Send WhatsApp**: Pesan terkirim dengan format natural Zoya

### Format Conversion

**Input Manual:**
```
Booking sudah dikonfirmasi. Ditunggu kedatangannya ya!
```

**Output Zoya Style:**
```
Siap mas! *Booking sudah dikonfirmasi* nih untuk besok jam 10 pagi. 
Ditunggu kedatangannya ya! 🙏

Jangan lupa bawa kendaraan yang mau di-service. 
See you tomorrow! ✨
```

### Quick Templates

Tersedia template pesan cepat untuk situasi umum:
- **Booking Confirmed**: Konfirmasi booking customer
- **Motor Ready**: Notifikasi motor sudah selesai
- **Payment Received**: Konfirmasi pembayaran diterima
- **Schedule Change**: Pemberitahuan perubahan jadwal
- **Promo Info**: Informasi promo terbaru
- **Service Complete**: Notifikasi layanan selesai

### API Endpoint

```typescript
POST /api/ai/ghost-writing
{
  "message": "Booking sudah dikonfirmasi",
  "customerName": "John Doe", 
  "customerPhone": "628123456789"
}

Response:
{
  "success": true,
  "originalMessage": "Booking sudah dikonfirmasi",
  "zoyaMessage": "Siap mas! *Booking sudah dikonfirmasi* nih...",
  "metadata": {
    "toolsUsed": ["ghostWriting"],
    "route": "ghost_writing_conversion"
  }
}
```

## 📊 Monitoring

Sistem monitoring AI yang komprehensif dengan 7 dashboard tabs:

### 1. Overview Tab
- **Real-time Metrics**: Total conversations, response time, error rate
- **System Health**: Status indicators dengan color coding
- **Top AI Tools**: Tools yang paling sering digunakan
- **Quick Stats**: Summary performance utama

### 2. Alerts Tab  
- **System Alerts**: Notifikasi error dan warning
- **Performance Alerts**: Alert untuk response time tinggi
- **Cost Alerts**: Warning untuk biaya OpenAI berlebih
- **Quality Alerts**: Alert untuk quality score rendah

### 3. Performance Tab
- **Response Time Analysis**: Distribusi waktu respon
- **Success Rate Tracking**: Tingkat keberhasilan percakapan
- **Tool Performance**: Performance individual setiap tool
- **Throughput Metrics**: Volume conversations per time period

### 4. Costs Tab
- **Token Usage**: Penggunaan token input/output OpenAI
- **Cost Breakdown**: Breakdown biaya per conversation/tool
- **Monthly Projections**: Estimasi biaya bulanan
- **Cost Optimization**: Saran penghematan biaya

### 5. Insights Tab (🔮 Predictive Analytics)
- **Quality Analysis**: Multi-dimensional quality scoring
- **Predictive Insights**: AI-powered predictions & early warnings
- **Trend Analysis**: Analisis tren percakapan dan performa
- **Behavioral Insights**: Analisis pola customer behavior

### 6. Optimization Tab (🚀 AI-Generated Suggestions)
- **Performance Optimization**: Saran perbaikan response time
- **Cost Optimization**: Rekomendasi penghematan token/biaya
- **Quality Improvement**: Saran peningkatan kualitas conversation
- **Tool Optimization**: Optimasi usage pattern tools

### 7. Healing Tab (🛡️ Self-Healing System)
- **Auto-Detection**: Deteksi masalah otomatis real-time
- **Auto-Recovery**: Automated issue resolution
- **Healing History**: Log semua auto-fix yang dilakukan
- **Manual Intervention**: Alert untuk masalah yang perlu manual handling

### Monitoring Features
- **Real-time Updates**: Auto-refresh setiap 30 detik
- **Time Range Selection**: 1 hour, 24 hours, 7 days
- **Mock Data Support**: Test data untuk development
- **Export Capabilities**: Export data untuk reporting
- **Alert Notifications**: Push notifications untuk critical issues

## 🧪 Testing

### Development Testing
```bash
# Run all tests
npm test

# Run specific AI tests
npm run test:ai

# Run Zoya AI tests
npm run test:zoya

# Test monitoring system
npm run test:monitoring
```

### Test Coverage
- **Unit Tests**: Individual component testing
- **Integration Tests**: End-to-end flow testing
- **AI Tests**: Conversation dan tool testing
- **Performance Tests**: Load dan stress testing

### Manual Testing
- **WhatsApp Simulator**: Test AI responses
- **POS Simulator**: Test transaction flows
- **Monitoring Dashboard**: Test metrics collection

## 🚀 Deployment

### Firebase Hosting
```bash
# Build project
npm run build

# Deploy to Firebase
firebase deploy
```

### Environment Variables (Production)
```bash
# Set production environment variables
firebase functions:config:set openai.api_key="your_openai_key"
firebase functions:config:set whatsapp.token="your_whatsapp_token"
```

### Monitoring Setup
1. Setup Firebase Performance Monitoring
2. Configure OpenAI usage alerts
3. Enable error tracking
4. Setup backup strategies

## 📝 Scripts

### Development
```bash
npm run dev          # Start development server
npm run dev:emulator # Start with Firebase emulators
npm run build        # Build for production
npm run start        # Start production server
```

### Testing
```bash
npm test             # Run all tests
npm run test:ai      # Test AI system
npm run test:pos     # Test POS system
npm run test:watch   # Watch mode testing
```

### Deployment
```bash
npm run deploy       # Deploy to Firebase
npm run deploy:functions # Deploy only functions
npm run deploy:hosting   # Deploy only hosting
```

### Utilities
```bash
npm run lint         # Check code style
npm run type-check   # TypeScript checking
npm run analyze      # Bundle analysis
```

## 🗂️ Struktur Project

```
src/
├── ai/                     # AI System
│   ├── agents/            # AI agents (Zoya)
│   ├── tools/             # Specialized tools
│   ├── flows/             # Conversation flows
│   ├── config/            # AI configuration & prompts
│   └── utils/             # AI utilities
├── app/                   # Next.js App Router
│   ├── (app)/            # Main app pages
│   │   ├── dashboard/    # Main dashboard
│   │   ├── pos/          # Point of Sale
│   │   ├── monitoring/   # AI monitoring
│   │   ├── clients/      # Customer management
│   │   ├── services/     # Service catalog
│   │   ├── queue/        # Queue management
│   │   └── staff/        # Staff management
│   ├── api/              # API routes
│   └── login/            # Authentication
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/ui components
│   └── layout/          # Layout components
├── lib/                 # Core libraries
│   ├── firebase/        # Firebase configuration
│   ├── monitoring/      # Monitoring system
│   └── utils/           # Utility functions
├── services/            # External service integrations
├── types/               # TypeScript type definitions
└── data/                # Static data & knowledge base
```

## 🤝 Kontribusi

### Development Workflow
1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Style
- Follow TypeScript strict mode
- Use kebab-case untuk files
- Use PascalCase untuk components
- Use camelCase untuk variables/functions
- Follow existing patterns

### AI Development
- Test AI tools extensively
- Document prompt changes
- Monitor token usage
- Ensure graceful error handling

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🆘 Support

### Documentation
- **API Docs**: `/docs/api`
- **AI Tools**: `/docs/ai-tools`
- **Deployment**: `/docs/deployment`

### Community
- **Issues**: [GitHub Issues](https://github.com/tauhidesha/Qlab-SYS/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tauhidesha/Qlab-SYS/discussions)

### Contact
- **Email**: support@bosmat-sys.com
- **WhatsApp**: +62-XXX-XXXX-XXXX

---

**Bosmat-SYS** - Sistem POS & AI Customer Service Bengkel Motor yang Canggih 🚀