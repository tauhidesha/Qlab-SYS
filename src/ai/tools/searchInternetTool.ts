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
  description: 'Search the internet for current trends, colors, or information about motorcycle customization',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query for trending motorcycle colors, styles, or customization ideas'
      }
    },
    required: ['query']
  },
  implementation: async (params: { query: string }) => {
    try {
      const response = await axios.get('https://api.serpstack.com/search', {
        params: {
          access_key: process.env.SERPSTACK_API_KEY,
          query: params.query,
          engine: 'google',
          num: 3, // Get top 3 results
          gl: 'id', // Indonesia region
          hl: 'id' // Indonesian language
        }
      });
      
      if (!response.data.organic_results) {
        return 'Tidak menemukan hasil tren terkini. Coba kata kunci lain?';
      }
      
      return response.data.organic_results.map((result: any) => ({
        title: result.title,
        url: result.url,
        snippet: result.snippet
      }));
    } catch (error) {
      console.error('Internet search failed:', error);
      return 'Maaf, tidak bisa mencari tren saat ini. Silakan coba lagi nanti.';
    }
  }
};