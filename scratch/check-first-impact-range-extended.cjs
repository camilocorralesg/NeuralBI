const fs = require('fs');

const content = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/src/App.jsx', 'utf8');
const lines = content.split('\n');

console.log("Lines 921 to 1050 in App.jsx:");
for (let i = 921; i <= 1050; i++) {
  console.log(`${i}: ${lines[i - 1]}`);
}
