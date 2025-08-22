import axios from 'axios';

// Minimal type definitions for search tool
type Tool = {
  name: string;
  description: string;
  parameters: any;
  implementation: (params: any) => Promise<any>;
};

export const searchInternetTool: Tool = {
  name: 'searchInternet',
  description: 'Search the internet for trending custom motorcycle colors, styles, and modification ideas - especially for Indonesian market',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query for trending custom motorcycle colors, styles, modification ideas, or inspirations (use Indonesian keywords for better results)'
      }
    },
    required: ['query']
  },
  implementation: async (params: { query: string }) => {
    try {
      // Check if API key is available
      if (!process.env.SERPSTACK_API_KEY) {
        console.warn('[SearchInternet] API key not found');
        return 'Maaf, fitur pencarian tren sedang tidak tersedia. Silakan tanya langsung untuk rekomendasi warna atau gaya.';
      }

      // Check for empty query
      if (!params.query.trim()) {
        return 'Tolong berikan kata kunci yang lebih spesifik untuk mencari tren.';
      }

      const response = await axios.get('https://api.serpstack.com/search', {
        params: {
          access_key: process.env.SERPSTACK_API_KEY,
          query: params.query,
          engine: 'google',
          num: 5, // Get top 5 results (better chance of getting 3 good ones)
          gl: 'id', // Indonesia region
          hl: 'id' // Indonesian language
        },
        timeout: 10000, // 10 second timeout
      });
      
      if (!response.data.organic_results || response.data.organic_results.length === 0) {
        return 'Tidak menemukan hasil tren terkini untuk kata kunci tersebut. Coba kata kunci lain seperti "trend warna motor" atau "custom motor populer".';
      }
      
      // Filter and format results
      const results = response.data.organic_results
        .filter((result: any) => result.title && result.snippet)
        .slice(0, 3)
        .map((result: any) => ({
          title: result.title,
          url: result.url,
          snippet: result.snippet
        }));

      if (results.length === 0) {
        return 'Tidak menemukan hasil yang relevan. Coba kata kunci lain?';
      }

      return results;
    } catch (error: any) {
      console.error('Internet search failed:', error);
      
      // Handle specific error types
      if (error.code === 'ECONNABORTED') {
        return 'Pencarian tren timeout. Coba lagi dengan kata kunci yang lebih sederhana.';
      }
      
      if (error.response?.status === 401) {
        return 'Maaf, ada masalah dengan akses pencarian tren. Silakan tanya langsung untuk rekomendasi.';
      }
      
      return 'Maaf, tidak bisa mencari tren saat ini. Silakan coba lagi nanti atau tanya langsung untuk rekomendasi warna/gaya.';
    }
  }
};