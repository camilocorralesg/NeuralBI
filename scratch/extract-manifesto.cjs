const fs = require('fs');

const matchPath = 'c:/Users/camil/My Repos/Figma Design/scratch/match-1141.json';
if (!fs.existsSync(matchPath)) {
  console.error("File not found:", matchPath);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(matchPath, 'utf8'));

// The content of the step is inside data.content
// Let's write it to a clean js file.
fs.writeFileSync('c:/Users/camil/My Repos/Figma Design/scratch/extracted-content-1141.txt', data.content || '');
console.log("Extracted content of step 1141.");

const match858Path = 'c:/Users/camil/My Repos/Figma Design/scratch/match-858.json';
if (fs.existsSync(match858Path)) {
  const data858 = JSON.parse(fs.readFileSync(match858Path, 'utf8'));
  fs.writeFileSync('c:/Users/camil/My Repos/Figma Design/scratch/extracted-content-858.txt', data858.content || '');
  console.log("Extracted content of step 858.");
}
