const fs = require('fs');
const path = require('path');

const historyDir = 'C:/Users/camil/AppData/Roaming/Antigravity IDE/User/History';

if (!fs.existsSync(historyDir)) {
  console.log(`History folder not found at ${historyDir}`);
  process.exit(0);
}

console.log("Listing files in Antigravity IDE History...");

let fileList = [];

function walk(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      try {
        walk(filePath);
      } catch(e) {}
    } else {
      fileList.push({
        filePath: filePath,
        size: stat.size,
        mtime: stat.mtime
      });
    }
  });
}

walk(historyDir);
fileList.sort((a, b) => b.mtime - a.mtime);

console.log(`Total history files: ${fileList.length}`);
console.log("Top 30 most recent files:");
fileList.slice(0, 30).forEach(f => {
  console.log(`- ${f.filePath} (size: ${f.size}, mtime: ${f.mtime})`);
  // Print first 100 characters of file
  try {
    const content = fs.readFileSync(f.filePath, 'utf8');
    console.log(`  Snippet: ${content.substring(0, 150).replace(/\r?\n/g, ' ')}`);
  } catch(e) {
    console.log(`  Error reading: ${e.message}`);
  }
});
