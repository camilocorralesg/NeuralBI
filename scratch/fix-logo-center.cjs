const fs = require('fs');

const filePath = 'c:/Users/camil/My Repos/Figma Design/src/App.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find the exact string to replace
const oldCode = `              {/* Exact brand logo centering */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%'
              }}>
                <img 
                  src={logoSoloUrl} 
                  alt="NeuralBI Hub" 
                  style={{ 
                    height: '42px', 
                    width: 'auto', 
                    opacity: 0.95, 
                    display: 'block',
                    marginLeft: '15px' /* Compensate for the inherent asymmetrical spacing inside the SVG's viewBox */
                  }} 
                />
              </div>`;

const newCode = `              {/* Absolute mathematical logo centering */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
              }}>
                <img 
                  src={logoSoloUrl} 
                  alt="NeuralBI Hub" 
                  style={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '55.5%', /* Force push to the right by 5.5% of container to perfectly offset the SVG's asymmetrical viewBox */
                    transform: 'translate(-50%, -50%)',
                    height: '44px', /* Slightly larger for improved visual weight */
                    width: 'auto', 
                    opacity: 0.95, 
                    display: 'block'
                  }} 
                />
              </div>`;

if (!content.includes(oldCode)) {
  console.log("Could not find the exact old code block. Attempting a fallback regex replacement...");
  
  // Fallback regex if spacing/indentation is slightly different
  const fallbackRegex = /\{\/\* Exact brand logo centering \*\/\}.*?<\/div>/s;
  if (fallbackRegex.test(content)) {
    content = content.replace(fallbackRegex, newCode);
    console.log("Fallback replacement successful!");
  } else {
    console.error("Fallback regex also failed. Exiting.");
    process.exit(1);
  }
} else {
  content = content.replace(oldCode, newCode);
  console.log("Exact replacement successful!");
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("App.jsx updated.");
