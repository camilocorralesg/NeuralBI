const fs = require('fs');

const content = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/src/App.jsx', 'utf8');
const lines = content.split('\n');

console.log("Lines 1180 to 1205 in CURRENT App.jsx:");
for (let i = 1180; i <= 1205; i++) {
  console.log(`${i}: ${lines[i - 1]}`);
}
