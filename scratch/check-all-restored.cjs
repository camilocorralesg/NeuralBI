const fs = require('fs');
const path = require('path');

const scratchDir = 'c:/Users/camil/My Repos/Figma Design/scratch';
const files = fs.readdirSync(scratchDir).filter(f => f.startsWith('app-edit-') && f.endsWith('.txt'));

console.log(`Checking ${files.length} restored edit files...`);

for (const file of files) {
  const filePath = path.join(scratchDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  try {
    const call = JSON.parse(content);
    
    // Check if it has TargetFile
    const target = call.args ? (call.args.TargetFile || '') : '';
    
    // Check code length
    let codeLen = 0;
    let chunks = null;
    
    if (call.args) {
      if (call.args.CodeContent) codeLen = call.args.CodeContent.length;
      if (call.args.ReplacementContent) codeLen = call.args.ReplacementContent.length;
      
      if (call.args.ReplacementChunks) {
        chunks = call.args.ReplacementChunks;
        if (typeof chunks === 'string') {
          try {
            chunks = JSON.parse(chunks);
          } catch(e) {}
        }
        
        if (Array.isArray(chunks)) {
          codeLen = chunks.reduce((acc, chunk) => acc + (chunk.ReplacementContent || '').length, 0);
        } else {
          codeLen = JSON.stringify(chunks).length;
        }
      }
    }
    
    if (codeLen > 2000) {
      console.log(`\n========================================`);
      console.log(`File: ${file}, size: ${content.length}`);
      console.log(`  Tool Name: ${call.name}`);
      console.log(`  Target: ${target}`);
      console.log(`  Code length: ${codeLen}`);
      console.log(`  --> FOUND LARGE CODE BLOCK!`);
      
      let code = '';
      if (call.args) {
        if (call.args.CodeContent) code = call.args.CodeContent;
        else if (call.args.ReplacementContent) code = call.args.ReplacementContent;
        else if (Array.isArray(chunks)) {
          code = chunks.map((chunk, idx) => `// --- Chunk ${idx} ---\n${chunk.ReplacementContent || ''}`).join('\n\n');
        } else {
          code = JSON.stringify(chunks, null, 2);
        }
      }
      fs.writeFileSync(path.join(scratchDir, `recovered-${file}`), code);
      console.log(`  Wrote to recovered-${file}`);
    }
  } catch (e) {
    console.error(`  Error parsing JSON in ${file}:`, e.message);
  }
}
