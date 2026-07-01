const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/camil/.gemini/antigravity-ide/brain';
const folders = fs.readdirSync(brainDir).filter(f => {
  return fs.statSync(path.join(brainDir, f)).isDirectory() && f !== 'tempmediaStorage';
});

console.log(`Searching across ${folders.length} conversations for App.jsx writes...`);

for (const folder of folders) {
  const logPath = path.join(brainDir, folder, '.system_generated/logs/transcript.jsonl');
  if (!fs.existsSync(logPath)) continue;
  
  const fileContent = fs.readFileSync(logPath, 'utf8');
  const lines = fileContent.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    try {
      const data = JSON.parse(line);
      
      if (data.tool_calls) {
        for (const call of data.tool_calls) {
          if (call.name === 'write_to_file' && call.args && call.args.TargetFile && call.args.TargetFile.endsWith('App.jsx')) {
            console.log(`Found write_to_file of App.jsx in conv ${folder}, step ${data.step_index}, size: ${call.args.CodeContent.length}`);
            fs.writeFileSync(`c:/Users/camil/My Repos/Figma Design/scratch/app-write-${folder}-${data.step_index}.txt`, call.args.CodeContent);
          }
        }
      }
    } catch (e) {
    }
  }
}

console.log("Scan complete.");
