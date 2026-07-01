const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/camil/.gemini/antigravity-ide/brain';
const folders = fs.readdirSync(brainDir).filter(f => {
  return fs.statSync(path.join(brainDir, f)).isDirectory() && f !== 'tempmediaStorage';
});

console.log(`Searching across ${folders.length} conversations for any App.jsx edit tool calls...`);

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
          const argsStr = JSON.stringify(call.args || {});
          if (argsStr.includes('App.jsx')) {
            console.log(`Found edit in conv ${folder}, step ${data.step_index}, tool: ${call.name}`);
            
            // Check if it contains keywords
            const keywords = ['Manifesto', 'Industries', 'Methodology', 'CaseStudy', 'Footer'];
            const matchedKeywords = keywords.filter(k => argsStr.includes(k));
            if (matchedKeywords.length > 0) {
              console.log(`  -> Keywords: ${matchedKeywords.join(', ')}`);
              fs.writeFileSync(`c:/Users/camil/My Repos/Figma Design/scratch/app-edit-${folder}-${data.step_index}.txt`, JSON.stringify(call, null, 2));
            }
          }
        }
      }
    } catch (e) {
    }
  }
}

console.log("Scan complete.");
