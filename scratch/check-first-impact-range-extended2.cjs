const fs = require('fs');

const content = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/src/App.jsx', 'utf8');
const lines = content.split('\n');

console.log("Lines 1051 to 1180 in App.jsx:");
for (let i = 1051; i <= 1180; i++) {
  console.log(`${i}: ${lines[i - 1]}`);
}
