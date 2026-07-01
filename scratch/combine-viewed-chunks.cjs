const fs = require('fs');
const path = require('path');

const logPath = 'C:/Users/camil/.gemini/antigravity-ide/brain/76589e9c-80e6-4be4-bc91-9526b7378b6a/.system_generated/logs/transcript.jsonl';
const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

console.log(`Scanning ${lines.length} lines of history for VIEW_FILE...`);

// We want to collect all lines of App.jsx that were ever output in VIEW_FILE or in command outputs
const appLines = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const data = JSON.parse(line);
    
    // Check if it's a VIEW_FILE or RUN_COMMAND that contains lines of App.jsx
    let text = '';
    if (data.type === 'VIEW_FILE' && data.content) {
      text = data.content;
    } else if (data.type === 'RUN_COMMAND' && data.content) {
      text = data.content;
    }
    
    if (text && text.includes('File Path:') && text.includes('App.jsx')) {
      // Extract line numbers and original lines
      // Format is usually "line_number: content"
      const matches = text.matchAll(/(\d+): (.*)/g);
      for (const match of matches) {
        const lineNum = parseInt(match[1]);
        const lineContent = match[2];
        appLines[lineNum] = lineContent;
      }
    }
  } catch (e) {
  }
}

const sortedLineNumbers = Object.keys(appLines).map(Number).sort((a, b) => a - b);
console.log(`Recovered ${sortedLineNumbers.length} unique lines of App.jsx`);

if (sortedLineNumbers.length > 0) {
  let output = '';
  let prevLine = 0;
  for (const lineNum of sortedLineNumbers) {
    if (lineNum !== prevLine + 1) {
      output += `\n// --- GAP FROM LINE ${prevLine + 1} TO ${lineNum - 1} ---\n\n`;
    }
    output += `${lineNum}: ${appLines[lineNum]}\n`;
    prevLine = lineNum;
  }
  fs.writeFileSync('c:/Users/camil/My Repos/Figma Design/scratch/recovered-lines.txt', output);
  console.log("Written recovered lines to scratch/recovered-lines.txt");
} else {
  console.log("No lines recovered.");
}
