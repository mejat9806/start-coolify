import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Navigation Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('URL Query Parameter Parsing', () => {
    it('parses query parameters correctly', () => {
      const testUrl = 'https://example.com/search?q=test&page=1';
      const url = new URL(testUrl);

      expect(url.searchParams.get('q')).toBe('test');
      expect(url.searchParams.get('page')).toBe('1');
    });

    it('handles missing query parameters', () => {
      const testUrl = 'https://example.com/search';
      const url = new URL(testUrl);

      expect(url.searchParams.get('q')).toBeNull();
      expect(url.searchParams.get('page')).toBeNull();
    });

    it('encodes search queries properly', () => {
      const searchTerm = 'Attack on Titan';
      const encoded = encodeURIComponent(searchTerm);

      expect(encoded).toBe('Attack%20on%20Titan');
      expect(decodeURIComponent(encoded)).toBe(searchTerm);
    });

    it('handles unicode characters in search', () => {
      const searchTerm = '東京リベンジャーズ';
      const encoded = encodeURIComponent(searchTerm);

      expect(encoded).toContain('%E6%9D%B1');
      expect(decodeURIComponent(encoded)).toBe(searchTerm);
    });
  });

  describe('Search Query Validation', () => {
    const isValidSearchQuery = (query: string): boolean => {
      return (
        typeof query === 'string' &&
        query.length >= 1 &&
        query.length <= 100 &&
        /\S/.test(query)
      );
    };

    it('accepts valid single-word queries', () => {
      expect(isValidSearchQuery('Naruto')).toBe(true);
      expect(isValidSearchQuery('one piece')).toBe(true);
    });

    it('rejects empty queries', () => {
      expect(isValidSearchQuery('')).toBe(false);
      expect(isValidSearchQuery('   ')).toBe(false);
    });

    it('rejects queries that are too long', () => {
      const longQuery = 'a'.repeat(101);
      expect(isValidSearchQuery(longQuery)).toBe(false);
    });

    it('accepts multi-word queries', () => {
      expect(isValidSearchQuery('My Hero Academia')).toBe(true);
      expect(isValidSearchQuery('Fullmetal Alchemist Brotherhood')).toBe(true);
    });

    it('handles queries with special characters', () => {
      expect(isValidSearchQuery('Boku no Hero')).toBe(true);
      expect(isValidSearchQuery('Tokyo Ghoul &')).toBe(true);
    });
  });

  describe('Anime ID Validation', () => {
    const isValidAnimeId = (id: number): boolean => {
      return Number.isInteger(id) && id > 0 && id <= 9999999;
    };

    it('accepts valid anime IDs', () => {
      expect(isValidAnimeId(1)).toBe(true);
      expect(isValidAnimeId(10)).toBe(true);
      expect(isValidAnimeId(1000)).toBe(true);
    });

    it('rejects invalid IDs', () => {
      expect(isValidAnimeId(0)).toBe(false);
      expect(isValidAnimeId(-1)).toBe(false);
      expect(isValidAnimeId(9999999999)).toBe(false);
      expect(isValidAnimeId(3.14)).toBe(false);
      expect(isValidAnimeId(NaN)).toBe(false);
    });
  });

  describe('Route Generation', () => {
    it('generates search route with query params', () => {
      const query = 'test';
      const searchParams = new URLSearchParams({ q: query });
      const route = `/search?${searchParams.toString()}`;

      expect(route).toBe('/search?q=test');
    });

    it('generates anime detail route', () => {
      const id = 123;
      const route = `/anime/${id}`;

      expect(route).toBe('/anime/123');
    });

    it('generates home route', () => {
      const route = '/';
      expect(route).toBe('/');
    });

    it('generates about route', () => {
      const route = '/about';
      expect(route).toBe('/about');
    });
  });

  describe('API Response Validation', () => {
    const validateAnimeEntry = (data: unknown): boolean => {
      if (typeof data !== 'object' || data === null) return false;
      if (!('mal_id' in data)) return false;
      if (!('title' in data)) return false;
      if (!('images' in data)) return false;
      if (!('jpg' in data.images)) return false;
      if (!('image_url' in (data.images as any).jpg)) return false;
      return true;
    };

    it('validates correct anime entry format', () => {
      const validEntry = {
        mal_id: 1,
        title: 'Test Anime',
        images: { jpg: { image_url: 'test.jpg' } },
      };

      expect(validateAnimeEntry(validEntry)).toBe(true);
    });

    it('rejects anime entry missing required fields', () => {
      expect(validateAnimeEntry({ mal_id: 1 })).toBe(false);
      expect(validateAnimeEntry({ images: { jpg: { image_url: 'test.jpg' } } }))
        .toBe(false);
      expect(validateAnimeEntry({}))
        .toBe(false);
    });

    it('rejects invalid data types', () => {
      expect(validateAnimeEntry(null)).toBe(false);
      expect(validateAnimeEntry('string')).toBe(false);
      expect(validateAnimeEntry(123)).toBe(false);
      expect(validateAnimeEntry([])).toBe(false);
    });
  });

  describe('Localization', () => {
    beforeEach(() => {
      vi.spyOn(window.navigator, 'language', 'get')
        .mockReturnValue('en-US');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('formats numbers based on locale', () => {
      const score = 8.768;
      const formatted = score.toLocaleString('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });
      expect(formatted).toBe('8.8');
    });

    it('formats numbers in Japanese locale', () => {
      const score = 8.768;
      const formatted = score.toLocaleString('ja-JP', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });
      expect(formatted).toContain('8');
    });

    it('detects browser language', () => {
      const language = window.navigator.language;
      expect(language).toMatch(/^[\w-]+$/);
    });
  });
});
