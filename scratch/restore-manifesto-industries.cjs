const fs = require('fs');
const path = require('path');

const currentAppPath = 'c:/Users/camil/My Repos/Figma Design/src/App.jsx';
const backupAppPath = 'c:/Users/camil/My Repos/Figma Design/scratch/recovered-app-715de2ed-QQck.jsx.jsx';

if (!fs.existsSync(backupAppPath)) {
  console.error("Backup file QQck.jsx not found!");
  process.exit(1);
}

const currentContent = fs.readFileSync(currentAppPath, 'utf8');
const backupContent = fs.readFileSync(backupAppPath, 'utf8');

const backupLines = backupContent.split('\n');

// Manifesto starts at line 788 and Industries ends at line 2039 in backupContent.
// Note: line index in array is 0-based.
// Lines 788 to 2039 (1-indexed) corresponds to index range 787 to 2038 (inclusive).
const extractedCodeLines = backupLines.slice(787, 2039);
const extractedCode = extractedCodeLines.join('\n');

console.log(`Extracted code block length: ${extractedCode.length} characters (${extractedCodeLines.length} lines)`);

// Find insertion boundary in currentApp
const boundaryPattern = '// ─── SECTION 8: METHODOLOGY (THE DEPLOYMENT PROTOCOL) ───';
const boundaryIndex = currentContent.indexOf(boundaryPattern);

if (boundaryIndex === -1) {
  console.error("Could not find Methodology boundary in current App.jsx!");
  process.exit(1);
}

const newContent = currentContent.slice(0, boundaryIndex) + 
                   extractedCode + '\n\n' + 
                   currentContent.slice(boundaryIndex);

fs.writeFileSync(currentAppPath, newContent, 'utf8');
console.log("Successfully restored Manifesto and Industries components into src/App.jsx!");
