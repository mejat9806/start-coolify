import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer', () => {
  const currentYear = new Date().getFullYear();

  it('renders copyright text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(new RegExp(`© ${currentYear}`));
    expect(copyrightText).toBeInTheDocument();
  });

  it('displays the current year in copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/©.*\d{4}/i)).toBeInTheDocument();
  });

  it('does not display external links', () => {
    render(<Footer />);
    const socialLinks = screen.queryByRole('link');
    // Footer should have no social media links after branding removal
    expect(socialLinks).toBeNull();
  });
});
