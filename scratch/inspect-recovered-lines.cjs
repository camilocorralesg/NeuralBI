const fs = require('fs');

const recovered = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/scratch/recovered-lines.txt', 'utf8');
const lines = recovered.split('\n');

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
  console.log(`\n=== Lines containing "${comp}" ===`);
  let count = 0;
  for (const line of lines) {
    if (line.includes(`function ${comp}`) || line.includes(`const ${comp}`) || line.includes(` ${comp}(`) || line.includes(`<${comp}`)) {
      console.log(line);
      count++;
      if (count > 10) {
        console.log("... (more matches)");
        break;
      }
    }
  }
}
