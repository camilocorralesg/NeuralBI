const fs = require('fs');

const filePath = 'c:/Users/camil/My Repos/Figma Design/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Delete lines 852 to 1193 (inclusive, 1-indexed).
// In 0-based array index: range from 851 to 1192.
console.log("Deleting lines 852 to 1193 from App.jsx...");
console.log("Line 852 is:", lines[851]);
console.log("Line 1193 is:", lines[1192]);

const newLines = [
  ...lines.slice(0, 851),
  ...lines.slice(1193)
];

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log("Successfully removed the first Impact component definition!");
