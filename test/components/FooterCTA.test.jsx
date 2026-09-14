import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FooterCTA from '../../components/sections/FooterCTA';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('Component: FooterCTA Form Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('renders input fields with accessible labels and initially disabled submit button', () => {
    render(<FooterCTA activeHero="remix" />);

    expect(screen.getByLabelText(/^Name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Work Email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/What do you want to explore\?/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /Book a Technical Audit/i });
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  it('displays validation errors when fields are blurred with empty or invalid values', async () => {
    render(<FooterCTA activeHero="remix" />);

    const nameInput = screen.getByLabelText(/^Name$/i);
    const emailInput = screen.getByLabelText(/^Work Email$/i);
    const messageInput = screen.getByLabelText(/What do you want to explore\?/i);

    // Blur empty name
    fireEvent.blur(nameInput);
    expect(screen.getByText(/Please enter your full name\./i)).toBeInTheDocument();

    // Type invalid email and blur
    fireEvent.change(emailInput, { target: { name: 'email', value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    expect(screen.getByText(/Please enter a valid work email/i)).toBeInTheDocument();

    // Blur empty message
    fireEvent.blur(messageInput);
    expect(screen.getByText(/Please tell us what you would like to explore or optimize\./i)).toBeInTheDocument();
  });

  it('enables the submit button once all fields are valid', () => {
    render(<FooterCTA activeHero="remix" />);

    const nameInput = screen.getByLabelText(/^Name$/i);
    const emailInput = screen.getByLabelText(/^Work Email$/i);
    const messageInput = screen.getByLabelText(/What do you want to explore\?/i);
    const submitBtn = screen.getByRole('button', { name: /Book a Technical Audit/i });

    expect(submitBtn).toBeDisabled();

    fireEvent.change(nameInput, { target: { name: 'name', value: 'Alex Morgan' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'alex@enterprise.com' } });
    fireEvent.change(messageInput, { target: { name: 'message', value: 'Need data migration' } });

    expect(submitBtn).not.toBeDisabled();
  });

  it('successfully submits the form and navigates to /thank-you', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, leadId: 'lead_12345' }),
    });

    render(<FooterCTA activeHero="remix" />);

    const nameInput = screen.getByLabelText(/^Name$/i);
    const emailInput = screen.getByLabelText(/^Work Email$/i);
    const messageInput = screen.getByLabelText(/What do you want to explore\?/i);
    const submitBtn = screen.getByRole('button', { name: /Book a Technical Audit/i });

    fireEvent.change(nameInput, { target: { name: 'name', value: 'Alex Morgan' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'alex@enterprise.com' } });
    fireEvent.change(messageInput, { target: { name: 'message', value: 'Need data architecture' } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Alex Morgan',
          email: 'alex@enterprise.com',
          message: 'Need data architecture',
        }),
      });
      expect(mockPush).toHaveBeenCalledWith('/thank-you');
    });
  });

  it('renders inline error message if API submission fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'CRM service temporarily unavailable' }),
    });

    render(<FooterCTA activeHero="remix" />);

    const nameInput = screen.getByLabelText(/^Name$/i);
    const emailInput = screen.getByLabelText(/^Work Email$/i);
    const messageInput = screen.getByLabelText(/What do you want to explore\?/i);
    const submitBtn = screen.getByRole('button', { name: /Book a Technical Audit/i });

    fireEvent.change(nameInput, { target: { name: 'name', value: 'Alex Morgan' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'alex@enterprise.com' } });
    fireEvent.change(messageInput, { target: { name: 'message', value: 'Need assistance' } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/CRM service temporarily unavailable/i)).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('handles network exceptions gracefully and displays user-friendly message', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<FooterCTA activeHero="remix" />);

    const nameInput = screen.getByLabelText(/^Name$/i);
    const emailInput = screen.getByLabelText(/^Work Email$/i);
    const messageInput = screen.getByLabelText(/What do you want to explore\?/i);
    const submitBtn = screen.getByRole('button', { name: /Book a Technical Audit/i });

    fireEvent.change(nameInput, { target: { name: 'name', value: 'Alex Morgan' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'alex@enterprise.com' } });
    fireEvent.change(messageInput, { target: { name: 'message', value: 'Need assistance' } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Network error\. Please try again later\./i)).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
