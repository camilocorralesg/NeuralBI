const fs = require('fs');

const path2678 = 'c:/Users/camil/My Repos/Figma Design/scratch/app-edit-76589e9c-80e6-4be4-bc91-9526b7378b6a-2678.txt';
const path2682 = 'c:/Users/camil/My Repos/Figma Design/scratch/app-edit-76589e9c-80e6-4be4-bc91-9526b7378b6a-2682.txt';

if (fs.existsSync(path2678)) {
  const content = fs.readFileSync(path2678, 'utf8');
  console.log(`File 2678 exists, size: ${content.length}`);
  try {
    const data = JSON.parse(content);
    console.log(`Tool call name: ${data.tool_calls[0].name}`);
    console.log(`TargetFile: ${data.tool_calls[0].args.TargetFile}`);
    console.log(`CodeContent length: ${data.tool_calls[0].args.CodeContent.length}`);
    fs.writeFileSync('c:/Users/camil/My Repos/Figma Design/scratch/recovered-app-full-2678.txt', data.tool_calls[0].args.CodeContent);
    console.log("Wrote full App.jsx backup to scratch/recovered-app-full-2678.txt");
  } catch (e) {
    console.error("Error parsing 2678:", e);
  }
}

if (fs.existsSync(path2682)) {
  const content = fs.readFileSync(path2682, 'utf8');
  console.log(`File 2682 exists, size: ${content.length}`);
  try {
    const data = JSON.parse(content);
    console.log(`Tool call name: ${data.tool_calls[0].name}`);
    console.log(`TargetFile: ${data.tool_calls[0].args.TargetFile}`);
    console.log(`CodeContent length: ${data.tool_calls[0].args.CodeContent.length}`);
    fs.writeFileSync('c:/Users/camil/My Repos/Figma Design/scratch/recovered-app-full-2682.txt', data.tool_calls[0].args.CodeContent);
    console.log("Wrote full App.jsx backup to scratch/recovered-app-full-2682.txt");
  } catch (e) {
    console.error("Error parsing 2682:", e);
  }
}
