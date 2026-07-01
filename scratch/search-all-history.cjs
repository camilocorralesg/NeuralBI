const fs = require('fs');
const path = require('path');

function searchDir(dir, depth = 0) {
  if (depth > 4) return;
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          if (file.toLowerCase() === 'history') {
            console.log(`FOUND HISTORY FOLDER: ${filePath}`);
          }
          // Avoid node_modules or large cache folders
          if (file !== 'node_modules' && file !== 'cache' && file !== 'Cache' && file !== 'Local Storage') {
            searchDir(filePath, depth + 1);
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

const roam = process.env.APPDATA;
const local = process.env.LOCALAPPDATA;

if (roam) {
  console.log(`Searching AppData/Roaming...`);
  searchDir(roam);
}
if (local) {
  console.log(`Searching AppData/Local...`);
  searchDir(local);
}

console.log("Search complete.");
