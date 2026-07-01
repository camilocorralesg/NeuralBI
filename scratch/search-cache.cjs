const fs = require('fs');
const path = require('path');

const targetDir = 'c:/Users/camil/My Repos/Figma Design/node_modules';

function searchDir(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file === '.vite' || file === '.rolldown' || file === '.cache') {
        searchFiles(filePath);
      } else {
        // Only walk top level or specific subfolders
        if (dir === targetDir) {
          try {
            searchDir(filePath);
          } catch(e) {}
        }
      }
    }
  });
}

function searchFiles(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      try {
        searchFiles(filePath);
      } catch(e) {}
    } else {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('Manifesto') && content.length > 5000) {
          console.log(`FOUND Manifesto in cache file: ${filePath} (size: ${content.length})`);
          fs.writeFileSync(`c:/Users/camil/My Repos/Figma Design/scratch/restored-cache-${path.basename(filePath)}.txt`, content);
        }
      } catch(e) {}
    }
  });
}

console.log("Searching node_modules cache folders...");
searchDir(targetDir);
console.log("Search complete.");
