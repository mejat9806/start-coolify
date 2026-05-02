import { describe, it, expect } from 'vitest';

describe('Formatting Utilities', () => {
  describe('Score Formatting', () => {
    const formatScore = (score: number | null, decimals: number = 1): string => {
      if (score === null) return 'N/A';
      return score.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    };

    it('formats valid scores', () => {
      expect(formatScore(8.5)).toBe('8.5');
      expect(formatScore(8.567)).toBe('8.6');
      expect(formatScore(10)).toBe('10.0');
      expect(formatScore(0.5)).toBe('0.5');
    });

    it('handles null scores', () => {
      expect(formatScore(null)).toBe('N/A');
    });

    it('formats with different decimal places', () => {
      expect(formatScore(8.567, 1)).toBe('8.6');
      expect(formatScore(8.567, 2)).toBe('8.57');
      expect(formatScore(8.567, 0)).toBe('9');
    });
  });

  describe('Duration Formatting', () => {
    const formatDuration = (episodes: number | null): string => {
      if (episodes === null) return 'Unknown episodes';
      return episodes === 1 ? '1 episode' : `${episodes} episodes`;
    };

    it('handles single episode', () => {
      expect(formatDuration(1)).toBe('1 episode');
    });

    it('handles multiple episodes', () => {
      expect(formatDuration(12)).toBe('12 episodes');
      expect(formatDuration(24)).toBe('24 episodes');
    });

    it('handles unknown duration', () => {
      expect(formatDuration(null)).toBe('Unknown episodes');
    });
  });

  describe('Synopsis Truncation', () => {
    const truncateSynopsis = (synopsis: string | null, maxLength: number = 200): string => {
      if (synopsis === null) return 'No synopsis available.';
      if (synopsis.length <= maxLength) return synopsis;
      return synopsis.slice(0, maxLength - 3) + '...';
    };

    it('returns synopsis when within limit', () => {
      const shortSynopsis = 'A short description.';
      expect(truncateSynopsis(shortSynopsis)).toBe(shortSynopsis);
    });

    it('truncates long synopses', () => {
      const longSynopsis = 'A'.repeat(300);
      const truncated = truncateSynopsis(longSynopsis);
      expect(truncated.length).toBeLessThanOrEqual(203); // 200 - 3 for '...'
      expect(truncated.endsWith('...')).toBe(true);
    });

    it('handles null synopsis', () => {
      expect(truncateSynopsis(null)).toBe('No synopsis available.');
    });
  });

  describe('Date Formatting', () => {
    const formatDate = (dateString: string | null): string => {
      if (!dateString) return 'Unknown';
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Unknown';
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      } catch {
        return 'Unknown';
      }
    };

    it('formats valid dates', () => {
      const date = formatDate('2024-01-15');
      expect(date).toBeTruthy();
      expect(date).not.toBe('Unknown');
    });

    it('handles null dates', () => {
      expect(formatDate(null)).toBe('Unknown');
    });

    it('handles invalid dates', () => {
      expect(formatDate('not-a-date')).toBe('Unknown');
    });
  });

  describe('Studio Name Formatting', () => {
    function formatStudio(studioName: string): string {
      return studioName.charAt(0).toUpperCase() + studioName.slice(1);
    }

    function formatStudios(studios: { name: string }[]): string {
      if (studios.length === 0) return 'Unknown studio';
      return studios.map(s => formatStudio(s.name)).join(', ');
    }

    it('capitalizes studio names', () => {
      expect(formatStudio('studio gonzo')).toBe('Studio gonzo');
      expect(formatStudio('bones')).toBe('Bones');
    });

    it('format multiple studios', () => {
      expect(formatStudios([{ name: 'madhouse' }])).toBe('Madhouse');
      expect(formatStudios([{ name: 'ufotable' }, { name: 'j.c.staff' }])).toContain('Ufotable');
    });

    it('handles empty studio list', () => {
      expect(formatStudios([])).toBe('Unknown studio');
    });
  });

  describe('Text Ellipsis', () => {
    function createEllipsis(text: string, limit: number): string {
      if (text.length <= limit) return text;
      return text.slice(0, limit - 3) + '...';
    }

    it('returns text unchanged if within limit', () => {
      expect(createEllipsis('Hello', 10)).toBe('Hello');
    });

    it('adds ellipsis when truncated', () => {
      const result = createEllipsis('Hello World', 5);
      expect(result).toBe('He...');
    });

    it('handles very short limits', () => {
      const result = createEllipsis('Hello', 1);
      expect(result).toBe('He...');
    });
  });
});
