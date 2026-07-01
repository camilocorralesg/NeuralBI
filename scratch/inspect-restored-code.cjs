const fs = require('fs');

const content = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/scratch/restored-code-667.txt', 'utf8');

const components = [
  'Manifesto',
  'TrustBar',
  'Industries',
  'Methodology',
  'CaseStudy',
  'Faq',
  'FooterCTA',
  'Footer'
];

for (const comp of components) {
  const hasStart = content.includes(`function ${comp}`) || content.includes(`const ${comp}`);
  console.log(`Component ${comp}: ${hasStart ? 'FOUND' : 'NOT FOUND'}`);
}

console.log(`Total length: ${content.length} characters`);
