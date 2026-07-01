const fs = require('fs');
const path = require('path');

const appData = process.env.APPDATA;
const localAppData = process.env.LOCALAPPDATA;

console.log("Searching for History directories in AppData...");

const pathsToSearch = [appData, localAppData];

for (const p of pathsToSearch) {
  if (!p) continue;
  try {
    const list = fs.readdirSync(p);
    for (const item of list) {
      const fullPath = path.join(p, item);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          // Check if there is Cursor, Code, or other IDE folders
          if (item.toLowerCase().includes('code') || item.toLowerCase().includes('cursor') || item.toLowerCase().includes('gemini') || item.toLowerCase().includes('vscode')) {
            console.log(`Potential IDE folder: ${fullPath}`);
            // Check if there is User/History
            const histPath = path.join(fullPath, 'User/History');
            if (fs.existsSync(histPath)) {
              console.log(`  -> FOUND HISTORY FOLDER: ${histPath}`);
            }
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}
