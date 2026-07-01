const fs = require('fs');
const path = require('path');

const pastId = '9990fbf8-6d8c-4d99-b69c-a23eff98013f';
const logPath = `C:/Users/camil/.gemini/antigravity-ide/brain/${pastId}/.system_generated/logs/transcript.jsonl`;

if (!fs.existsSync(logPath)) {
  console.error("Past conversation log file does not exist at:", logPath);
  process.exit(1);
}

const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

console.log(`Scanning ${lines.length} lines of past conversation history...`);

for (let i = lines.length - 1; i >= 0; i--) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const data = JSON.parse(line);
    
    // We are looking for any step that has a large content containing Manifesto
    let content = '';
    if (data.content) content = data.content;
    
    if (data.tool_calls) {
      for (const call of data.tool_calls) {
        if (call.args && call.args.CodeContent) {
          if (call.args.CodeContent.length > content.length) {
            content = call.args.CodeContent;
          }
        }
      }
    }
    
    if (content.includes('function Manifesto') && content.length > 20000) {
      console.log(`Found candidate at step ${data.step_index} with length ${content.length}`);
      fs.writeFileSync('c:/Users/camil/My Repos/Figma Design/scratch/restored-app-full.txt', content);
      console.log("Successfully wrote full backup to scratch/restored-app-full.txt");
      process.exit(0);
    }
  } catch (e) {
  }
}

console.log("No candidates found in past logs.");
