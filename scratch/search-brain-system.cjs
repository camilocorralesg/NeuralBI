const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/camil/.gemini/antigravity-ide/brain';

function searchDir(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'tempmediaStorage' && file !== 'browser_recordings') {
        try {
          searchDir(filePath);
        } catch(e) {}
      }
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.txt') || file.endsWith('.md')) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          if (content.includes('function Manifesto') && content.length > 2000) {
            console.log(`FOUND Manifesto in: ${filePath} (size: ${content.length})`);
            fs.writeFileSync(`c:/Users/camil/My Repos/Figma Design/scratch/restored-from-brain-${path.basename(filePath)}.txt`, content);
          }
        } catch (e) {}
      }
    }
  });
}

console.log("Searching all brain files recursively...");
searchDir(brainDir);
console.log("Search complete.");
