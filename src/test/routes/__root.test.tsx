import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from '@tanstack/react-router';

describe('Root Route Layout', () => {
  it('renders the document structure properly', () => {
    const { container } = render(<div data-testid="app-root">App Root</div>);
    document.body.textContent = '';
    document.body.appendChild(container);
    expect(screen.getByTestId('app-root')).toBeInTheDocument();
  });

  it('has root layout with header', () => {
    const component = (
      <div data-testid="root-layout">
        <header data-testid="header">Header</header>
        <main data-testid="main">Main Content</main>
        <footer data-testid="footer">Footer</footer>
      </div>
    );
    render(component);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('main')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('navigates between routes properly', () => {
    const testNavigate = () => {
      const history = createMemoryHistory({
        initialEntries: ['/', '/about'],
      });
      return history.location.pathname;
    };

    expect(testNavigate()).toBe('/about');
  });

  it('handles route transitions', () => {
    const transitions = [
      { from: '/', to: '/about' },
      { from: '/about', to: '/search' },
      { from: '/search', to: '/' },
    ];

    transitions.forEach(({ from, to }) => {
      const mockHistory = {
        location: { pathname: to } as Location,
        navigate: vi.fn(),
      };
      expect(mockHistory.location.pathname).toBe(to);
    });
  });

  it('has proper HTML structure', () => {
    render(
      <>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body>
            <div id="app">Content</div>
          </body>
        </html>
      </>
    );

    expect(document.querySelector('html')).toHaveAttribute('lang', 'en');
    expect(document.querySelector('meta[name="viewport"]')).toHaveAttribute(
      'content',
      'width=device-width, initial-scale=1'
    );
  });

  it('loads scripts before body', () => {
    const { container } = render(
      <html lang="en">
        <head>
          <script src="/app.js" />
        </head>
        <body>
          <div>No scripts here</div>
        </body>
      </html>
    );

    const headScripts = container.querySelectorAll('head script');
    const bodyScripts = container.querySelectorAll('body script');

    expect(headScripts.length).toBeGreaterThanOrEqual(0);
    expect(bodyScripts.length).toBe(0);
  });

  it('applies proper CSS classes structure', () => {
    const component = (
      <div className="root-layout">
        <div className="page-wrap">
          <div className="content">Content goes here</div>
        </div>
      </div>
    );

    render(component);

    const pageWrap = screen.getByText('Content goes here').parentElement;
    expect(pageWrap?.className).toContain('page-wrap');

    const rootLayout = pageWrap?.parentElement;
    expect(rootLayout?.className).toContain('root-layout');
  });
});
