import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../components/sections/Navbar';
import { LanguageProvider } from '../../context/LanguageContext';

describe('Component: Navbar', () => {
  beforeEach(() => {
    document.body.style.overflow = 'unset';
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
  });

  afterEach(() => {
    document.body.style.overflow = 'unset';
  });

  it('renders the brand logo, all core navigation section links, and language selector', () => {
    render(
      <LanguageProvider defaultLang="en">
        <Navbar activeHero="remix" />
      </LanguageProvider>
    );

    expect(screen.getAllByAltText('NeuralBI Logo')[0]).toBeInTheDocument();

    const expectedSections = ['Manifesto', 'Arsenal', 'Integrations', 'Verticals', 'Protocol'];
    for (const section of expectedSections) {
      expect(screen.getByRole('link', { name: new RegExp(section, 'i') })).toHaveAttribute(
        'href',
        `#${section.toLowerCase()}`
      );
    }

    expect(screen.getByRole('button', { name: /Select language/i })).toBeInTheDocument();
  });

  it('renders translated navigation links when Spanish is selected', () => {
    render(
      <LanguageProvider defaultLang="es">
        <Navbar activeHero="remix" />
      </LanguageProvider>
    );

    const spanishSections = [
      { name: 'Manifiesto', href: '#manifesto' },
      { name: 'Arsenal', href: '#arsenal' },
      { name: 'Integraciones', href: '#integrations' },
      { name: 'Sectores', href: '#verticals' },
      { name: 'Metodología', href: '#protocol' },
    ];

    for (const section of spanishSections) {
      expect(screen.getByRole('link', { name: new RegExp(section.name, 'i') })).toHaveAttribute(
        'href',
        section.href
      );
    }
  });

  it('toggles mobile menu, renders segmented language selector and applies body scroll lock', () => {
    render(
      <LanguageProvider defaultLang="en">
        <Navbar activeHero="remix" />
      </LanguageProvider>
    );

    // Mobile hamburger button
    const openButton = screen.getByLabelText(/Open navigation menu/i);
    expect(openButton).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    fireEvent.click(openButton);

    expect(document.body.style.overflow).toBe('hidden');
    const closeButton = screen.getByLabelText(/Close navigation menu/i);
    expect(closeButton).toBeInTheDocument();

    // Verify segmented control inside mobile overlay
    expect(screen.getByRole('radiogroup', { name: /Select language/i })).toBeInTheDocument();

    // Click to close
    fireEvent.click(closeButton);
    expect(document.body.style.overflow).toBe('unset');
  });

  it('closes mobile menu when a navigation item inside it is clicked', () => {
    render(
      <LanguageProvider defaultLang="en">
        <Navbar activeHero="remix" />
      </LanguageProvider>
    );

    const openButton = screen.getByLabelText(/Open navigation menu/i);
    fireEvent.click(openButton);

    expect(document.body.style.overflow).toBe('hidden');

    // Find links inside mobile overlay
    const mobileLinks = screen.getAllByRole('link', { name: /Manifesto/i });
    // The second one is inside the mobile drawer
    fireEvent.click(mobileLinks[mobileLinks.length - 1]);

    expect(document.body.style.overflow).toBe('unset');
  });

  it('hides desktop language selector controls in collapsed capsule state until hovered', () => {
    const { container } = render(
      <LanguageProvider defaultLang="en">
        <Navbar activeHero="remix" />
      </LanguageProvider>
    );

    const nav = container.querySelector('nav');
    const controls = screen.getByTestId('nav-desktop-controls');

    // Initially at top of page (!scrolled), controls are visible
    expect(controls).toHaveStyle({ maxWidth: '350px', opacity: '1' });

    // Simulate scrolling past 80px
    Object.defineProperty(window, 'scrollY', { value: 120, writable: true, configurable: true });
    fireEvent.scroll(window);

    // Collapsed capsule: controls container collapsed with maxWidth 0 and opacity 0
    expect(controls).toHaveStyle({ maxWidth: '0px', opacity: '0' });

    // Hover capsule: expands controls
    fireEvent.mouseEnter(nav);
    expect(controls).toHaveStyle({ maxWidth: '350px', opacity: '1' });

    // Mouse leave: collapses back
    fireEvent.mouseLeave(nav);
    expect(controls).toHaveStyle({ maxWidth: '0px', opacity: '0' });

    // Reset scrollY
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
  });

  it('hides the capsule on scroll down and reveals it on scroll up', () => {
    render(
      <LanguageProvider defaultLang="en">
        <Navbar activeHero="remix" />
      </LanguageProvider>
    );

    const wrapper = screen.getByTestId('navbar-wrapper');

    // Initially at top of page: dock is visible
    expect(wrapper).toHaveAttribute('data-dock-hidden', 'false');

    // Scroll down past 80px (e.g. to 200px): capsule hides
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true, configurable: true });
    fireEvent.scroll(window);
    expect(wrapper).toHaveAttribute('data-dock-hidden', 'true');

    // Scroll down further to 300px: capsule stays hidden
    Object.defineProperty(window, 'scrollY', { value: 300, writable: true, configurable: true });
    fireEvent.scroll(window);
    expect(wrapper).toHaveAttribute('data-dock-hidden', 'true');

    // Scroll UP from 300px to 250px (delta > 8px): capsule reappears
    Object.defineProperty(window, 'scrollY', { value: 250, writable: true, configurable: true });
    fireEvent.scroll(window);
    expect(wrapper).toHaveAttribute('data-dock-hidden', 'false');

    // Scroll back to top of page (scrollY <= 80): full navbar visible
    Object.defineProperty(window, 'scrollY', { value: 20, writable: true, configurable: true });
    fireEvent.scroll(window);
    expect(wrapper).toHaveAttribute('data-dock-hidden', 'false');

    // Reset scrollY
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
  });

  it('rolls each link label from two decorative faces while the link keeps one accessible name', () => {
    const { container } = render(
      <LanguageProvider defaultLang="en">
        <Navbar activeHero="remix" />
      </LanguageProvider>
    );
    // No glass pill travels between the links any more.
    expect(container.querySelector('[class*="hoverPill"]')).toBeNull();

    for (const label of ['Manifesto', 'Arsenal', 'Integrations', 'Verticals', 'Protocol']) {
      const link = screen.getByRole('link', { name: label });
      const roll = link.querySelector('[aria-hidden="true"]');
      const faces = [...roll.children];
      // The outgoing face and the white copy that rises in behind it, letter for letter.
      expect(faces).toHaveLength(2);
      faces.forEach((face) => expect(face.textContent).toBe(label));
      const letters = [...faces[0].children];
      expect(letters.map((letter) => letter.style.getPropertyValue('--i'))).toEqual(letters.map((_, index) => String(index)));
    }
  });

  it('traces reading progress on the capsule outline: from the bottom centre, round both ends, to the top', () => {
    const originalRect = Element.prototype.getBoundingClientRect;
    // A 400 × 54 capsule, in a browser without scroll-driven animations (the listener fallback).
    Element.prototype.getBoundingClientRect = function rect() {
      if (this.tagName.toLowerCase() === 'svg') return { width: 400, height: 54, top: 0, left: 0, right: 400, bottom: 54 };
      return originalRect.call(this);
    };
    vi.stubGlobal('CSS', { supports: () => false });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 400 + window.innerHeight + 400, configurable: true });
    try {
      const { container } = render(
        <LanguageProvider defaultLang="en">
          <Navbar activeHero="remix" />
        </LanguageProvider>
      );
      const outline = () => container.querySelector('svg[class*="outline"]');
      // The full-width bar at the top of the page carries no progress.
      expect(outline()).toBeNull();

      Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true });
      fireEvent.scroll(window);
      expect(outline()).toHaveAttribute('aria-hidden', 'true');
      const [right, left] = outline().querySelectorAll('path');
      expect(right).toHaveAttribute('pathLength', '1');
      // The 1.5px stroke sits centred on the 1px border: a pill of radius 26.25 inset by 0.75.
      expect(right.getAttribute('d')).toBe('M200 53.25H373A26.25 26.25 0 0 0 373 0.75H200');
      expect(left.getAttribute('d')).toBe('M200 53.25H27A26.25 26.25 0 0 1 27 0.75H200');
      // Halfway down the page, half of each side is lit.
      expect(right.style.strokeDashoffset).toBe('0.5');
      expect(left.style.strokeDashoffset).toBe('0.5');

      Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
      fireEvent.scroll(window);
      expect(outline()).toBeNull();
    } finally {
      Element.prototype.getBoundingClientRect = originalRect;
      vi.unstubAllGlobals();
      delete document.documentElement.scrollHeight;
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
    }
  });
});


