export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#030303',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem'
    }}>
      {/* Ambient center pulse */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(198, 255, 52, 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        animation: 'pulse-glow 2.5s ease-in-out infinite alternate'
      }} />

      {/* Pulsing NeuralBI Logo Tile */}
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: '18px',
        background: '#040603',
        border: '1px solid rgba(198, 255, 52, 0.4)',
        boxShadow: '0 0 30px rgba(198, 255, 52, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem',
        animation: 'loading-float 2s ease-in-out infinite alternate',
        position: 'relative',
        zIndex: 1
      }}>
        <img
          src="/favicon.svg"
          alt="NeuralBI Loading"
          style={{ width: '46px', height: '46px' }}
        />
      </div>

      {/* Loading Terminal Indicator */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.75rem',
          color: '#c6ff34',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#c6ff34',
            boxShadow: '0 0 8px #c6ff34',
            animation: 'brutalist-strobe 1s steps(1) infinite'
          }} />
          INITIALIZING NEURAL PIPELINE...
        </div>

        {/* Indeterminate loading progress line */}
        <div style={{
          width: '180px',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '60px',
            background: 'linear-gradient(90deg, transparent, #c6ff34, transparent)',
            animation: 'loading-bar 1.5s ease-in-out infinite'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes loading-float {
          0% { transform: translateY(0px) scale(0.98); }
          100% { transform: translateY(-6px) scale(1.02); }
        }
        @keyframes loading-bar {
          0% { transform: translateX(-60px); }
          100% { transform: translateX(180px); }
        }
      `}</style>
    </div>
  );
}
