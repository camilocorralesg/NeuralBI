const fs = require('fs');

const logPath = 'C:/Users/camil/.gemini/antigravity-ide/brain/76589e9c-80e6-4be4-bc91-9526b7378b6a/.system_generated/logs/transcript.jsonl';

if (!fs.existsSync(logPath)) {
  console.error("Log file does not exist.");
  process.exit(1);
}

const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

console.log(`Scanning ${lines.length} lines of history...`);

let foundCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const data = JSON.parse(line);
    const contentStr = JSON.stringify(data);
    
    if (contentStr.includes('function Manifesto') || contentStr.includes('const Manifesto')) {
      console.log(`\n========================================`);
      console.log(`Match found at line ${i}, step_index: ${data.step_index}, type: ${data.type}`);
      console.log(`========================================`);
      
      // Let's dump the raw step JSON to a file for inspect
      fs.writeFileSync(`c:/Users/camil/My Repos/Figma Design/scratch/match-${data.step_index}.json`, line);
      foundCount++;
    }
  } catch (e) {
  }
}

console.log(`\nScan complete. Found ${foundCount} matches.`);
