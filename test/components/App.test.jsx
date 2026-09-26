import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../../components/App';

// Mock canvas / WebGL / Spline components if needed
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/',
}));

vi.mock('@splinetool/react-spline', () => ({
  default: () => <div data-testid="mock-spline" />,
}));

vi.mock('../../components/FloatingLines', () => ({
  default: () => <div data-testid="mock-floating-lines" />,
}));

describe('App component (Home screen)', () => {
  it('renders without throwing and mounts core sections', () => {
    render(<App />);
    expect(document.getElementById('manifesto')).not.toBeNull();
    expect(document.getElementById('arsenal')).not.toBeNull();
    expect(document.getElementById('protocol')).not.toBeNull();
    expect(document.getElementById('integrations')).not.toBeNull();
    expect(document.getElementById('contact')).not.toBeNull();
  });
});
