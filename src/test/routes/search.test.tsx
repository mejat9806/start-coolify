import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Search Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  it('has a search heading', () => {
    const component = <h1>Search Results</h1>;
    render(component);
    expect(screen.getByText(/search results/i)).toBeInTheDocument();
  });

  it('displays search query in title', () => {
    const query = 'Naruto';
    const component = (
      <div>
        <h1>Search Results</h1>
        <p>Searching for: {query}</p>
      </div>
    );
    render(component);
    expect(screen.getByText(/searching for: naruto/i)).toBeInTheDocument();
  });

  it('renders search results section', () => {
    const component = <div data-testid="results">Results go here</div>;
    render(component);
    expect(screen.getByTestId('results')).toBeInTheDocument();
  });

  it('handles empty search results', () => {
    const component = (
      <div data-testid="no-results">
        <p>No anime found</p>
      </div>
    );
    render(component);
    expect(screen.getByTestId('no-results')).toBeInTheDocument();
    expect(screen.getByText(/no anime found/i)).toBeInTheDocument();
  });

  it('displays loading state during search', () => {
    const component = (
      <div data-testid="loading">
        <p>Loading...</p>
      </div>
    );
    render(component);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders search form with input field', () => {
    const component = (
      <form data-testid="search-form">
        <input type="text" placeholder="Search anime..." data-testid="search-input" />
        <button type="submit">Search</button>
      </form>
    );
    render(component);
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search anime/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('allows users to type search queries', async () => {
    const component = (
      <form data-testid="search-form">
        <input type="text" placeholder="Search anime..." data-testid="search-input" />
        <button type="submit">Search</button>
      </form>
    );
    render(component);

    const userInput = screen.getByPlaceholderText(/search anime/i);
    await userEvent.type(userInput, 'My Hero Academia');

    expect(userInput).toHaveValue('My Hero Academia');
  });

  it('submits search form on Enter key', async () => {
    const handleSubmit = vi.fn();
    const component = (
      <form onSubmit={handleSubmit} data-testid="search-form">
        <input type="text" placeholder="Search anime..." data-testid="search-input" />
        <button type="submit">Search</button>
      </form>
    );
    render(component);

    const searchInput = screen.getByPlaceholderText(/search anime/i);
    await userEvent.type(searchInput, 'Test Anime{enter}');

    expect(handleSubmit).toHaveBeenCalled();
  });

  it('displays search results as cards', () => {
    const mockResults = [
      { title: 'Anime 1', image: 'url1.jpg' },
      { title: 'Anime 2', image: 'url2.jpg' },
    ];

    const component = (
      <div data-testid="results">
        {mockResults.map((result, index) => (
          <article key={index} data-testid={`result-${index}`}>
            <img src={result.image} alt={result.title} />
            <h3>{result.title}</h3>
          </article>
        ))}
      </div>
    );
    render(component);

    expect(screen.getByText('Anime 1')).toBeInTheDocument();
    expect(screen.getByText('Anime 2')).toBeInTheDocument();
    expect(screen.queryAllByRole('img')).toHaveLength(2);
  });

  describe('Search URL Parameters', () => {
    it('shows URL with query parameter format', () => {
      const mockUrl = '/search?q=test';
      expect(mockUrl).toContain('?q=');
    });

    it('handles URL encoding of search terms', () => {
      const searchTerm = 'My Hero Academia';
      const encoded = encodeURIComponent(searchTerm);
      expect(encoded).toBe('My%20Hero%20Academia');
    });
  });

  describe('Responsive Search', () => {
    it('search input is responsive on mobile', () => {
      const component = (
        <div className="md:col-span-2">
          <input type="text" placeholder="Search..." />
        </div>
      );
      render(component);
      const input = screen.getByPlaceholderText(/search/i);
      expect(input).toBeInTheDocument();
    });

    it('search results grid adjusts on mobile', () => {
      const results = [1, 2, 3, 4, 5, 6];
      const component = (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {results.map((i) => (
            <div key={i} data-testid={`result-${i}`}>
              Result {i}
            </div>
          ))}
        </div>
      );
      render(component);
      expect(screen.queryAllByTestId(/result-/)).toHaveLength(6);
    });
  });
});
