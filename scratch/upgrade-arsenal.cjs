const fs = require('fs');

const filePath = 'c:/Users/camil/My Repos/Figma Design/src/App.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// We need to import the new logos at the top
if (!content.includes("import powerAutomateLogo from './assets/Power Automate logo.svg';")) {
  content = content.replace(
    "import copilotStudioLogo from './assets/Copilot Studio.svg';",
    "import copilotStudioLogo from './assets/Copilot Studio.svg';\nimport powerAutomateLogo from './assets/Power Automate logo.svg';"
  );
}

// Find the Arsenal section to replace
const arsenalStartPattern = '// =========================================================\n// Bento Box: The Arsenal (Solutions)';
const arsenalStartIndex = content.indexOf(arsenalStartPattern);

if (arsenalStartIndex === -1) {
  console.error("Could not find Arsenal section");
  process.exit(1);
}

// Find where Arsenal ends. It's right before '// =========================================================\n// SECTION 6: INTEGRATIONS HUB'
const arsenalEndPattern = '// =========================================================\n// SECTION 6:';
let arsenalEndIndex = content.indexOf(arsenalEndPattern, arsenalStartIndex);
if (arsenalEndIndex === -1) {
    // try SECTION 7, or SECTION 9.2, etc. Let's look for the next major component.
    const nextSectionPattern = '// ─── SECTION';
    arsenalEndIndex = content.indexOf(nextSectionPattern, arsenalStartIndex);
}

if (arsenalEndIndex === -1) {
    // If we can't find it with comments, let's look for the function CaseStudy or IntegrationsHub.
    arsenalEndIndex = content.indexOf('function IntegrationsHub', arsenalStartIndex);
    if(arsenalEndIndex !== -1) {
        arsenalEndIndex = content.lastIndexOf('//', arsenalEndIndex);
    }
}

const newArsenalCode = `// =========================================================
// SECTION: THE ARSENAL (Scroll-Driven Premium Experience)
// =========================================================

const arsenalData = [
  {
    id: "power-bi",
    tool: "Power BI",
    title: "Cognitive Analytics.",
    body: "Transform dormant databases into real-time, interactive visual models. See the absolute truth behind your numbers instantly, with zero latency.",
    logo: powerBiLogo,
    color: "#F2C811",
    metric: "0ms Latency"
  },
  {
    id: "power-apps",
    tool: "Power Apps",
    title: "Custom Engineering.",
    body: "Tailor-made applications built flawlessly. From field operations to executive suites, we digitize your most complex workflows securely.",
    logo: powerAppsLogo,
    color: "#0078D4",
    metric: "Native Code"
  },
  {
    id: "power-automate",
    tool: "Power Automate",
    title: "Silent Orchestration.",
    body: "Connect APIs and sync databases. We engineer invisible neural pathways that automate the mundane and eliminate human error quietly in the background.",
    logo: powerAutomateLogo,
    color: "#0066FF",
    metric: "API Bridges"
  },
  {
    id: "copilot-studio",
    tool: "Copilot Studio",
    title: "Agentic Automation.",
    body: "Deploy autonomous cognitive agents that reason, act, and resolve hyper-complex workflows natively. The era of static bots is over; welcome to true systemic intelligence.",
    logo: copilotStudioLogo,
    color: "#107C41",
    metric: "AI Reasoning"
  }
];

function Arsenal({ activeHero }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Scrollable distance is container height minus viewport height
      const scrollableDistance = rect.height - windowHeight;
      const scrolled = -rect.top;
      
      let p = scrolled / scrollableDistance;
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate active index (0 to 3)
  const activeIndex = Math.min(3, Math.floor(progress * 4));
  // Local progress within the current active item (0 to 1)
  const localProgress = (progress * 4) % 1;

  // ─────────────────────────────────────────────────────────
  // THEMES RENDERER
  // ─────────────────────────────────────────────────────────

  const renderTheme = () => {
    switch (activeHero) {
      case 'spline1': // NEBULA - Glassmorphism, Organic Fog
        return (
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(198,255,52,0.03) 0%, transparent 70%)' }} />
            
            <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', padding: '0 2rem', gap: '4rem', zIndex: 10 }}>
              {/* Left: Titles List */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#c6ff34', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem' }}>
                  The Arsenal
                </h2>
                {arsenalData.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  const isPast = activeIndex > idx;
                  return (
                    <div key={item.id} style={{
                      opacity: isActive ? 1 : isPast ? 0.2 : 0.2,
                      transform: isActive ? 'translateX(10px)' : 'translateX(0px)',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      borderLeft: isActive ? '2px solid #c6ff34' : '2px solid transparent',
                      paddingLeft: isActive ? '1.5rem' : '0'
                    }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#fff' }}>
                        {item.tool}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: Glass Card */}
              <div style={{ flex: 1.2, position: 'relative', height: '400px' }}>
                {arsenalData.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <div key={item.id} style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(30px)',
                      borderRadius: '24px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      padding: '3.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                      pointerEvents: isActive ? 'auto' : 'none',
                      boxShadow: isActive ? '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' : 'none'
                    }}>
                      <div style={{ width: '64px', height: '64px', marginBottom: '2rem', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))' }}>
                        <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ffffff', marginBottom: '1rem', lineHeight: 1.1 }}>{item.title}</h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'cinematic': // CINEMATIC - Brutalist, High Contrast, Typography-led
        return (
          <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem' }}>
              
              {/* Massive Tracking Number */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#fff' }}>
                  System Architecture // 04
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '12rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.05em', lineHeight: 0.8, opacity: 0.05 }}>
                  0{activeIndex + 1}
                </div>
              </div>

              {/* Brutalist Content Reveal */}
              <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
                {arsenalData.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  const isPast = activeIndex > idx;
                  
                  // Cut-scene brutal transition
                  const yOffset = isActive ? '0%' : isPast ? '-100%' : '100%';
                  
                  return (
                    <div key={item.id} style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      transform: \`translateY(\${yOffset})\`,
                      transition: 'transform 0.7s cubic-bezier(0.77, 0, 0.175, 1)',
                      opacity: isActive ? 1 : 0.5
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                        <div style={{ width: '56px', height: '56px', filter: 'grayscale(100%) contrast(1.5)' }}>
                          <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '4.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', textTransform: 'uppercase', m: 0, lineHeight: 1 }}>
                          {item.tool}
                        </h2>
                      </div>
                      <div style={{ width: '100%', height: '1px', background: '#333', marginBottom: '2rem' }} />
                      <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '2rem', color: '#a1a1aa', fontWeight: 400, marginBottom: '1.5rem' }}>{item.title}</h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', color: '#71717a', lineHeight: 1.5, maxWidth: '80%' }}>{item.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'modern_v2': // MODERN - Stacking Cards, Apple/Stripe feel
        return (
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem', zIndex: 10 }}>
              <h2 className="text-gradient-premium" style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 800 }}>The Arsenal</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)' }}>Layered intelligence. Unprecedented scale.</p>
            </div>
            
            <div style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '450px', perspective: '1000px' }}>
              {arsenalData.map((item, idx) => {
                const diff = idx - activeIndex;
                const isPast = diff < 0;
                
                // Stack math
                const scale = isPast ? 1 : 1 - (diff * 0.05);
                const translateY = isPast ? -800 : diff * 40;
                const zIndex = 10 - idx;
                const opacity = isPast ? 0 : 1 - (diff * 0.15);

                return (
                  <div key={item.id} style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: '#0a0a0c',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '32px',
                    padding: '4rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    transform: \`translateY(\${translateY}px) scale(\${scale})\`,
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex,
                    opacity,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                      <div style={{ width: '72px', height: '72px' }}>
                        <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#fff' }}>
                        {item.metric}
                      </div>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>{item.title}</h3>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'tech_v4': // TECH V4 - Terminal, Console Scan
        return (
          <div style={{ position: 'relative', width: '100%', height: '100%', background: '#020202', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', gap: '2rem' }}>
              
              {/* Left Data Feed */}
              <div style={{ width: '300px', borderRight: '1px solid rgba(198,255,52,0.2)', paddingRight: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#c6ff34', marginBottom: '2rem' }}>
                  > INITIALIZING ARSENAL_MODULES<br/>
                  > [STATUS] ONLINE
                </div>
                {arsenalData.map((item, idx) => (
                  <div key={item.id} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    color: activeIndex === idx ? '#c6ff34' : 'rgba(255,255,255,0.2)',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'color 0.3s'
                  }}>
                    <span>[{idx === activeIndex ? '*' : ' '}]</span>
                    {item.tool.replace(' ', '_')}
                  </div>
                ))}
              </div>

              {/* Right Technical Display */}
              <div style={{ flex: 1, paddingLeft: '2rem', position: 'relative', height: '400px' }}>
                {arsenalData.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <div key={item.id} style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? 'auto' : 'none',
                      transition: 'opacity 0.1s', // Hard snap for tech feel
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                        <div style={{ width: '80px', height: '80px', filter: 'sepia(1) hue-rotate(50deg) saturate(5)' }}>
                          <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '3rem', color: '#fff', textTransform: 'uppercase' }}>{item.title}</h2>
                      </div>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '800px' }}>
                        > {item.body}
                      </p>
                    </div>
                  );
                })}
                {/* Scanline overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>
        );

      case 'sui_fork': // SUI FORK - Ultra-minimalist Swiss Type
      default:
        return (
          <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', display: 'flex', alignItems: 'center', color: '#000' }}>
            <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              {/* Massive Left Typography */}
              <div style={{ flex: 1, position: 'relative', height: '500px', overflow: 'hidden' }}>
                {arsenalData.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  const isPast = activeIndex > idx;
                  const yOffset = isActive ? '0%' : isPast ? '-100%' : '100%';
                  
                  return (
                    <div key={item.id} style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      transform: \`translateY(\${yOffset})\`,
                      transition: 'transform 0.8s cubic-bezier(0.85, 0, 0.15, 1)',
                      opacity: isActive ? 1 : 0
                    }}>
                      <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '6rem', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '2rem' }}>
                        {item.tool}
                      </h2>
                      <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.5rem', fontWeight: 600, color: '#000', marginBottom: '1rem' }}>{item.title}</h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', color: '#666', lineHeight: 1.5, maxWidth: '80%' }}>{item.body}</p>
                    </div>
                  );
                })}
              </div>

              {/* Right Floating Logo */}
              <div style={{ width: '400px', height: '400px', position: 'relative', background: '#f5f5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {arsenalData.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <div key={item.id} style={{
                      position: 'absolute',
                      width: '120px',
                      height: '120px',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scale(1)' : 'scale(0.8)',
                      transition: 'all 0.8s cubic-bezier(0.85, 0, 0.15, 1)',
                    }}>
                      <img src={item.logo} alt={item.tool} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section style={{ position: 'relative' }}>
      {/* 
        Scroll-trigger track. 
        Height is 400vh to allow for 4 distinct sections of scroll length.
      */}
      <div style={{ height: '400vh', position: 'relative' }} ref={containerRef}>
        
        {/* Sticky viewport frame */}
        <div style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 20
        }}>
          {renderTheme()}
        </div>

      </div>
    </section>
  );
}

`;

content = content.slice(0, arsenalStartIndex) + newArsenalCode + content.slice(arsenalEndIndex);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Arsenal upgrade completed successfully!");
