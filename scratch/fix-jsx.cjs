const fs = require('fs');

const filePath = 'c:/Users/camil/My Repos/Figma Design/src/App.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix unescaped >
content = content.replace(/> INITIALIZING ARSENAL_MODULES/g, '&gt; INITIALIZING ARSENAL_MODULES');
content = content.replace(/> \[STATUS\] ONLINE/g, '&gt; [STATUS] ONLINE');
content = content.replace(/> {item.body}/g, '&gt; {item.body}');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed JSX syntax errors.");
