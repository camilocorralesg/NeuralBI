const fs = require('fs');

const recovered = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/scratch/recovered-lines.txt', 'utf8');

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
  const hasStart = recovered.includes(`function ${comp}`) || recovered.includes(`const ${comp}`);
  console.log(`Component ${comp}: ${hasStart ? 'FOUND' : 'NOT FOUND'}`);
}
