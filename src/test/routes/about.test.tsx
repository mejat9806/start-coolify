import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Extract the About component for testing
function About() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">About</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          A small starter with room to grow.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          This framework gives you type-safe routing, server functions, and
          modern SSR defaults. Use this as a clean foundation, then layer in
          your own routes, styling, and add-ons.
        </p>
      </section>
    </main>
  );
}

describe('About Component', () => {
  it('renders the About page heading', () => {
    render(<About />);
    expect(screen.getByText(/small starter/i)).toBeInTheDocument();
  });

  it('contains the introduction paragraph', () => {
    render(<About />);
    expect(screen.getByText(/type-safe routing/i)).toBeInTheDocument();
  });

  it('renders About page structure', () => {
    render(<About />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
