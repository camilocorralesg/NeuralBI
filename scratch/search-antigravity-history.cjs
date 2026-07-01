const fs = require('fs');
const path = require('path');

const historyDir = 'C:/Users/camil/AppData/Roaming/Antigravity IDE/User/History';

if (!fs.existsSync(historyDir)) {
  console.log(`History folder not found at ${historyDir}`);
  process.exit(0);
}

console.log(`Searching Antigravity IDE History at ${historyDir}...`);

let foundFiles = [];

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
      // IDE history files might not have extension or have extensions, let's read all files
      // Let's filter files that are close in size to App.jsx (150KB-300KB)
      if (stat.size > 100000 && stat.size < 400000) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          if (content.includes('function Manifesto') && content.includes('function MethodologyDiagram') && content.includes('function CaseStudy')) {
            console.log(`FOUND Candidate: ${filePath} (size: ${content.length}, date: ${stat.mtime})`);
            foundFiles.push({
              filePath: filePath,
              size: content.length,
              mtime: stat.mtime,
              content: content
            });
          }
        } catch(e) {}
      }
    }
  });
}

searchDir(historyDir);

// Sort found files by modification time descending (most recent first)
foundFiles.sort((a, b) => b.mtime - a.mtime);

console.log(`Found ${foundFiles.length} candidate files.`);

if (foundFiles.length > 0) {
  const best = foundFiles[0];
  console.log(`BEST CANDIDATE: ${best.filePath} modified at ${best.mtime}`);
  fs.writeFileSync('c:/Users/camil/My Repos/Figma Design/scratch/recovered-app-from-history.jsx', best.content);
  console.log("Wrote recovered App.jsx to scratch/recovered-app-from-history.jsx");
} else {
  console.log("No candidates found!");
}
