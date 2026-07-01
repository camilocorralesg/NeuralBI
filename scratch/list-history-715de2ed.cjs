const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/camil/AppData/Roaming/Antigravity IDE/User/History/715de2ed';
if (!fs.existsSync(dir)) {
  console.log("Directory 715de2ed not found!");
  process.exit(0);
}

const files = fs.readdirSync(dir);
console.log(`Files in 715de2ed:`);

const list = [];
for (const file of files) {
  const filePath = path.join(dir, file);
  const stat = fs.statSync(filePath);
  list.push({
    file: file,
    filePath: filePath,
    size: stat.size,
    mtime: stat.mtime
  });
}

list.sort((a, b) => b.mtime - a.mtime);

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

for (const item of list) {
  console.log(`- ${item.file} (size: ${item.size}, mtime: ${item.mtime})`);
  if (item.file.endsWith('.jsx') || item.file.endsWith('.js') || !item.file.includes('.')) {
    try {
      const content = fs.readFileSync(item.filePath, 'utf8');
      const found = components.filter(c => content.includes(`function ${c}`) || content.includes(`const ${c}`));
      console.log(`  -> Components found: ${found.join(', ') || 'NONE'}`);
      
      // Let's write the most complete file out to scratch!
      if (found.length >= 4) {
        const destPath = `c:/Users/camil/My Repos/Figma Design/scratch/recovered-app-715de2ed-${item.file}.jsx`;
        fs.writeFileSync(destPath, content);
        console.log(`  -> Wrote to ${destPath}`);
      }
    } catch(e) {
      console.log(`  -> Error checking: ${e.message}`);
    }
  }
}
