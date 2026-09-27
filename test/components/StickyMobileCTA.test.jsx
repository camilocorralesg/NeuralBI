import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import StickyMobileCTA from '../../components/StickyMobileCTA';

describe('Component: StickyMobileCTA', () => {
  const setScrollY = (y) => {
    Object.defineProperty(window, 'scrollY', {
      value: y,
      writable: true,
      configurable: true,
    });
  };

  beforeEach(() => {
    vi.useFakeTimers();
    setScrollY(0);
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('is hidden by default when scroll position is near the top (scrollY <= 350)', () => {
    render(<StickyMobileCTA />);

    expect(screen.queryByText(/Book Audit/i)).not.toBeInTheDocument();
  });

  it('becomes visible after user scrolls past the threshold (scrollY > 350)', () => {
    render(<StickyMobileCTA />);

    act(() => {
      setScrollY(450);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(screen.getByText(/Book Audit/i)).toBeInTheDocument();
    expect(screen.getByText(/Ready to transform data\?/i)).toBeInTheDocument();
    expect(screen.queryByText(/Live Engineering/i)).not.toBeInTheDocument();
  });

  it('hides when the contact/audit section comes into view to prevent visual blocking', () => {
    const contactSection = document.createElement('div');
    contactSection.id = 'contact';
    // Mock getBoundingClientRect so it appears in the lower viewport
    contactSection.getBoundingClientRect = () => ({
      top: 500, // less than window.innerHeight * 0.75 (600px)
      bottom: 1000,
      left: 0,
      right: 400,
      width: 400,
      height: 500,
    });
    document.body.appendChild(contactSection);

    render(<StickyMobileCTA />);

    act(() => {
      setScrollY(800);
      window.dispatchEvent(new Event('scroll'));
    });

    // Should be hidden because contact section is within view
    expect(screen.queryByText(/Book Audit/i)).not.toBeInTheDocument();
  });

  it('triggers smooth scroll and focuses form input when Book Audit is clicked', () => {
    const contactSection = document.createElement('div');
    contactSection.id = 'audit';
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    contactSection.getBoundingClientRect = () => ({
      top: 2500,
      bottom: 3000,
      left: 0,
      right: 400,
      width: 400,
      height: 500,
    });

    const input = document.createElement('input');
    input.focus = vi.fn();
    contactSection.appendChild(input);
    document.body.appendChild(contactSection);

    render(<StickyMobileCTA />);

    // Make it visible first
    act(() => {
      setScrollY(400);
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: /Book Audit/i });
    fireEvent.click(button);

    // Through the shared smooth-scroll helper: natively here (Lenis runs only for a fine pointer), to the section's top.
    expect(scrollTo).toHaveBeenCalledWith({ top: 2500 + window.scrollY, behavior: 'smooth' });

    // After the 600ms focus delay
    act(() => {
      vi.advanceTimersByTime(650);
    });

    expect(input.focus).toHaveBeenCalledWith({ preventScroll: true });
  });
});
