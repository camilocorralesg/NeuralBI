const fs = require('fs');

const recovered = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/scratch/recovered-lines.txt', 'utf8');
const lines = recovered.split('\n');

const componentLines = {
  Manifesto: 580,
  Industries: 912,
  Methodology: 2179,
  CaseStudy: 3836,
  FooterCTA: 3138,
  Footer: 3330
};

for (const [name, startLine] of Object.entries(componentLines)) {
  console.log(`\n=== Component ${name} starting at ${startLine} ===`);
  
  // Find lines starting with startLine:
  let currentLine = startLine;
  let count = 0;
  let gapFound = false;
  
  while (count < 200) {
    const linePrefix = `${currentLine}: `;
    const matchingLine = lines.find(l => l.startsWith(linePrefix));
    if (matchingLine) {
      // Print first 5 and last 5 lines, or just check gaps
      if (count < 5) {
        console.log(matchingLine);
      }
      currentLine++;
      count++;
    } else {
      console.log(`Stopped at line ${currentLine} (not found). Total lines parsed: ${count}`);
      gapFound = true;
      break;
    }
  }
}
