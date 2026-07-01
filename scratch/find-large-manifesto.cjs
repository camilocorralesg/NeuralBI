const fs = require('fs');

const logPath = 'C:/Users/camil/.gemini/antigravity-ide/brain/76589e9c-80e6-4be4-bc91-9526b7378b6a/.system_generated/logs/transcript.jsonl';
const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

console.log(`Scanning ${lines.length} lines of history...`);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const data = JSON.parse(line);
    
    // Check if step content contains App.jsx code (usually very large)
    let contentLen = 0;
    let containsManifesto = false;
    
    if (data.content) {
      contentLen = data.content.length;
      containsManifesto = data.content.includes('function Manifesto');
    }
    
    // Check tool_calls outputs
    if (data.tool_calls) {
      for (const call of data.tool_calls) {
        if (call.args && call.args.CodeContent) {
          contentLen = Math.max(contentLen, call.args.CodeContent.length);
          if (call.args.CodeContent.includes('function Manifesto')) containsManifesto = true;
        }
      }
    }
    
    if (containsManifesto && contentLen > 10000) {
      console.log(`Step ${data.step_index} (${data.type}) has Manifesto and length ${contentLen}`);
      // Write it to scratch
      fs.writeFileSync(`c:/Users/camil/My Repos/Figma Design/scratch/manifesto-large-${data.step_index}.txt`, JSON.stringify(data, null, 2));
    }
  } catch (e) {
  }
}
