// lib/fpixel.ts

// Facebook Pixel ID dari environment variable dengan fallback ke default value
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '3280635758922955';

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
  console.log(`[Pixel] Attempting to track event: ${name}`, options);
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    console.log(`[Pixel] Firing fbq track for ${name}`);
    window.fbq('track', name, options);
  } else {
    console.warn(`[Pixel] window.fbq is not a function!`);
  }
};