/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config options go here.
  // For example:
  // reactStrictMode: true,
  
  // Environment variables yang bisa di-expose ke client
  env: {
    NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL || 'https://repaintdandetailingmotor-bosmat.vercel.app',
  },
  
  // Image configuration for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh4.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh5.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Headers untuk mengatasi CORS issues
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
        ],
      },
    ];
  },
  
  // Menambahkan konfigurasi webpack di sini untuk menyembunyikan log peringatan
  webpack: (config) => {
    // Memberitahu webpack untuk mengabaikan beberapa jenis peringatan (warnings)
    // yang sering muncul dari library sisi server seperti Genkit.
    config.ignoreWarnings = [
      // Menyembunyikan peringatan <w> tentang 'Resolving dependencies'.
      /Resolving dependencies/,
      
      // Menyembunyikan peringatan 'require.extensions' dari Handlebars.
      /require\.extensions is not supported by webpack/,
      
      // Menyembunyikan peringatan 'Critical dependency' dari OpenTelemetry.
      /Critical dependency: require function is used/,
    ];
    config.experiments = {
      ...(config.experiments || {}),
      asyncWebAssembly: true,
    };
    
    return config;
  },
};

export default nextConfig;
