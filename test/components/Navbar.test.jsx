import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../components/sections/Navbar';

describe('Component: Navbar', () => {
  beforeEach(() => {
    document.body.style.overflow = 'unset';
  });

  afterEach(() => {
    document.body.style.overflow = 'unset';
  });

  it('renders the brand logo and all core navigation section links', () => {
    render(<Navbar activeHero="remix" />);

    expect(screen.getAllByAltText('NeuralBI Logo')[0]).toBeInTheDocument();

    const expectedSections = ['Manifesto', 'Arsenal', 'Integrations', 'Verticals', 'Protocol'];
    for (const section of expectedSections) {
      expect(screen.getByRole('link', { name: new RegExp(section, 'i') })).toHaveAttribute(
        'href',
        `#${section.toLowerCase()}`
      );
    }
  });

  it('toggles mobile menu and applies body scroll lock when opened', () => {
    render(<Navbar activeHero="remix" />);

    // Mobile hamburger button
    const openButton = screen.getByLabelText(/Open navigation menu/i);
    expect(openButton).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    fireEvent.click(openButton);

    expect(document.body.style.overflow).toBe('hidden');
    const closeButton = screen.getByLabelText(/Close navigation menu/i);
    expect(closeButton).toBeInTheDocument();

    // Click to close
    fireEvent.click(closeButton);
    expect(document.body.style.overflow).toBe('unset');
  });

  it('closes mobile menu when a navigation item inside it is clicked', () => {
    render(<Navbar activeHero="remix" />);

    const openButton = screen.getByLabelText(/Open navigation menu/i);
    fireEvent.click(openButton);

    expect(document.body.style.overflow).toBe('hidden');

    // Find links inside mobile overlay
    const mobileLinks = screen.getAllByRole('link', { name: /Manifesto/i });
    // The second one is inside the mobile drawer
    fireEvent.click(mobileLinks[mobileLinks.length - 1]);

    expect(document.body.style.overflow).toBe('unset');
  });
});
