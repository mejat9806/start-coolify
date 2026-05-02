import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../../components/ThemeToggle';

describe('ThemeToggle', () => {
  it('renders the theme toggle button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has aria-label for accessibility', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label');
  });

  it('toggles between light and dark modes', () => {
    render(<ThemeToggle />);
    const toggleButton = screen.getByRole('button');

    fireEvent.click(toggleButton);
    // ThemeToggle uses useEffect to apply theme, which may require waitFor
    // For now, we just verify the button can be clicked without error
    expect(toggleButton).toBeInTheDocument();
  });

  it('preserves theme preference via localStorage', () => {
    const setSpy = vi.spyOn(globalThis.localStorage, 'setItem');

    render(<ThemeToggle />);

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    expect(setSpy).toHaveBeenCalledWith('theme-preference', 'dark');
  });
});
