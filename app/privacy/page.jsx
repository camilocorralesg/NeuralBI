import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Enterprise privacy and data governance standards at NeuralBI. Learn how we safeguard your enterprise telemetry, Power Platform environments, and data architectures.',
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#030303',
      color: '#ffffff',
      fontFamily: 'var(--font-sans)',
      padding: '2rem 1.5rem 6rem',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Background ambient glow */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        maxWidth: '1200px',
        height: '400px',
        background: 'radial-gradient(ellipse at top, rgba(198, 255, 52, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Navigation Bar */}
      <header style={{
        maxWidth: '900px',
        margin: '0 auto 3.5rem',
        padding: '1.25rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        zIndex: 10
      }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none',
          color: '#ffffff'
        }}>
          <img src="/assets/Neuralbi%20logo.svg" alt="NeuralBI Logo" style={{ height: '22px' }} />
        </Link>

        <Link
          href="/"
          className="btn-glow-border"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.15rem',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-mono)',
            textDecoration: 'none',
            color: '#ffffff',
            borderRadius: '9999px'
          }}
        >
          ← Return to Home
        </Link>
      </header>

      {/* Main Content Container */}
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#c6ff34',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '0.75rem'
          }}>
            Legal & Compliance
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1rem'
          }}>
            Privacy Policy
          </h1>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.45)'
          }}>
            Effective Date: September 14, 2026 • Version 1.2
          </p>
        </div>

        <article style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          lineHeight: 1.7,
          fontSize: '1rem',
          color: 'rgba(255, 255, 255, 0.8)'
        }}>
          {/* Executive Summary Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(198, 255, 52, 0.25)',
            borderRadius: '12px',
            padding: '1.75rem',
            boxShadow: '0 0 30px rgba(198, 255, 52, 0.05)'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#ffffff',
              marginTop: 0,
              marginBottom: '0.75rem'
            }}>
              Zero-Trust Enterprise Data Commitment
            </h2>
            <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>
              NeuralBI operates under strict enterprise isolation. When architecting Business Intelligence, Power Platform, or AI systems, <strong>your proprietary operational data remains 100% within your corporate tenant boundaries</strong>. We never ingest, sell, monetize, or train shared public AI foundation models on your confidential corporate data.
            </p>
          </div>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
              1. Overview & Scope
            </h2>
            <p>
              This Privacy Policy describes how NeuralBI (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operating across <strong>Vancouver, Canada</strong> and <strong>Medellín, Colombia</strong>, collects, processes, and protects personal and technical information when you visit our website (neuralbi.com) or engage our consulting and architecture engineering services.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
              2. Information We Collect
            </h2>
            <p>We collect information in two limited contexts:</p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <strong>Direct Communications & Technical Audit Inquiries:</strong> When you submit our audit form or reach out, we collect your name, business email address, company details, and project notes.
              </li>
              <li>
                <strong>Privacy-Preserving Telemetry:</strong> We collect aggregate, privacy-respecting metrics (page visits, browser engine, approximate country) via Vercel Analytics. We do not use cross-site tracking cookies, device fingerprinting, or advertising data brokers.
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
              3. Client Tenant Boundary & Data Governance
            </h2>
            <p>
              In our consulting engagements involving Microsoft Fabric, Power BI, Power Apps, Power Automate, and Copilot Studio:
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>All deployments are executed directly within the client&apos;s Microsoft 365, Azure, or Dataverse tenant under client-provisioned Role-Based Access Control (RBAC).</li>
              <li>NeuralBI consultants utilize dedicated client identity accounts or privileged access workstations as mandated by client IT compliance standards.</li>
              <li>No production data, semantic models, customer records, or API credentials are ever transferred to or stored on NeuralBI personal devices or unmanaged external infrastructure.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
              4. Analytics & Cookie Policy
            </h2>
            <p>
              Our website uses Vercel Web Analytics to measure site performance and user experience. Vercel Web Analytics does not store persistent tracking cookies in your browser, does not track you across other third-party websites, and completely strips personal identifiers from all telemetry packets.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
              5. International Compliance (PIPEDA, GDPR & Ley 1581)
            </h2>
            <p>
              We adhere to global data protection benchmarks:
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Canada:</strong> Compliance with the Personal Information Protection and Electronic Documents Act (PIPEDA).</li>
              <li><strong>Colombia:</strong> Compliance with Ley Estatutaria 1581 de 2012 and Decreto 1377 de 2013 on personal data protection.</li>
              <li><strong>European Economic Area (EEA) / UK:</strong> Compliance with GDPR standards regarding transparency, purpose limitation, and data minimization.</li>
            </ul>
            <p>
              You have the right to request access to, correction of, or permanent deletion of any personal contact information we hold about you.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
              6. Contact & Data Protection Inquiries
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy, enterprise data handling, or wish to exercise your data rights, please contact our Data Governance team:
            </p>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem'
            }}>
              <div><strong>Email:</strong> <a href="mailto:automation@aineuralnet.onmicrosoft.com" style={{ color: '#c6ff34', textDecoration: 'none' }}>automation@aineuralnet.onmicrosoft.com</a></div>
              <div style={{ marginTop: '0.5rem' }}><strong>Operational Hubs:</strong> Vancouver, BC, Canada • Medellín, Colombia</div>
              <div style={{ marginTop: '0.5rem' }}><strong>Entity:</strong> NeuralBI Architecture & Engineering</div>
            </div>
          </section>
        </article>

        {/* Footer Navigation */}
        <div style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <Link href="/terms" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '0.9rem' }}>
            View Terms of Service →
          </Link>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.35)' }}>
            © 2026 NeuralBI. All rights reserved.
          </span>
        </div>
      </main>
    </div>
  );
}
