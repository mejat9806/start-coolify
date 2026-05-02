import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AnimeEntry, AnimeDetail } from '../../serverFns/jikan';

// Mock fetch globally
const mockFetch = vi.fn();
vi.spyOn(globalThis, 'fetch').mockImplementation(mockFetch as any);

describe('Jikan Server Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  describe('AnimeEntry type', () => {
    it('should have required mal_id field', () => {
      const entry: AnimeEntry = {
        mal_id: 1,
        title: 'Test Anime',
        synopsis: null,
        images: { jpg: { image_url: 'test.jpg' } },
        score: 8.5,
      };
      expect(entry.mal_id).toBe(1);
      expect(entry.title).toBe('Test Anime');
    });
  });

  describe('AnimeDetail type', () => {
    it('should have all required fields', () => {
      const detail: AnimeDetail = {
        mal_id: 1,
        title: 'Test Anime',
        title_english: null,
        title_japanese: null,
        synopsis: null,
        images: { jpg: { image_url: 'test.jpg', large_image_url: 'test_large.jpg' } },
        score: 8.5,
        scored_by: 1000,
        rank: 100,
        episodes: 12,
        status: 'Aired',
        aired: { string: '2024' },
        studios: [{ name: 'Studio 1' }],
        genres: [{ name: 'Action' }],
        themes: [],
        trailer: { url: null, embed_url: null },
      };
      expect(detail.mal_id).toBe(1);
      expect(detail.title).toBe('Test Anime');
      expect(detail.episodes).toBe(12);
    });
  });

  describe('fetchJikan function', () => {
    it('should call the API with correct parameters', async () => {
      const mockData: AnimeEntry[] = [
        {
          mal_id: 1,
          title: 'Cowboy Bebop',
          synopsis: 'A space western',
          images: { jpg: { image_url: 'image1.jpg' } },
          score: 8.8,
        },
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ data: mockData }),
      });

      // Import the actual module and manually call the fetch logic
      const { fetchJikan } = await import('../../serverFns/jikan');

      // The handler should have called fetch
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('search=')
      );
    });

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
      });

      const { fetchJikan } = await import('../../serverFns/jikan');

      await expect(fetchJikan.handler({})).rejects.toThrow('API request failed');
    });
  });

  describe('fetchAnimeById function', () => {
    it('should handle anime detail response', async () => {
      const mockDetail: AnimeDetail = {
        mal_id: 1,
        title: 'Test Anime',
        title_english: 'Test Anime',
        title_japanese: 'テストアニメ',
        synopsis: 'A test description',
        images: { jpg: { image_url: 'test.jpg', large_image_url: 'test_large.jpg' } },
        score: 9.0,
        scored_by: 5000,
        rank: 10,
        episodes: 24,
        status: 'Finished Airing',
        aired: { string: '2024' },
        studios: [{ name: 'Studio XYZ' }],
        genres: [{ name: 'Action' }, { name: 'Drama' }],
        themes: [],
        trailer: { url: 'https://youtube.com/watch?v=abc123', embed_url: 'https://youtube.com/embed/abc123' },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ data: mockDetail }),
      });

      const { fetchAnimeById } = await import('../../serverFns/jikan');

      await expect(fetchAnimeById.handler({ id: 1 })).resolves.toBeDefined();
    });

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
      });

      const { fetchAnimeById } = await import('../../serverFns/jikan');

      await expect(fetchAnimeById.handler({ id: 999999 })).rejects.toThrow('API request failed');
    });
  });
});
