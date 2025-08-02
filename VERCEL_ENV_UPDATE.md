# 🚨 PENTING: Update Environment Variables di Vercel Production

## Status Saat Ini:
- ✅ **Local Development** (.env.local): Sudah updated
- ❌ **Vercel Production**: Perlu diupdate manual

---

## 🔧 **Steps untuk Update Vercel Environment Variables**:

### 1. **Login ke Vercel Dashboard**:
```
https://vercel.com/dashboard
```

### 2. **Pilih Project**:
- Cari project: `qlab-sys` atau `repaintdandetailingmotor-bosmat`
- Click project name

### 3. **Masuk ke Settings**:
- Click tab **"Settings"**
- Scroll ke section **"Environment Variables"**

### 4. **Add/Update Variable**:
```
Key: NEXT_PUBLIC_APP_BASE_URL
Value: https://repaintdandetailingmotor-bosmat.vercel.app
Environment: Production (dan Preview jika perlu)
```

### 5. **Redeploy**:
- Setelah save environment variable
- Trigger redeploy dengan push dummy commit atau manual redeploy

---

## 📋 **Environment Variables yang Perlu Dicek di Vercel**:

### **Required untuk Receipt/Feedback**:
```bash
NEXT_PUBLIC_APP_BASE_URL=https://repaintdandetailingmotor-bosmat.vercel.app
```

### **Existing Variables (pastikan masih ada)**:
```bash
WHATSAPP_SERVER_URL=http://52.65.182.164:4000
OPENAI_API_KEY=sk-proj-...
FIREBASE_SERVICE_ACCOUNT_BASE64=...
CRON_SECRET=...
BOS_MAMAT_NUMBER=628179481010
```

---

## 🔍 **Quick Check**:

Untuk memastikan environment variable sudah benar, bisa test:

1. **Test Receipt**: Generate receipt dari POS
2. **Check Feedback URL**: Lihat apakah URL di receipt sudah benar
3. **Test Feedback Link**: Click link di receipt, pastikan tidak 404

---

## ⚠️ **Current Issue**:

Jika environment variable belum diupdate di Vercel, feedback URL di receipt masih akan show:
```
[APP_BASE_URL_BELUM_DISET_DI_.ENV]/public/feedback/[ID]
```

Setelah update environment variable, akan jadi:
```
https://repaintdandetailingmotor-bosmat.vercel.app/public/feedback/[ID]
```

---

## 🚀 **Action Required**:

1. **Update NEXT_PUBLIC_APP_BASE_URL di Vercel Dashboard**
2. **Redeploy project** (automatic jika push commit baru)
3. **Test receipt generation** untuk confirm feedback URL sudah benar

**Link Vercel Dashboard**: https://vercel.com/dashboard
