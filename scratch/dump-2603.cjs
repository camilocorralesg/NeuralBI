const fs = require('fs');

const fileContent = fs.readFileSync('c:/Users/camil/My Repos/Figma Design/scratch/restored-step-2603.txt', 'utf8');

// The file contains lines. Line 9 starts with '9: "const fs ...' and has the JSON string.
// Let's parse it by extracting the JSON string from the line.
const lines = fileContent.split('\n');
const line9 = lines.find(l => l.startsWith('9: "') || l.startsWith('9: '));

if (!line9) {
  console.error("Line 9 not found in restored-step-2603.txt!");
  process.exit(1);
}

// Extract string value
let rawStr = line9.substring(line9.indexOf('"'));
// Strip trailing carriage return or whatever
if (rawStr.endsWith('\r')) rawStr = rawStr.slice(0, -1);

let parsed = '';
try {
  parsed = JSON.parse(rawStr);
} catch (e) {
  // If JSON.parse fails, maybe it's not a complete JSON string, let's write a smarter extractor
  console.log("JSON.parse failed, trying regex extraction...");
  const match = fileContent.match(/9:\s*"(.*)"\r?\n10:\s*<truncated/s);
  if (match) {
    try {
      parsed = JSON.parse('"' + match[1] + '"');
    } catch(e2) {
      console.error("Regex parsing also failed:", e2.message);
      parsed = match[1];
    }
  } else {
    parsed = rawStr;
  }
}

// Wait! Since it has <truncated 24877 bytes> in the file, wait...
// Does the file actually have the text "<truncated 24877 bytes>"?
// Yes, in restored-step-2603.txt, line 10 is:
// "10: 2: <truncated 24877 bytes>"
// Ah! That means restored-step-2603.txt is truncated too!
// Oh! Because the log scan loaded step 2603, and step 2603 was a VIEW_FILE step of size 2627.
// Wait, if it was a VIEW_FILE step of size 2627, it was viewing another file that was already truncated!
// Ah!

console.log("Parsed content length:", parsed.length);
console.log(parsed.substring(0, 500));
