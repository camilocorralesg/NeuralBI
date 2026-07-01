const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/camil/.gemini/antigravity-ide/brain';
const folders = fs.readdirSync(brainDir).filter(f => {
  return fs.statSync(path.join(brainDir, f)).isDirectory() && f !== 'tempmediaStorage';
});

console.log(`Searching across ${folders.length} conversations...`);

for (const folder of folders) {
  const logPath = path.join(brainDir, folder, '.system_generated/logs/transcript.jsonl');
  if (!fs.existsSync(logPath)) continue;
  
  const fileContent = fs.readFileSync(logPath, 'utf8');
  const lines = fileContent.split('\n');
  
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (!line) continue;
    try {
      const data = JSON.parse(line);
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
        console.log(`Found candidate in conversation ${folder}, step ${data.step_index} with length ${content.length}`);
        fs.writeFileSync('c:/Users/camil/My Repos/Figma Design/scratch/restored-app-full.txt', content);
        console.log("Successfully wrote full backup to scratch/restored-app-full.txt");
        process.exit(0);
      }
    } catch (e) {
    }
  }
}

console.log("No candidates found in any past logs.");
