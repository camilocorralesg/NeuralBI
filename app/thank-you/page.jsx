import Link from 'next/link';

export const metadata = {
  title: 'Inquiry Received',
  description: 'Thank you for reaching out to NeuralBI. Our principal data architects will review your enterprise requirements and reach out within 24 business hours.',
};

export default function ThankYouPage() {
  return (
    <div style={{
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
      {/* Glow effect */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(198, 255, 52, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Header */}
      <header style={{
        maxWidth: '850px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/assets/Neuralbi%20logo.svg" alt="NeuralBI Logo" style={{ height: '24px' }} />
        </Link>
      </header>

      {/* Center Card */}
      <main style={{
        maxWidth: '680px',
        width: '100%',
        margin: '3rem auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Animated Checkmark Circle */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198, 255, 52, 0.2) 0%, rgba(198, 255, 52, 0.04) 70%)',
          border: '1px solid rgba(198, 255, 52, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          boxShadow: '0 0 40px rgba(198, 255, 52, 0.3)',
          color: '#c6ff34'
        }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: '#c6ff34',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: '0.75rem'
        }}>
          Transmission Verified
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.2rem, 5vw, 3.25rem)',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          marginBottom: '1.25rem'
        }}>
          Ball is in our court.
        </h1>

        <p style={{
          fontFamily: 'var(--font-sans)',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          lineHeight: 1.6,
          maxWidth: '520px',
          margin: '0 auto 2.5rem'
        }}>
          We received your technical inquiry. A principal data architect will examine your parameters and reach out within 24 business hours to coordinate next steps.
        </p>

        {/* 3 Step Timeline */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          textAlign: 'left',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '1.25rem'
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#c6ff34', fontSize: '0.75rem' }}>STEP 01</span>
            <h4 style={{ color: '#ffffff', margin: '0.4rem 0', fontSize: '0.95rem', fontWeight: 600 }}>Triage</h4>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', margin: 0, lineHeight: 1.4 }}>
              Our senior architects review your Microsoft stack notes and pain points.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '1.25rem'
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#c6ff34', fontSize: '0.75rem' }}>STEP 02</span>
            <h4 style={{ color: '#ffffff', margin: '0.4rem 0', fontSize: '0.95rem', fontWeight: 600 }}>Direct Contact</h4>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', margin: 0, lineHeight: 1.4 }}>
              We email you directly with tailored observations and call availability.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '1.25rem'
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#c6ff34', fontSize: '0.75rem' }}>STEP 03</span>
            <h4 style={{ color: '#ffffff', margin: '0.4rem 0', fontSize: '0.95rem', fontWeight: 600 }}>Action Plan</h4>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', margin: 0, lineHeight: 1.4 }}>
              We present an actionable architecture blueprint with clear milestones.
            </p>
          </div>
        </div>

        {/* Primary Action Button */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            href="/"
            className="btn-glow-border"
            style={{
              padding: '0.85rem 2rem',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textDecoration: 'none',
              color: '#ffffff',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Return to NeuralBI Home
          </Link>
        </div>

        <p style={{
          marginTop: '2rem',
          fontSize: '0.8rem',
          color: 'rgba(255, 255, 255, 0.4)',
          fontFamily: 'var(--font-mono)'
        }}>
          Need priority response? Email <a href="mailto:automation@aineuralnet.onmicrosoft.com" style={{ color: '#c6ff34', textDecoration: 'none' }}>automation@aineuralnet.onmicrosoft.com</a>
        </p>
      </main>

      {/* Footer */}
      <footer style={{
        maxWidth: '850px',
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
        © 2026 NeuralBI • Vancouver, Canada & Medellín, Colombia
      </footer>
    </div>
  );
}
