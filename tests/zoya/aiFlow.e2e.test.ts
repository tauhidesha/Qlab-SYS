import { searchInternetTool } from '../../src/ai/tools/searchInternetTool';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Zoya AI End-to-End Tests', () => {
  beforeEach(() => {
    // Reset mocks and set environment variable
    jest.resetAllMocks();
    process.env.SERPSTACK_API_KEY = 'test_api_key';
  });

  describe('searchInternetTool', () => {
    it('should return search results for color trends', async () => {
      // Mock successful response
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          organic_results: [
            {
              title: "Trend Warna Motor 2025",
              url: "https://example.com/trend-warna-2025",
              snippet: "Warna matte black dan candy red menjadi tren terbaru..."
            }
          ]
        }
      });

      const results = await searchInternetTool.implementation({
        query: "trend warna motor 2025"
      });
      
      expect(results).toEqual([
        {
          title: "Trend Warna Motor 2025",
          url: "https://example.com/trend-warna-2025",
          snippet: "Warna matte black dan candy red menjadi tren terbaru..."
        }
      ]);
    });

    it('should handle search errors', async () => {
      // Mock error response
      mockedAxios.get.mockRejectedValueOnce(new Error('API error'));
      
      const result = await searchInternetTool.implementation({
        query: "invalid query"
      });
      
      expect(result).toBe('Maaf, tidak bisa mencari tren saat ini. Silakan coba lagi nanti.');
    });
  });
});