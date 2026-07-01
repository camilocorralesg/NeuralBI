const fs = require('fs');

const content = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/src/App.jsx', 'utf8');

const lines = content.split('\n');
console.log("Function definitions in CURRENT App.jsx:");
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('function ') || line.startsWith('const ')) {
    if (line.includes('Manifesto') || line.includes('Industries') || line.includes('Arsenal') || line.includes('TrustBar') || line.includes('Methodology') || line.includes('IntegrationsHub') || line.includes('CaseStudy') || line.includes('Faq') || line.includes('FooterCTA') || line.includes('Footer')) {
      console.log(`Line ${i + 1}: ${line}`);
    }
  }
}
