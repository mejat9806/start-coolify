import { describe, it, expect } from 'vitest';

describe('Form Validation', () => {
  describe('Email Validation', () => {
    const validateEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    it('accepts valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.org')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail(' ')).toBe(false);
    });
  });

  describe('URL Validation', () => {
    const validateUrl = (url: string): boolean => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    it('accepts valid URLs', () => {
      expect(validateUrl('https://example.com')).toBe(true);
      expect(validateUrl('http://example.com/path')).toBe(true);
      expect(validateUrl('https://example.com:8080')).toBe(true);
    });

    it('rejects invalid URLs', () => {
      expect(validateUrl('not-a-url')).toBe(false);
      expect(validateUrl('example.com')).toBe(false);
      expect(validateUrl('')).toBe(false);
    });
  });

  describe('Integer Validation', () => {
    const isInteger = (value: unknown): value is number => {
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };

    it('accepts valid integers', () => {
      expect(isInteger(0)).toBe(true);
      expect(isInteger(1)).toBe(true);
      expect(isInteger(-1)).toBe(true);
      expect(isInteger(1000)).toBe(true);
    });

    it('rejects non-integers', () => {
      expect(isInteger(3.14)).toBe(false);
      expect(isInteger(null)).toBe(false);
      expect(isInteger('123')).toBe(false);
      expect(isInteger(NaN)).toBe(false);
      expect(isInteger(Infinity)).toBe(false);
    });
  });

  describe('Array Non-Empty', () => {
    const isNonEmptyArray = <T>(value: unknown): value is T[] => {
      return Array.isArray(value) && value.length > 0;
    };

    it('accepts non-empty arrays', () => {
      expect(isNonEmptyArray([1])).toBe(true);
      expect(isNonEmptyArray([1, 2, 3])).toBe(true);
      expect(isNonEmptyArray(['test'])).toBe(true);
    });

    it('rejects empty arrays', () => {
      expect(isNonEmptyArray([])).toBe(false);
    });

    it('rejects non-arrays', () => {
      expect(isNonEmptyArray(null)).toBe(false);
      expect(isNonEmptyArray('test')).toBe(false);
      expect(isNonEmptyArray({})).toBe(false);
    });
  });

  describe('Boolean Validation', () => {
    const isBoolean = (value: unknown): value is boolean => {
      return typeof value === 'boolean';
    };

    it('accepts true/false', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    it('rejects truthy/falsy values that are not booleans', () => {
      expect(isBoolean(1)).toBe(false);
      expect(isBoolean('true')).toBe(false);
      expect(isBoolean('')).toBe(false);
      expect(isBoolean(null)).toBe(false);
    });
  });

  describe('String Validation', () => {
    const isString = (value: unknown): value is string => {
      return typeof value === 'string';
    };

    it('accepts strings', () => {
      expect(isString('')).toBe(true);
      expect(isString('test')).toBe(true);
      expect(isString('a'.repeat(1000))).toBe(true);
    });

    it('rejects non-strings', () => {
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
    });
  });
});

describe('Type Guards', () => {
  describe('Nullish Coalescing', () => {
    it('provides default for null', () => {
      const value: string | null = null;
      const defaultValue = 'default';
      expect(value ?? defaultValue).toBe('default');
    });

    it('returns value for defined', () => {
      const value: string | null = 'present';
      const defaultValue = 'default';
      expect(value ?? defaultValue).toBe('present');
    });
  });

  describe('Array Methods Type Guards', () => {
    it('filters with type guard', () => {
      const items: (string | null)[] = ['a', null, 'b'];
      const filtered = items.filter((item): item is string => item !== null);
      expect(filtered).toEqual(['a', 'b']);
    });

    it('some with type guard', () => {
      const items: (string | null)[] = ['a', null, 'b'];
      const hasString = items.some((item): item is string => item !== null);
      expect(hasString).toBe(true);
    });
  });

  describe('Object Property Type Guards', () => {
    it('checks property existence', () => {
      const obj: Record<string, unknown> = { a: 1 };
      const hasA = 'a' in obj;
      expect(hasA).toBe(true);
    });

    it('checks property existence false', () => {
      const obj: Record<string, unknown> = { a: 1 };
      const hasB = 'b' in obj;
      expect(hasB).toBe(false);
    });
  });
});
