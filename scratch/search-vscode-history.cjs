const fs = require('fs');
const path = require('path');

const appData = process.env.APPDATA;
if (!appData) {
  console.error("APPDATA env var not found!");
  process.exit(1);
}

const vscodeHistoryDir = path.join(appData, 'Code/User/History');

if (!fs.existsSync(vscodeHistoryDir)) {
  console.log(`VS Code History folder not found at ${vscodeHistoryDir}`);
  process.exit(0);
}

console.log(`Searching VS Code History at ${vscodeHistoryDir}...`);

function searchDir(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      try {
        searchDir(filePath);
      } catch(e) {}
    } else {
      // VS Code history files usually don't have extension or have extensions, let's read all files
      if (stat.size > 100000 && stat.size < 400000) { // App.jsx was ~200KB-300KB
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          if (content.includes('function Manifesto') && content.includes('function MethodologyDiagram') && content.includes('function CaseStudy')) {
            console.log(`FOUND VS Code History version in: ${filePath} (size: ${content.length}, date: ${stat.mtime})`);
            fs.writeFileSync(`c:/Users/camil/My Repos/Figma Design/scratch/restored-from-vscode-${path.basename(dir)}-${file}.jsx`, content);
          }
        } catch(e) {}
      }
    }
  });
}

searchDir(vscodeHistoryDir);
console.log("Search complete.");
