const fs = require('fs');

const diffFilePath = 'c:/Users/camil/My Repos/Figma Design/scratch/restored-trustbar-76589e9c-80e6-4be4-bc91-9526b7378b6a-667.txt';
if (!fs.existsSync(diffFilePath)) {
  console.error("Diff file not found!");
  process.exit(1);
}

const fileContent = fs.readFileSync(diffFilePath, 'utf8');
const lines = fileContent.split('\n');

let restoredCode = '';
let inDiffBlock = false;

for (const line of lines) {
  if (line.startsWith('[diff_block_start]')) {
    inDiffBlock = true;
    continue;
  }
  if (line.startsWith('[diff_block_end]')) {
    inDiffBlock = false;
    continue;
  }
  
  if (inDiffBlock) {
    // For lines starting with +, extract them (but skip the @@ lines)
    if (line.startsWith('+') && !line.startsWith('+++')) {
      restoredCode += line.substring(1) + '\n';
    }
  }
}

fs.writeFileSync('c:/Users/camil/My Repos/Figma Design/scratch/restored-code-667.txt', restoredCode);
console.log("Restored code written to scratch/restored-code-667.txt.");
