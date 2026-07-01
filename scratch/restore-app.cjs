const fs = require('fs');
const path = require('path');

const logPath = 'C:/Users/camil/.gemini/antigravity-ide/brain/76589e9c-80e6-4be4-bc91-9526b7378b6a/.system_generated/logs/transcript.jsonl';

if (!fs.existsSync(logPath)) {
  console.error("Log file does not exist at:", logPath);
  process.exit(1);
}

const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

console.log(`Scanning ${lines.length} lines of logs...`);

for (let i = lines.length - 1; i >= 0; i--) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const data = JSON.parse(line);
    
    // Check in tool calls
    if (data.tool_calls) {
      for (const call of data.tool_calls) {
        if (call.name === 'write_to_file' && call.args && call.args.CodeContent) {
          const content = call.args.CodeContent;
          const target = call.args.TargetFile || '';
          
          // Make sure we are matching App.jsx and not scripts
          if (target.endsWith('App.jsx') && content.includes('function Manifesto')) {
            console.log(`Found candidate in write_to_file at step ${data.step_index}`);
            fs.writeFileSync('c:/Users/camil/My Repos/Figma Design/scratch/restored-chunk.txt', content);
            console.log("Written restored content to scratch/restored-chunk.txt");
            process.exit(0);
          }
        }
      }
    }
  } catch (e) {
    // Ignore invalid JSON lines
  }
}

console.log("No candidates found in write_to_file. Checking replace_file_content...");

// If we didn't find any in write_to_file, let's check replace_file_content calls
for (let i = lines.length - 1; i >= 0; i--) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const data = JSON.parse(line);
    if (data.tool_calls) {
      for (const call of data.tool_calls) {
        if ((call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') && call.args) {
          const target = call.args.TargetFile || '';
          if (target.endsWith('App.jsx')) {
            // Check replacement contents
            const content = call.args.ReplacementContent || '';
            if (content.includes('function Manifesto')) {
              console.log(`Found candidate in replace_file_content at step ${data.step_index}`);
              fs.writeFileSync('c:/Users/camil/My Repos/Figma Design/scratch/restored-chunk.txt', content);
              console.log("Written restored content to scratch/restored-chunk.txt");
              process.exit(0);
            }
            if (call.args.ReplacementChunks) {
              for (const chunk of call.args.ReplacementChunks) {
                const rep = chunk.ReplacementContent || '';
                if (rep.includes('function Manifesto')) {
                  console.log(`Found candidate in ReplacementChunks at step ${data.step_index}`);
                  fs.writeFileSync('c:/Users/camil/My Repos/Figma Design/scratch/restored-chunk.txt', rep);
                  console.log("Written restored content to scratch/restored-chunk.txt");
                  process.exit(0);
                }
              }
            }
          }
        }
      }
    }
  } catch (e) {
  }
}

console.log("No candidates found anywhere.");
