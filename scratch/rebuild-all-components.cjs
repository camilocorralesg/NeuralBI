const fs = require('fs');
const path = require('path');

const recovered = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/scratch/recovered-lines.txt', 'utf8');
const lines = recovered.split('\n');

const componentRanges = {
  Manifesto: { start: 566, end: 911 },
  Industries: { start: 912, end: 2178 },
  Methodology: { start: 2179, end: 2681 },
  FooterCTA: { start: 2682, end: 3329 },
  Footer: { start: 3330, end: 3835 },
  CaseStudy: { start: 3836, end: 4596 }
};

for (const [name, range] of Object.entries(componentRanges)) {
  let compCode = '';
  let lineCount = 0;
  let missingCount = 0;
  
  for (let i = range.start; i <= range.end; i++) {
    const prefix = `${i}: `;
    const match = lines.find(l => l.startsWith(prefix));
    if (match) {
      compCode += match.substring(prefix.length) + '\n';
      lineCount++;
    } else {
      compCode += `// --- MISSING LINE ${i} ---\n`;
      missingCount++;
    }
  }
  
  console.log(`Component ${name}: lines=${lineCount}, missing=${missingCount}`);
  fs.writeFileSync(`c:/Users/camil/My Repos/Figma Design/scratch/rebuild-${name}.txt`, compCode);
}
