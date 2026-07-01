const fs = require('fs');

const script = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/scratch/restored-script-2207.js', 'utf8');

const components = [
  'Manifesto',
  'TrustBar',
  'Industries',
  'Methodology',
  'CaseStudy',
  'Faq',
  'FooterCTA',
  'Footer',
  'IntegrationsHub'
];

for (const comp of components) {
  const hasStart = script.includes(`function ${comp}`) || script.includes(`const ${comp}`) || script.includes(` ${comp}(`);
  console.log(`Component ${comp}: ${hasStart ? 'FOUND' : 'NOT FOUND'}`);
}

console.log(`Script length: ${script.length} characters`);
