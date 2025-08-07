// app/layout.tsx

import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import Script from 'next/script'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FB_PIXEL_ID } from '@/lib/fpixel' // <-- 1. IMPORT ID DARI FILE PUSAT
import { GA_TRACKING_ID } from '@/lib/gtag' // <-- Import Google Analytics ID
import GoogleAnalytics from '@/components/GoogleAnalytics'
// import PixelEvents from '@/components/PixelEvents' // <-- 3. IMPORT KOMPONEN EVENT
import { Suspense } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'QLAB POS',
  description: 'Sistem Titik Penjualan dan Manajemen Bengkel',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="id" 
      className="dark" 
      suppressHydrationWarning={process.env.NODE_ENV === 'development'}
    >
      {/* suppressHydrationWarning used in development to ignore browser extension attributes like data-kantu */}
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_location: window.location.href,
                    page_title: document.title,
                  });
                `,
              }}
            />
          </>
        )}
        
        {/* Facebook Pixel */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}'); 
              
              // Hapus fbq('track', 'PageView'); dari sini karena sudah ditangani oleh PixelEvents
            `,
          }}
        />
        
        {/* Facebook Pixel Noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
                
        <AuthProvider>
          <GoogleAnalytics />
          {children}
        </AuthProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}