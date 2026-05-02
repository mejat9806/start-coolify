import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock localStorage before any tests
const localStorageStore: Record<string, string> = {};
const localStorageProxy = new Proxy(localStorageStore, {
  get: (_, key: string | number | symbol) => {
    if (key === 'getItem') return (k: string) => localStorageStore[k] || null;
    if (key === 'setItem') return (k: string, v: string) => { localStorageStore[k] = v; };
    if (key === 'removeItem') return (k: string) => delete localStorageStore[k];
    if (key === 'clear') return () => Object.keys(localStorageStore).forEach((k) => delete localStorageStore[k]);
    return localStorageStore[key];
  },
});

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageProxy,
  writable: true,
});

// Mock the @tanstack/react-start createServerFn
vi.mock('@tanstack/react-start', () => ({
  createServerFn: () => {
    const mockFn = vi.fn((options) => options);
    mockFn.inputValidator = vi.fn().mockImplementation(() => mockFn);
    mockFn.handler = vi.fn().mockReturnValue(Promise.resolve([]));
    mockFn.use = () => mockFn;
    return mockFn;
  },
}));

// Mock window with localStorage and matchMedia combined
const originalWindow = globalThis.window;
Object.defineProperty(globalThis, 'window', {
  value: {
    ...originalWindow,
    localStorage: localStorageProxy,
    matchMedia: vi.fn().mockImplementation((query) => ({
      matches: query.includes('dark'),
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  },
  writable: true,
});

// Mock HTMLFormElement's submit method
HTMLFormElement.prototype.submit = vi.fn();
HTMLFormElement.prototype.requestSubmit = vi.fn();

// Mock window.FormData
if (!globalThis.FormData) {
  globalThis.FormData = class FormData {
    append = vi.fn();
    get = vi.fn();
    getAll = vi.fn();
    has = vi.fn();
    delete = vi.fn();
    set = vi.fn();
    keys = vi.fn();
    values = vi.fn();
    entries = vi.fn();
    [Symbol.iterator] = vi.fn();
  };
}

// Global mocks
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: false,
    status: 500,
  })
);

// Mock ResizeObserver
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = MockResizeObserver;

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
global.IntersectionObserver = MockIntersectionObserver;
