const fs = require('fs');

const recovered = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/scratch/recovered-lines.txt', 'utf8');
const lines = recovered.split('\n');

for (let i = 560; i <= 660; i++) {
  const linePrefix = `${i}: `;
  const matchingLine = lines.find(l => l.startsWith(linePrefix));
  if (matchingLine) {
    console.log(matchingLine);
  } else {
    console.log(`${i}: --- MISSING ---`);
  }
}
