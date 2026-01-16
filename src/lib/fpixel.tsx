// lib/fpixel.ts

// Facebook Pixel ID dari environment variable dengan fallback ke default value
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '705154671627200';

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