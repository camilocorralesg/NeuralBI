import { describe, it, expect } from 'vitest';
import sitemap from '../../app/sitemap.js';

describe('SEO: sitemap.xml Generator', () => {
  it('returns an array of sitemap route objects', () => {
    const map = sitemap();

    expect(map).toBeInstanceOf(Array);
    expect(map.length).toBeGreaterThanOrEqual(4);
  });

  it('contains the homepage with highest priority (1.0) and weekly frequency', () => {
    const map = sitemap();
    const home = map.find((item) => item.url === 'https://neuralbi.com');

    expect(home).toBeDefined();
    expect(home.priority).toBe(1.0);
    expect(home.changeFrequency).toBe('weekly');
    expect(home.lastModified).toBeInstanceOf(Date);
  });

  it('includes key conversion and legal pages with appropriate priority hierarchy', () => {
    const map = sitemap();
    const urls = map.map((item) => item.url);

    expect(urls).toContain('https://neuralbi.com/privacy');
    expect(urls).toContain('https://neuralbi.com/terms');
    expect(urls).toContain('https://neuralbi.com/thank-you');

    const thankYou = map.find((item) => item.url === 'https://neuralbi.com/thank-you');
    const privacy = map.find((item) => item.url === 'https://neuralbi.com/privacy');
    const terms = map.find((item) => item.url === 'https://neuralbi.com/terms');

    expect(thankYou.priority).toBe(0.5);
    expect(privacy.priority).toBe(0.3);
    expect(terms.priority).toBe(0.3);
  });

  it('all routes have valid lastModified timestamps', () => {
    const map = sitemap();

    for (const item of map) {
      expect(item.lastModified).toBeInstanceOf(Date);
      expect(isNaN(item.lastModified.getTime())).toBe(false);
    }
  });
});
