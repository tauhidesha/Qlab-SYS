// lib/fpixel.ts

// ----> WAJIB: Pastikan baris ini ada <----
export const FB_PIXEL_ID = '705154671627200'; // Ganti dengan ID Pixel Anda

// Kode Anda (sudah benar)
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export const pageview = () => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
};

export const event = (name: string, options = {}) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', name, options);
  }
};