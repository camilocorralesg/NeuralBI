const fs = require('fs');
const path = require('path');

const logPath = 'C:/Users/camil/.gemini/antigravity-ide/brain/76589e9c-80e6-4be4-bc91-9526b7378b6a/.system_generated/logs/transcript.jsonl';
const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

const components = [
  'Manifesto',
  'TrustBar',
  'Industries',
  'Methodology',
  'CaseStudy',
  'Faq',
  'FooterCTA',
  'Footer'
];

console.log("Scanning all steps for any components...");

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const data = JSON.parse(line);
    let content = '';
    
    if (data.content) content += '\n' + data.content;
    
    if (data.tool_calls) {
      for (const call of data.tool_calls) {
        if (call.args) {
          if (call.args.CodeContent) content += '\n' + call.args.CodeContent;
          if (call.args.ReplacementContent) content += '\n' + call.args.ReplacementContent;
          if (call.args.ReplacementChunks) {
            for (const chunk of call.args.ReplacementChunks) {
              content += '\n' + (chunk.ReplacementContent || '');
            }
          }
        }
      }
    }
    
    const found = components.filter(comp => content.includes(`function ${comp}`) || content.includes(`const ${comp}`));
    if (found.length > 0) {
      console.log(`Step ${data.step_index} (${data.type}): size=${content.length}. Components found: ${found.join(', ')}`);
      fs.writeFileSync(`c:/Users/camil/My Repos/Figma Design/scratch/restored-step-${data.step_index}.txt`, content);
    }
  } catch (e) {
  }
}

console.log("Scan complete.");
