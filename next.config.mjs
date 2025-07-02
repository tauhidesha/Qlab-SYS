/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config options go here.
  // For example:
  // reactStrictMode: true,
  
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

    return config;
  },
};

export default nextConfig;
