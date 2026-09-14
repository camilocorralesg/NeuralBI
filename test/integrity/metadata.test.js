import { describe, it, expect } from 'vitest';
import { metadata } from '../../app/layout.jsx';

describe('Pre-Flight Integrity: Global Layout & Metadata', () => {
  it('defines the correct canonical metadataBase', () => {
    expect(metadata.metadataBase).toBeDefined();
    expect(metadata.metadataBase.href).toBe('https://neuralbi.com/');
  });

  it('configures structured title with brand default and template', () => {
    expect(metadata.title).toBeDefined();
    expect(metadata.title.default).toContain('NeuralBI');
    expect(metadata.title.template).toBe('%s | NeuralBI');
  });

  it('defines high-converting meta description', () => {
    expect(metadata.description).toBeDefined();
    expect(metadata.description.length).toBeGreaterThan(40);
    expect(metadata.description).toContain('Business Intelligence');
    expect(metadata.description).toContain('Power Platform');
  });

  it('defines complete OpenGraph protocol metadata', () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph.siteName).toBe('NeuralBI');
    expect(metadata.openGraph.url).toBe('https://neuralbi.com');
    expect(metadata.openGraph.images).toBeInstanceOf(Array);
    expect(metadata.openGraph.images.length).toBeGreaterThan(0);

    const ogImg = metadata.openGraph.images[0];
    expect(ogImg.url).toBe('/og-image.png');
    expect(ogImg.width).toBe(1200);
    expect(ogImg.height).toBe(630);
    expect(ogImg.alt).toBeDefined();
  });

  it('defines Twitter Card metadata with summary_large_image', () => {
    expect(metadata.twitter).toBeDefined();
    expect(metadata.twitter.card).toBe('summary_large_image');
    expect(metadata.twitter.images).toContain('/og-image.png');
  });

  it('declares SVG and PNG icons and apple-touch-icon', () => {
    expect(metadata.icons).toBeDefined();
    expect(metadata.icons.apple).toBe('/apple-touch-icon.png');
    expect(metadata.icons.shortcut).toBe('/favicon.png');

    const iconUrls = metadata.icons.icon.map((i) => i.url);
    expect(iconUrls).toContain('/favicon.svg');
    expect(iconUrls).toContain('/favicon.png');
  });
});
