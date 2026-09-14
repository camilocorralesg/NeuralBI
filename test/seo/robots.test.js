import { describe, it, expect } from 'vitest';
import robots from '../../app/robots.js';

describe('SEO: robots.txt Generator', () => {
  it('returns valid robots rules configuration', () => {
    const config = robots();

    expect(config).toBeDefined();
    expect(config.rules).toBeInstanceOf(Array);
    expect(config.rules.length).toBeGreaterThan(0);
  });

  it('allows root crawling for all user agents (*)', () => {
    const config = robots();
    const wildCardRule = config.rules.find((r) => r.userAgent === '*');

    expect(wildCardRule).toBeDefined();
    expect(wildCardRule.allow).toBe('/');
  });

  it('blocks sensitive API endpoints from crawler indexing', () => {
    const config = robots();
    const wildCardRule = config.rules.find((r) => r.userAgent === '*');

    expect(wildCardRule.disallow).toBeDefined();
    const disallowRules = Array.isArray(wildCardRule.disallow)
      ? wildCardRule.disallow
      : [wildCardRule.disallow];

    expect(disallowRules).toContain('/api/');
  });

  it('declares the authoritative sitemap URL with https', () => {
    const config = robots();

    expect(config.sitemap).toBe('https://neuralbi.com/sitemap.xml');
  });
});
