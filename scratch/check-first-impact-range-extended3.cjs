const fs = require('fs');

const content = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/src/App.jsx', 'utf8');
const lines = content.split('\n');

console.log("Lines 1181 to 1210 in App.jsx:");
for (let i = 1181; i <= 1210; i++) {
  console.log(`${i}: ${lines[i - 1]}`);
}
