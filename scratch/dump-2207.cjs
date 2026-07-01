const fs = require('fs');

const rawContent = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/scratch/recovered-app-edit-76589e9c-80e6-4be4-bc91-9526b7378b6a-2207.txt', 'utf8');

// It's a JSON string, let's parse it
let parsed = '';
try {
  parsed = JSON.parse(rawContent);
} catch(e) {
  // If it's not double-escaped, just use it
  parsed = rawContent;
}

fs.writeFileSync('c:/Users/camil/My Repos/Figma Design/scratch/restored-script-2207.js', parsed);
console.log("Restored script to scratch/restored-script-2207.js");
