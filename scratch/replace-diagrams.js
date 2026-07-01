const fs = require('fs');

const filePath = 'c:/Users/camil/My Repos/Figma Design/src/App.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Identify the block of diagrams from lines 2056 to 2151.
// Let's replace the segment starting with `function IsometricBlueprint` up to `return <IsometricTelemetry colorAccent={colorAccent}; }` or `return <IsometricTelemetry colorAccent={colorAccent} />;\n}`.

const startPattern = 'function IsometricBlueprint({ colorAccent }) {';
const endPattern = 'return <IsometricTelemetry colorAccent={colorAccent} />;\n}';

const startIndex = content.indexOf(startPattern);
let endIndex = content.indexOf(endPattern);

if (startIndex === -1) {
  console.error("Could not find start pattern!");
  process.exit(1);
}

if (endIndex === -1) {
  // Try with CRLF
  const endPatternCRLF = 'return <IsometricTelemetry colorAccent={colorAccent} />;\r\n}';
  endIndex = content.indexOf(endPatternCRLF);
  if (endIndex === -1) {
    console.error("Could not find end pattern!");
    process.exit(1);
  } else {
    endIndex += endPatternCRLF.length;
  }
} else {
  endIndex += endPattern.length;
}

const replacementCode = `// Fully Animated, Style-Specific Isometric SVG/CSS Diagrams for all 15 variants (5 versions * 3 phases)
function MethodologyDiagram({ phase, activeHero }) {
  const colorAccent = '#c6ff34';
  
  const animationStyles = \`
    @keyframes float-p1 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes float-p2 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }
    @keyframes float-p3 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes pulse-ring-slow {
      0% { transform: scale(0.85); opacity: 0.6; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    @keyframes pulse-node {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.4); opacity: 1; }
    }
    @keyframes rotate-radar {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes brutalist-strobe {
      0%, 100% { opacity: 0.1; }
      48%, 52% { opacity: 0.1; }
      50% { opacity: 1; }
    }
    @keyframes brutalist-slider-1 {
      0%, 100% { transform: scaleY(0.3); }
      50% { transform: scaleY(0.9); }
    }
    @keyframes brutalist-slider-2 {
      0%, 100% { transform: scaleY(0.7); }
      50% { transform: scaleY(0.2); }
    }
    @keyframes brutalist-slider-3 {
      0%, 100% { transform: scaleY(0.4); }
      50% { transform: scaleY(0.95); }
    }
    @keyframes modern-laser {
      0%, 100% { transform: translateY(-20px); opacity: 0; }
      10%, 90% { opacity: 1; }
      50% { transform: translateY(20px); }
    }
    @keyframes modern-bar-1 {
      0%, 100% { height: 25px; }
      50% { height: 70px; }
    }
    @keyframes modern-bar-2 {
      0%, 100% { height: 60px; }
      50% { height: 30px; }
    }
    @keyframes modern-bar-3 {
      0%, 100% { height: 40px; }
      50% { height: 80px; }
    }
    @keyframes tech-dash {
      to { stroke-dashoffset: -20; }
    }
    @keyframes tech-led {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 1; }
    }
    @keyframes tech-wave {
      0% { transform: scale(0.6); opacity: 0.9; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    @keyframes sui-blob-morph {
      0%, 100% { border-radius: 50% 50% 50% 50%; }
      30% { border-radius: 60% 40% 55% 45%; }
      60% { border-radius: 45% 55% 40% 60%; }
    }
    @keyframes sui-bento-assemble {
      0%, 100% { transform: translate(0px, 0px); }
      50% { transform: translate(6px, 6px); }
    }
  \`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{animationStyles}</style>

      {/* ─── NEBULA VERSION (spline1) ─── */}
      {activeHero === 'spline1' && phase === 1 && (
        <div style={{ position: 'relative', width: '220px', height: '160px', transform: 'rotateX(60deg) rotateZ(-45deg)', animation: 'float-p1 5s ease-in-out infinite' }}>
          <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', inset: '25px', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', inset: '50px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50%' }} />
          
          {/* Orbital nodes */}
          <div style={{ position: 'absolute', top: '-4px', left: '50%', width: '8px', height: '8px', borderRadius: '50%', background: colorAccent, boxShadow: \`0 0 12px \${colorAccent}\`, transform: 'translateX(-50%)', animation: 'pulse-node 2s infinite' }} />
          <div style={{ position: 'absolute', bottom: '-4px', left: '50%', width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff', transform: 'translateX(-50%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: colorAccent, boxShadow: \`0 0 12px \${colorAccent}\`, transform: 'translateY(-50%)', animation: 'pulse-node 2s infinite 1s' }} />
        </div>
      )}

      {activeHero === 'spline1' && phase === 2 && (
        <div style={{ position: 'relative', width: '160px', height: '180px' }}>
          {/* 3 Circular Glass Discs floating at staggered offset */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '10px', width: '140px', height: '60px',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%',
            background: 'rgba(255,255,255,0.01)', transform: 'rotateX(60deg)',
            animation: 'float-p3 4s ease-in-out infinite 0.5s'
          }} />
          <div style={{
            position: 'absolute', bottom: '60px', left: '10px', width: '140px', height: '60px',
            border: \`1px solid \${colorAccent}\`, borderRadius: '50%',
            background: 'rgba(198, 255, 52, 0.02)', transform: 'rotateX(60deg)',
            boxShadow: \`0 0 30px rgba(198,255,52,0.05)\`,
            animation: 'float-p1 4s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute', bottom: '100px', left: '10px', width: '140px', height: '60px',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)', transform: 'rotateX(60deg)',
            backdropFilter: 'blur(2px)',
            animation: 'float-p2 4s ease-in-out infinite 1s'
          }} />
        </div>
      )}

      {activeHero === 'spline1' && phase === 3 && (
        <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Radar Scanner Console */}
          <div style={{ position: 'relative', width: '140px', height: '140px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%', background: 'rgba(255,255,255,0.01)' }}>
            <div style={{ position: 'absolute', inset: '20px', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', inset: '40px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%' }} />
            {/* Center Node */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '10px', height: '10px', borderRadius: '50%', background: colorAccent, boxShadow: \`0 0 10px \${colorAccent}\`, transform: 'translate(-50%, -50%)' }} />
            
            {/* Sweeping Line */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', width: '70px', height: '2px',
              background: \`linear-gradient(to right, transparent, \${colorAccent})\`,
              transformOrigin: '0% 50%',
              animation: 'rotate-radar 4s linear infinite'
            }} />
          </div>
        </div>
      )}


      {/* ─── CINEMATIC VERSION (cinematic) ─── */}
      {activeHero === 'cinematic' && phase === 1 && (
        <div style={{ position: 'relative', width: '200px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Brutalist linear diamond grid */}
          <div style={{
            width: '120px', height: '120px', border: '1px solid #ffffff',
            transform: 'rotateX(60deg) rotateZ(45deg)', position: 'relative'
          }}>
            {/* Blinking corner nodes */}
            <div style={{ position: 'absolute', top: '-5px', left: '-5px', width: '10px', height: '10px', background: colorAccent, animation: 'brutalist-strobe 1s steps(1) infinite' }} />
            <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', width: '10px', height: '10px', background: colorAccent, animation: 'brutalist-strobe 1s steps(1) infinite 0.5s' }} />
            <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '10px', height: '10px', background: '#ffffff', animation: 'brutalist-strobe 1.5s steps(1) infinite' }} />
            <div style={{ position: 'absolute', bottom: '-5px', left: '-5px', width: '10px', height: '10px', background: '#ffffff', animation: 'brutalist-strobe 1.5s steps(1) infinite 0.75s' }} />
          </div>
        </div>
      )}

      {activeHero === 'cinematic' && phase === 2 && (
        <div style={{ position: 'relative', width: '180px', height: '160px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '20px' }}>
          {/* Brutalist Rising Cubes */}
          <div style={{ width: '25px', height: '100px', background: '#ffffff', transformOrigin: 'bottom', animation: 'brutalist-slider-1 2s ease-in-out infinite' }} />
          <div style={{ width: '25px', height: '100px', background: colorAccent, transformOrigin: 'bottom', animation: 'brutalist-slider-2 2s ease-in-out infinite' }} />
          <div style={{ width: '25px', height: '100px', background: '#3f3f46', transformOrigin: 'bottom', animation: 'brutalist-slider-3 2s ease-in-out infinite' }} />
        </div>
      )}

      {activeHero === 'cinematic' && phase === 3 && (
        <div style={{ position: 'relative', width: '200px', height: '160px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '15px' }}>
          {/* Strobe binary cell grid */}
          {\`{\`}Array.from({ length: 16 }).map((_, i) => (
            <div key={i} style={{
              border: '1px solid rgba(255,255,255,0.1)',
              background: i % 3 === 0 ? colorAccent : 'transparent',
              opacity: i % 2 === 0 ? 0.8 : 0.2,
              animation: i % 5 === 0 ? 'brutalist-strobe 0.8s steps(1) infinite' : i % 3 === 0 ? 'brutalist-strobe 1.2s steps(1) infinite 0.3s' : 'none'
            }} />
          )){\`}\`}
        </div>
      )}


      {/* ─── MODERN V2 VERSION (modern_v2) ─── */}
      {activeHero === 'modern_v2' && phase === 1 && (
        <div style={{ position: 'relative', width: '240px', height: '180px' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {/* Draw pathways */}
            <path id="p1_track" d="M 40,90 Q 120,40 200,90 Q 120,140 40,90 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            
            {/* Connecting lines */}
            <line x1="40" y1="90" x2="120" y2="90" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line x1="200" y1="90" x2="120" y2="90" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            
            {/* Nodes */}
            <circle cx="40" cy="90" r="6" fill="#c6ff34" />
            <circle cx="200" cy="90" r="6" fill="#c6ff34" />
            <circle cx="120" cy="90" r="8" fill="#ffffff" />
            
            {/* Traversing packet */}
            <circle r="4" fill="#ffffff">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 40,90 Q 120,40 200,90 Q 120,140 40,90 Z" />
            </circle>
          </svg>
        </div>
      )}

      {activeHero === 'modern_v2' && phase === 2 && (
        <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Sliding Glass Card Stacks */}
          <div style={{
            position: 'absolute', width: '120px', height: '100px',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px',
            background: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(5px)',
            transform: 'rotateX(55deg) rotateY(-15deg)',
            animation: 'float-p1 4s ease-in-out infinite'
          }} />
          
          {/* Inner rotating gear element */}
          <div style={{
            position: 'absolute', width: '60px', height: '60px',
            border: \`2px dashed \${colorAccent}\`, borderRadius: '50%',
            transform: 'rotateX(55deg) rotateY(-15deg)',
            animation: 'rotate-radar 8s linear infinite',
            boxShadow: \`0 0 15px rgba(198,255,52,0.1)\`
          }} />

          <div style={{
            position: 'absolute', width: '120px', height: '100px',
            border: \`1px solid \${colorAccent}\`, borderRadius: '16px',
            background: 'rgba(198,255,52,0.03)', backdropFilter: 'blur(5px)',
            transform: 'rotateX(55deg) rotateY(-15deg) translateZ(40px)',
            animation: 'float-p2 4s ease-in-out infinite'
          }} />
        </div>
      )}

      {activeHero === 'modern_v2' && phase === 3 && (
        <div style={{ position: 'relative', width: '220px', height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '15px' }}>
          {/* Animated 3D chart bars with horizontal scanner */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', justifyContent: 'center', height: '100px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px', position: 'relative' }}>
            
            <div style={{ width: '25px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', animation: 'modern-bar-1 3s ease-in-out infinite' }} />
            <div style={{ width: '25px', background: colorAccent, borderRadius: '4px', boxShadow: \`0 0 15px \${colorAccent}\`, animation: 'modern-bar-2 3s ease-in-out infinite' }} />
            <div style={{ width: '25px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', animation: 'modern-bar-3 3s ease-in-out infinite' }} />
            
            {/* Horizontal sweep laser */}
            <div style={{
              position: 'absolute', left: 0, right: 0, height: '2px',
              background: \`linear-gradient(90deg, transparent, \${colorAccent}, transparent)\`,
              boxShadow: \`0 0 10px \${colorAccent}\`,
              animation: 'modern-laser 3s ease-in-out infinite'
            }} />
          </div>
        </div>
      )}


      {/* ─── TECH V4 VERSION (tech_v4) ─── */}
      {activeHero === 'tech_v4' && phase === 1 && (
        <div style={{ position: 'relative', width: '240px', height: '180px' }}>
          {/* Marching Tech Dash Matrix */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <rect x="20" y="20" width="200" height="140" rx="6" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <path d="M 40,40 L 200,40 L 200,140 L 40,140 Z" fill="none" stroke={colorAccent} strokeWidth="1.5" strokeDasharray="10, 5" style={{ animation: 'tech-dash 2s linear infinite' }} />
            <path d="M 80,80 L 160,80 L 160,110 L 80,110 Z" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="5, 3" style={{ animation: 'tech-dash 3s linear infinite reverse' }} />
            
            <circle cx="40" cy="40" r="4" fill={colorAccent} />
            <circle cx="200" cy="40" r="4" fill={colorAccent} />
            <circle cx="200" cy="140" r="4" fill={colorAccent} />
            <circle cx="40" cy="140" r="4" fill={colorAccent} />
          </svg>
        </div>
      )}

      {activeHero === 'tech_v4' && phase === 2 && (
        <div style={{ position: 'relative', width: '220px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Mainframe rack console with blinking LEDs */}
          <div style={{ width: '140px', height: '120px', border: '1px solid rgba(255,255,255,0.1)', background: '#09090b', borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(255,255,255,0.3)' }}>SYS_UNIT_02</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: colorAccent, animation: 'tech-led 1s infinite' }}>ONLINE</span>
            </div>
            
            {/* Blinking LED Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
              {\`{\`}Array.from({ length: 18 }).map((_, i) => (
                <div key={i} style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: i % 4 === 0 ? colorAccent : '#27272a',
                  boxShadow: i % 4 === 0 ? \`0 0 6px \${colorAccent}\` : 'none',
                  animation: i % 3 === 0 ? 'tech-led 0.6s infinite' : i % 5 === 0 ? 'tech-led 1.2s infinite 0.4s' : 'none'
                }} />
              )){\`}\`}
            </div>
          </div>
        </div>
      )}

      {activeHero === 'tech_v4' && phase === 3 && (
        <div style={{ position: 'relative', width: '200px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {/* Concentric expanding telemetry waves */}
          <div style={{ position: 'absolute', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', animation: 'tech-wave 3s linear infinite' }} />
          <div style={{ position: 'absolute', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(198,255,52,0.01)', border: \`1px solid \${colorAccent}\`, animation: 'tech-wave 3s linear infinite 1s' }} />
          <div style={{ position: 'absolute', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', animation: 'tech-wave 3s linear infinite 2s' }} />
          
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: colorAccent, boxShadow: \`0 0 10px \${colorAccent}\`, zIndex: 2 }} />
        </div>
      )}


      {/* ─── SUI FORK VERSION (sui_fork) ─── */}
      {activeHero === 'sui_fork' && phase === 1 && (
        <div style={{ position: 'relative', width: '220px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Organic Morphing Liquid Blob */}
          <div style={{
            width: '100px', height: '100px', background: 'rgba(198,255,52,0.06)',
            border: \`1px solid \${colorAccent}\`, boxShadow: \`0 0 35px rgba(198,255,52,0.15)\`,
            animation: 'sui-blob-morph 4s ease-in-out infinite, float-p1 5s ease-in-out infinite',
            position: 'relative'
          }}>
            {/* Orbiting particles */}
            <div style={{ position: 'absolute', top: '20px', left: '10px', width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff' }} />
            <div style={{ position: 'absolute', bottom: '20px', right: '15px', width: '6px', height: '6px', borderRadius: '50%', background: colorAccent, boxShadow: \`0 0 6px \${colorAccent}\` }} />
          </div>
        </div>
      )}

      {activeHero === 'sui_fork' && phase === 2 && (
        <div style={{ position: 'relative', width: '200px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Assembling Bento Cards Illustration */}
          <div style={{ position: 'relative', width: '100px', height: '100px' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '45px', height: '45px',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
              background: 'rgba(255,255,255,0.01)',
              animation: 'sui-bento-assemble 3s ease-in-out infinite'
            }} />
            <div style={{
              position: 'absolute', top: 0, right: 0, width: '45px', height: '45px',
              border: \`1px solid \${colorAccent}\`, borderRadius: '12px',
              background: 'rgba(198, 255, 52, 0.02)',
              animation: 'sui-bento-assemble 3s ease-in-out infinite 0.5s'
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, width: '45px', height: '45px',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
              background: 'rgba(255,255,255,0.01)',
              animation: 'sui-bento-assemble 3s ease-in-out infinite 1.5s'
            }} />
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: '45px', height: '45px',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px',
              background: 'rgba(255,255,255,0.03)',
              animation: 'sui-bento-assemble 3s ease-in-out infinite 1s'
            }} />
          </div>
        </div>
      )}

      {activeHero === 'sui_fork' && phase === 3 && (
        <div style={{ position: 'relative', width: '220px', height: '180px' }}>
          {/* Bento loop trace with animated motion particle */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <path id="infinity_loop" d="M 40,90 C 40,50 110,50 110,90 C 110,130 180,130 180,90 C 180,50 110,50 110,90 C 110,130 40,130 40,90 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <path d="M 40,90 C 40,50 110,50 110,90 C 110,130 180,130 180,90" fill="none" stroke={colorAccent} strokeWidth="1.5" strokeDasharray="15, 60" style={{ animation: 'tech-dash 4s linear infinite' }} />
            
            <circle r="4" fill="#ffffff" filter="drop-shadow(0 0 6px #c6ff34)">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 40,90 C 40,50 110,50 110,90 C 110,130 180,130 180,90 C 180,50 110,50 110,90 C 110,130 40,130 40,90 Z" />
            </circle>
          </svg>
        </div>
      )}
    </div>
  );
}

function MethodologyDiagramStub({ phase, activeHero }) {
  return <MethodologyDiagram phase={phase} activeHero={activeHero} />;
}
`;

const replacedContent = content.slice(0, startIndex) + replacementCode + content.slice(endIndex);
fs.writeFileSync(filePath, replacedContent, 'utf8');
console.log("Successfully replaced diagrams block in App.jsx!");
