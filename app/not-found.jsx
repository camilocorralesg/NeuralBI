import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
      minHeight: '100vh',
      backgroundColor: '#030303',
      color: '#ffffff',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(198, 255, 52, 0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Header */}
      <header style={{
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/NeuralBI/assets/Neuralbi%20logo.svg" alt="NeuralBI Logo" style={{ height: '24px' }} />
        </Link>
      </header>

      {/* Center Content */}
      <main style={{
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: '#c6ff34',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: '1rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          background: 'rgba(198, 255, 52, 0.08)',
          border: '1px solid rgba(198, 255, 52, 0.2)'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c6ff34' }} />
          404 // ROUTE_NOT_FOUND
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '1rem'
        }}>
          Signal Lost In The Void.
        </h1>

        <p style={{
          fontFamily: 'var(--font-sans)',
          color: 'rgba(255, 255, 255, 0.65)',
          fontSize: '1.05rem',
          lineHeight: 1.6,
          marginBottom: '2.5rem'
        }}>
          The neural pathway or asset you requested has migrated or never existed. Let&apos;s reroute you to an operational node.
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <Link
            href="/"
            className="btn-glow-border"
            style={{
              padding: '0.85rem 1.75rem',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textDecoration: 'none',
              color: '#ffffff',
              borderRadius: '9999px'
            }}
          >
            ← Return to Home
          </Link>

          <Link
            href="/#arsenal"
            style={{
              padding: '0.85rem 1.75rem',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
              color: 'rgba(255, 255, 255, 0.8)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
              transition: 'border-color 0.2s, color 0.2s'
            }}
          >
            Explore Tech Arsenal →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        fontSize: '0.75rem',
        color: 'rgba(255, 255, 255, 0.3)',
        fontFamily: 'var(--font-mono)',
        position: 'relative',
        zIndex: 10
      }}>
        © 2026 NeuralBI • High-Performance Data Architecture
      </footer>
    </div>
  );
}
