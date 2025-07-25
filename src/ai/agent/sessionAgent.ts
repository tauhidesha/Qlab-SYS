// @file: src/ai/agent/sessionAgent.ts

import type { Session } from '@/types/ai';
import type { MappedServiceResult } from '@/types/ai';

/**
 * Input untuk Session Agent.
 * Mengandung semua informasi yang diperlukan untuk memutuskan cara memodifikasi sesi.
 */
interface SessionAgentInput {
  currentSession: Session;
  customerMessage: string;
  detectedMotorName: string | null;
  mappedResult: MappedServiceResult;
  isFirstMessage: boolean;
  senderName?: string;
}

/**
 * Agen yang bertanggung jawab untuk mengelola dan memperbarui state sesi.
 * Fungsi ini bersifat "pure" - tidak memiliki side effect selain logging.
 * Ia menerima state dan input, lalu mengembalikan state baru.
 * * @param input - Kumpulan data yang dibutuhkan untuk update sesi.
 * @returns Sesi yang telah diperbarui.
 */
export function manageSessionState(input: SessionAgentInput): Session {
  const { currentSession, customerMessage, detectedMotorName, mappedResult, isFirstMessage, senderName } = input;
  
  // Salin sesi saat ini agar tidak memodifikasi objek aslinya (prinsip immutability)
  let newSession: Session = JSON.parse(JSON.stringify(currentSession));

  // --- TAMBAHAN LOGIKA PEMBERSIHAN ---
  // Jika ini adalah pesan pertama dalam sebuah interaksi baru, atau intent pengguna benar-benar baru, bersihkan keranjang lama.
  if (isFirstMessage) {
      console.log('[SessionAgent] First message detected. Clearing old cartServices.');
      newSession.cartServices = [];
      newSession.inquiry = {};
  }
  // --- AKHIR TAMBAHAN ---

  // --- LOGIKA PENJAGA PROMO BUNDLING (VERSI LEBIH KUAT) ---
  const isPromoFlowActive = (currentSession as any).promoFlow?.isActive;
  
  if (isPromoFlowActive) {
    console.log('[SessionAgent][PROMO GUARD] Promo flow is active. Enforcing bundle integrity...');
    const corePromoServices = ['Repaint Bodi Halus', 'Full Detailing Glossy'];
    corePromoServices.forEach(coreService => {
      if (!newSession.cartServices.includes(coreService)) {
        console.log(`[SessionAgent][PROMO GUARD] Core promo service "${coreService}" was missing. Re-adding it to cart.`);
        newSession.cartServices.push(coreService);
      }
    });
  }
  // --- AKHIR LOGIKA PENJAGA ---

  // --- LOGIKA BARU UNTUK MENGGABUNGKAN, BUKAN MENGGANTI ---
  const mergedServices = mappedResult?.requestedServices || [];

  if (Array.isArray(mergedServices) && mergedServices.length > 0) {
      console.log('[SessionAgent][MERGE] Menggabungkan cart lama dengan hasil mapper baru...');
      if (!Array.isArray(newSession.cartServices)) {
          newSession.cartServices = [];
      }
      mergedServices.forEach(newService => {
          if (!newSession.cartServices.includes(newService.serviceName)) {
              console.log(`[SessionAgent][MERGE] Menambahkan layanan baru: ${newService.serviceName}`);
              newSession.cartServices.push(newService.serviceName);
          } else {
              console.log(`[SessionAgent][MERGE] Layanan ${newService.serviceName} sudah ada, tidak ada perubahan.`);
          }
      });
  } else {
      console.log('[SessionAgent][MERGE] Mapper tidak menemukan layanan baru, cart tidak diubah.');
  }
  // --- AKHIR LOGIKA BARU ---

  // Pastikan inquiry diupdate dengan requestedServices yang sudah dijaga
  newSession.inquiry = {
    ...newSession.inquiry,
    ...mappedResult,
    requestedServices: newSession.cartServices.map(serviceName => {
      const found = mergedServices.find(s => s.serviceName === serviceName);
      return found || { serviceName, status: 'confirmed', missingInfo: [], notes: '' };
    })
  };

  // --- LOGIKA BARU UNTUK MENGGABUNGKAN, BUKAN MENGGANTI ---
  const newServices = mappedResult?.requestedServices || [];

  if (Array.isArray(newServices) && newServices.length > 0) {
      console.log('[SessionAgent][MERGE] Menggabungkan cart lama dengan hasil mapper baru...');
      
      // Pastikan cartServices di sesi adalah array
      if (!Array.isArray(newSession.cartServices)) {
          newSession.cartServices = [];
      }

      newServices.forEach(newService => {
          // HANYA tambahkan layanan baru jika belum ada di keranjang.
          // Ini mencegah keranjang dikosongkan secara tidak sengaja.
          if (!newSession.cartServices.includes(newService.serviceName)) {
              console.log(`[SessionAgent][MERGE] Menambahkan layanan baru: ${newService.serviceName}`);
              newSession.cartServices.push(newService.serviceName);
          } else {
              console.log(`[SessionAgent][MERGE] Layanan ${newService.serviceName} sudah ada, tidak ada perubahan.`);
          }
      });
  } else {
      console.log('[SessionAgent][MERGE] Mapper tidak menemukan layanan baru, cart tidak diubah.');
  }
  // --- AKHIR LOGIKA BARU ---

  // 1. Inisialisasi/Update data dasar
  newSession.senderName = newSession.senderName || senderName;
  if (!newSession.cartServices) newSession.cartServices = [];
  if (!newSession.inquiry) newSession.inquiry = {};
  if (!newSession.inquiry.repaintDetails) newSession.inquiry.repaintDetails = {};

  // 2. Logika deteksi motor dan auto-infer
  if (
    newSession.lastInteraction?.type === 'ask_motor' &&
    detectedMotorName
  ) {
    newSession.inquiry.lastMentionedMotor = detectedMotorName;
  } else if (detectedMotorName && newSession.inquiry.lastMentionedMotor !== detectedMotorName) {
    newSession.inquiry.lastMentionedMotor = detectedMotorName;
    console.log('[SessionAgent] Motor terdeteksi dan diupdate:', detectedMotorName);
  }

  // 3. Logika update berdasarkan hasil AIMapper
  // PROSES SEMUA LAYANAN YANG DIMINTA, BUKAN HANYA YANG CONFIRMED
  mappedResult.requestedServices.forEach(item => {
    // Abaikan intent non-layanan
    if (item.serviceName === 'General Inquiry' || item.serviceName === 'Handover to Human') {
        return; 
    }
    // Hindari duplikat di keranjang
    if (!newSession.cartServices.includes(item.serviceName)) {
        console.log(`[SessionAgent] Menambahkan layanan baru ke keranjang: ${item.serviceName}`);
        newSession.cartServices.push(item.serviceName);
    }
    // Logika untuk detail repaint (jika ada)
    if (item.notes?.startsWith('color:')) {
      const colorValue = item.notes.split(': ')[1];
      if (colorValue) {
        newSession.inquiry.repaintDetails![item.serviceName] = { 
            ...(newSession.inquiry.repaintDetails![item.serviceName] || {}),
            color: colorValue 
        };
      }
    }
  });

  // 4. Logika patch dari pesan terakhir (Tahap 6 di kode lama)
  const lowerMessage = customerMessage.toLowerCase();

  // Deteksi jawaban `specific_part` untuk repaint (tetap sama)
  if (lowerMessage.includes('bodi halus') || lowerMessage.includes('bodi kasar') || lowerMessage.includes('velg')) {
    const repaintTarget = newSession.cartServices.find(s => s.toLowerCase().includes('repaint'));
    if (repaintTarget) {
      const part = lowerMessage.includes('bodi halus') ? 'bodi halus' 
                 : lowerMessage.includes('bodi kasar') ? 'bodi kasar' 
                 : 'velg';
      newSession.inquiry.repaintDetails![repaintTarget] = {
        ...(newSession.inquiry.repaintDetails![repaintTarget] || {}),
        specific_part: part,
      };
      console.log(`[SessionAgent] Repaint part diupdate ke: ${part}`);
    }
  }

  // Deteksi jawaban `color` untuk repaint (DIPERBAIKI)
  const warnaMatch = lowerMessage.match(/warna (\w+(?: \w+)?)/i) || lowerMessage.match(/\b(candy|silver|pink|hitam|merah|kuning|ungu|biru)\b/i);
  if (warnaMatch) {
    let repaintTargetService: string | undefined;

    // 1. Coba cari target di dalam keranjang (cartServices) terlebih dahulu
    repaintTargetService = newSession.cartServices.find(s => s.toLowerCase().includes('repaint'));

    // 2. Jika tidak ketemu, cari di layanan yang butuh klarifikasi
    if (!repaintTargetService) {
      const clarificationServices = mappedResult.requestedServices.filter(s => s.status === 'clarification_needed');
      const repaintClarification = clarificationServices.find(s => s.serviceName.toLowerCase().includes('repaint'));
      if (repaintClarification) {
        repaintTargetService = repaintClarification.serviceName;
      }
    }

    // 3. Jika target ditemukan (baik dari cart atau dari klarifikasi), simpan warnanya
    if (repaintTargetService) {
      // Ekstrak nama warna dari hasil regex
      const color = warnaMatch[1] ? warnaMatch[1] : warnaMatch[0];

      // Pastikan repaintDetails ada
      if (!newSession.inquiry.repaintDetails) {
        newSession.inquiry.repaintDetails = {};
      }

      // Simpan warna ke layanan yang tepat
      newSession.inquiry.repaintDetails[repaintTargetService] = {
        ...(newSession.inquiry.repaintDetails[repaintTargetService] || {}),
        color: color.trim(),
      };
      console.log(`[SessionAgent] Repaint color '${color.trim()}' DIUPDATE untuk layanan: ${repaintTargetService}`);
    } else {
      console.log(`[SessionAgent] Warna terdeteksi, tetapi tidak ditemukan layanan repaint target di cart atau klarifikasi.`);
    }
  }
  
  // 5. Set flag interaksi untuk siklus berikutnya
  const clarificationServices = mappedResult.requestedServices.filter(item => item.status === 'clarification_needed');
  const needAskMotor = !newSession.inquiry.lastMentionedMotor;

  if (clarificationServices.length > 0 && needAskMotor) {
    newSession.lastInteraction = {
      type: 'ask_motor',
      at: Date.now(),
      context: clarificationServices.map(s => s.serviceName),
    };
  }

  // 6. Inject promo flags from mappedResult if present
  Object.assign(newSession, {
    ...(mappedResult.promoMentioned && { promoMentioned: true }),
    ...(mappedResult.promoExplained && { promoExplained: true }),
  });

  return newSession;
}