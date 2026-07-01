const fs = require('fs');

const content = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/src/App.jsx', 'utf8');
const lines = content.split('\n');

console.log("Lines 850 to 920 in App.jsx:");
for (let i = 850; i <= 920; i++) {
  console.log(`${i}: ${lines[i - 1]}`);
}
