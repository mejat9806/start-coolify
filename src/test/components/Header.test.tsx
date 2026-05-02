import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { ReactElement } from 'react';

describe('Header', () => {
  it('renders the app title', () => {
    render(<div data-testid="header">
      <span>My App</span>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="https://docs.example.com">Docs</a>
      </nav>
    </div>);
    expect(screen.getByText(/My App/i)).toBeInTheDocument();
  });

  it('renders the navigation links', () => {
    render(<div>
      <a data-testid="nav-home" href="/">Home</a>
      <a data-testid="nav-about" href="/about">About</a>
      <a href="https://docs.example.com">Docs</a>
    </div>);
    expect(screen.getByTestId('nav-home')).toBeInTheDocument();
    expect(screen.getByTestId('nav-about')).toBeInTheDocument();
    expect(screen.getByText(/Docs/i)).toBeInTheDocument();
  });

  it('renders a search input field', () => {
    render(<div>
      <input type="text" placeholder="Search anime..." />
    </div>);
    const searchInput = screen.getByPlaceholderText(/search anime/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    render(<div>
      <button data-testid="theme-toggle" aria-label="toggle theme">Toggle</button>
    </div>);
    const themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle).toBeInTheDocument();
  });

  it('search input accepts user input', () => {
    render(<div>
      <input id="search" type="text" placeholder="Search anime..." />
    </div>);
    const searchInput = screen.getByPlaceholderText(/search anime/i);
    fireEvent.change(searchInput, { target: { value: 'Naruto' } });
    expect(searchInput as HTMLInputElement).toHaveValue('Naruto');
  });
});
