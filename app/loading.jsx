import { SYMBOL } from '../components/intro/logoGeometry';

export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem',
      }}
      aria-label="Loading NeuralBI"
    >
      {/* Ambient center pulse */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(198, 255, 52, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Vector NeuralBI Emblem */}
      <div
        style={{
          width: '64px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.75rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <svg
          viewBox="0 0 170 170"
          width="48"
          height="48"
          fill="none"
          style={{ overflow: 'visible' }}
        >
          {SYMBOL.map(({ d, fill }, i) => (
            <path key={i} d={d} fill={fill} />
          ))}
        </svg>
      </div>

      {/* Loading Terminal Indicator */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.75rem',
            color: '#c6ff34',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#c6ff34',
              boxShadow: '0 0 8px #c6ff34',
            }}
          />
          INITIALIZING NEURAL PIPELINE...
        </div>

        {/* Indeterminate loading progress line */}
        <div
          style={{
            width: '180px',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '60px',
              background: 'linear-gradient(90deg, transparent, #c6ff34, transparent)',
              animation: 'neuralbi-loading-bar 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes neuralbi-loading-bar {
          0% { transform: translateX(-60px); }
          100% { transform: translateX(180px); }
        }
      `}</style>
    </div>
  );
}
