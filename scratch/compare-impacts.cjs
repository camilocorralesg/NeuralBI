const fs = require('fs');

const content = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/src/App.jsx', 'utf8');
const lines = content.split('\n');

console.log("=== First Impact declaration (around line 853) ===");
for (let i = 850; i <= 880; i++) {
  console.log(`${i}: ${lines[i - 1]}`);
}

console.log("\n=== Second Impact declaration (around line 2267) ===");
for (let i = 2264; i <= 2294; i++) {
  console.log(`${i}: ${lines[i - 1]}`);
}
