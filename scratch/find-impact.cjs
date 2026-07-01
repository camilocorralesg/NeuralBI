const fs = require('fs');

const content = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/src/App.jsx', 'utf8');
const lines = content.split('\n');

console.log("Lines containing Impact in App.jsx:");
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('function Impact') || line.includes('const Impact')) {
    console.log(`Line ${i + 1}: ${line.trim()}`);
  }
}
