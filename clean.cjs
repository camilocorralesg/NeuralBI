const fs = require('fs');
let code = fs.readFileSync('components/App.jsx', 'utf8');

// 1. Remove eyebrows
code = code.replace(/\s*eyebrow: ".*?",/g, '');

// 2. Remove tech_v4 console text in Arsenal
code = code.replace(/&gt; INITIALIZING ARSENAL_MODULES<br\/>\n\s*&gt; \[STATUS\] ONLINE/g, 'Modules');
code = code.replace(/&gt; \{item\.body\}/g, '{item.body}');

// 3. Remove SYS_ACTIVE and METRIC_0X // STATUS: ACTIVE
code = code.replace(/<div[^>]*>SYS_ACTIVE<\/div>/g, '');
code = code.replace(/METRIC_0\{index \+ 1\} \/\/ STATUS: ACTIVE/g, 'Metric 0{index + 1}');

// 4. Clean up FAQ section
code = code.replace(/CONSOLE \/\/ COGNITIVE_FAQ_ROOT/g, 'FAQ');
code = code.replace(/SYS_STATUS: ACTIVE/g, '');
code = code.replace(/\/\/ SELECT AN EXECUTION INSTRUCTION:/g, 'Select a topic:');
code = code.replace(/> RUN /g, '');
code = code.replace(/> EXEC /g, '');
code = code.replace(/\[EXEC_CONSOLE_OUTPUT\]/g, 'Answer');

// Also remove the whole STATUS: EXECUTION_SUCCESS footer in FAQ
const regexStr = "<div style=\\{\\{ \\n\\s*marginTop: '2rem', \\n\\s*borderTop: '1px dashed rgba\\(198, 255, 52, 0\\.15\\)', \\n\\s*paddingTop: '1rem',\\n\\s*fontFamily: 'var\\(--font-mono\\)',\\n\\s*fontSize: '0\\.7rem',\\n\\s*color: '#c6ff34',\\n\\s*display: 'flex',\\n\\s*justifyContent: 'space-between'\\n\\s*\\}\\}>\\n\\s*<span>STATUS: EXECUTION_SUCCESS \\(200\\)<\\/span>\\n\\s*<span>NEURAL_NODE_0\\{selectedIdx \\+ 1\\}<\\/span>\\n\\s*<\\/div>";
code = code.replace(new RegExp(regexStr, 'g'), '');

// 5. Clean up nodes status
code = code.replace(/\{node\.status\} \(\{node\.latency\}\)/g, '{node.latency}');

fs.writeFileSync('components/App.jsx', code);
console.log('Cleanup complete');
