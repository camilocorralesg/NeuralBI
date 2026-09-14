import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CookieBanner from '../../components/CookieBanner';

describe('Component: CookieBanner', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not display if user has already given consent', () => {
    localStorage.setItem('neuralbi_cookie_consent', 'accepted');

    render(<CookieBanner />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.queryByText(/Privacy & Telemetry/i)).not.toBeInTheDocument();
  });

  it('renders banner after 1-second delay for first-time visitors', () => {
    render(<CookieBanner />);

    // Initially not open
    expect(screen.queryByText(/Privacy & Telemetry/i)).not.toBeInTheDocument();

    // Advance timer past 1000ms
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(screen.getByText(/Privacy & Telemetry/i)).toBeInTheDocument();
    expect(screen.getByText(/Accept All/i)).toBeInTheDocument();
    expect(screen.getByText(/Essential Only/i)).toBeInTheDocument();
  });

  it('stores "accepted" in localStorage when clicking Accept All', () => {
    render(<CookieBanner />);

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    const acceptButton = screen.getByText(/Accept All/i);
    fireEvent.click(acceptButton);

    expect(localStorage.getItem('neuralbi_cookie_consent')).toBe('accepted');
  });

  it('stores "essential" in localStorage when clicking Essential Only', () => {
    render(<CookieBanner />);

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    const essentialButton = screen.getByText(/Essential Only/i);
    fireEvent.click(essentialButton);

    expect(localStorage.getItem('neuralbi_cookie_consent')).toBe('essential');
  });

  it('stores "essential" when clicking the close (X) button', () => {
    render(<CookieBanner />);

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    const closeButton = screen.getByLabelText(/Close cookie banner/i);
    fireEvent.click(closeButton);

    expect(localStorage.getItem('neuralbi_cookie_consent')).toBe('essential');
  });

  it('contains accessible link to Privacy Policy', () => {
    render(<CookieBanner />);

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    const privacyLink = screen.getByRole('link', { name: /Privacy Policy/i });
    expect(privacyLink).toHaveAttribute('href', '/privacy');
  });
});
