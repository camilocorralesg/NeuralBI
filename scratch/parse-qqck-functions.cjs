const fs = require('fs');

const content = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/scratch/recovered-app-715de2ed-QQck.jsx.jsx', 'utf8');

// Find all lines starting with function or const definitions
const lines = content.split('\n');
console.log("Function definitions in QQck.jsx:");
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('function ') || line.startsWith('const ')) {
    if (line.includes('Manifesto') || line.includes('Industries') || line.includes('Arsenal') || line.includes('TrustBar') || line.includes('Methodology')) {
      console.log(`Line ${i + 1}: ${line}`);
    }
  }
}
