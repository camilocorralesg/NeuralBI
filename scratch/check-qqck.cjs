const fs = require('fs');

const content = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/scratch/recovered-app-715de2ed-QQck.jsx.jsx', 'utf8');

const components = [
  'Manifesto',
  'TrustBar',
  'Industries',
  'Methodology',
  'CaseStudy',
  'Faq',
  'FooterCTA',
  'Footer',
  'IntegrationsHub',
  'Arsenal'
];

console.log("Checking components in QQck.jsx:");
for (const comp of components) {
  const count = (content.match(new RegExp(comp, 'g')) || []).length;
  console.log(`- ${comp}: matched ${count} times`);
  
  // Print where it's defined
  const defIdx = content.indexOf(`function ${comp}`);
  const constIdx = content.indexOf(`const ${comp}`);
  if (defIdx !== -1) {
    console.log(`  -> Defined as function at index ${defIdx}`);
  }
  if (constIdx !== -1) {
    console.log(`  -> Defined as const at index ${constIdx}`);
  }
}

console.log(`Total length of QQck.jsx: ${content.length} characters`);
