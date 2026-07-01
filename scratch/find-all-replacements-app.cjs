const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/camil/.gemini/antigravity-ide/brain';
const folders = fs.readdirSync(brainDir).filter(f => {
  return fs.statSync(path.join(brainDir, f)).isDirectory() && f !== 'tempmediaStorage';
});

console.log(`Searching across ${folders.length} conversations for App.jsx replacements...`);

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
          if ((call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') && call.args && call.args.TargetFile && call.args.TargetFile.endsWith('App.jsx')) {
            let length = 0;
            if (call.args.ReplacementContent) length = call.args.ReplacementContent.length;
            if (call.args.ReplacementChunks) {
              length = call.args.ReplacementChunks.reduce((acc, chunk) => acc + (chunk.ReplacementContent || '').length, 0);
            }
            
            console.log(`Found replacement in conv ${folder}, step ${data.step_index}, size: ${length}`);
            
            // Check if it contains some keywords
            const keywords = ['Manifesto', 'Industries', 'Methodology', 'CaseStudy', 'Footer'];
            const contentString = JSON.stringify(call.args);
            const matchedKeywords = keywords.filter(k => contentString.includes(k));
            
            if (matchedKeywords.length > 0) {
              console.log(`  -> Matched keywords: ${matchedKeywords.join(', ')}`);
              fs.writeFileSync(`c:/Users/camil/My Repos/Figma Design/scratch/app-replace-${folder}-${data.step_index}.txt`, JSON.stringify(call.args, null, 2));
            }
          }
        }
      }
    } catch (e) {
    }
  }
}

console.log("Scan complete.");
