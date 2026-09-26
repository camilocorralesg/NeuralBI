import Link from 'next/link';
import ShaderButton from '../../components/ShaderButton';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of service governing architecture engineering, consulting, and digital services delivered by NeuralBI.',
};

export default function TermsOfServicePage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#030303',
      color: '#ffffff',
      fontFamily: 'var(--font-body)',
      padding: '2rem 1.5rem 6rem',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Ambient background glow */}
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

      {/* Header */}
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
          <img src="/NeuralBI/assets/Neuralbi%20logo.svg" alt="NeuralBI Logo" style={{ height: '22px' }} />
        </Link>

        <ShaderButton
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.15rem',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            textDecoration: 'none',
            color: '#ffffff',
            borderRadius: '9999px'
          }}
        >
          ← Return to Home
        </ShaderButton>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ marginBottom: '3rem' }}>
          <div className="enter" style={{
            '--enter': 0,
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#c6ff34',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '0.75rem'
          }}>
            Legal Agreement
          </div>
          <h1 className="enter-mask" style={{
            '--enter': 1,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1rem'
          }}>
            Terms of Service
          </h1>
          <p className="enter" style={{
            '--enter': 2,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.45)'
          }}>
            Effective Date: September 14, 2026 • Version 1.2
          </p>
        </div>

        <article className="enter" style={{
          '--enter': 3,
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          lineHeight: 1.7,
          fontSize: '1rem',
          color: 'rgba(255, 255, 255, 0.8)'
        }}>
          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the NeuralBI website, submitting technical audit requests, or entering into a Statement of Work (SOW) with NeuralBI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), you (&quot;Client&quot; or &quot;User&quot;) agree to be bound by these Terms of Service. If you do not agree to these terms, you should not access our digital properties or engage our advisory services.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
              2. Scope of Architecture & Advisory Services
            </h2>
            <p>
              NeuralBI delivers high-performance enterprise Business Intelligence, low/pro-code application engineering, and autonomous AI system design, specifically centering around Microsoft Fabric, Power BI, Power Apps, Power Automate, and Copilot Studio.
            </p>
            <p>
              Deliverables, milestones, service levels, and compensation structures are established in mutually executed Statements of Work. Statements of Work incorporate these Terms by reference.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
              3. Intellectual Property Rights
            </h2>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <strong>Client Work Product:</strong> Upon full settlement of invoices, the Client owns all proprietary customizations, semantic models, Dataverse schemas, and custom PCF controls engineered specifically for the Client under an active engagement.
              </li>
              <li>
                <strong>NeuralBI Background IP:</strong> NeuralBI retains exclusive ownership of all general methodologies, pre-existing algorithmic templates, design libraries, and architectural frameworks developed prior to or independently of the engagement.
              </li>
              <li>
                <strong>Client Confidential Data:</strong> All operational data, customer telemetry, databases, and internal communications of the Client remain the sole and exclusive property of the Client.
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
              4. Client Environment Access & Security
            </h2>
            <p>
              Clients are responsible for provisioning necessary least-privilege credentials within their Microsoft 365, Azure, or Power Platform tenants. Clients maintain full administrative authority to audit, monitor, and revoke access at any time. Clients are responsible for maintaining valid licensing for third-party platforms (e.g., Microsoft Power BI Pro/Premium, Fabric Capacity, Azure OpenAI).
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
              5. Confidentiality & Non-Disclosure
            </h2>
            <p>
              Both parties agree to treat all business, technical, financial, and architectural information as strictly confidential. Neither party will disclose confidential information to any third party without prior written consent, except where required by law.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
              6. Warranties & Limitation of Liability
            </h2>
            <p>
              NeuralBI warrants that all architectural services will be rendered with professional diligence adhering to recognized industry best practices. Except as expressly provided, our digital properties and informational content are provided &quot;as is&quot;. To the maximum extent permitted by law, neither party shall be liable for indirect, incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
              7. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the applicable laws of the jurisdiction specified in the applicable Statement of Work, primarily operating across <strong>Vancouver, British Columbia, Canada</strong> and <strong>Medellín, Antioquia, Colombia</strong>.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
              8. Contact & Legal Notices
            </h2>
            <p>
              Legal inquiries and contractual communications may be directed to:
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
          <Link href="/privacy" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← View Privacy Policy
          </Link>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.35)' }}>
            © 2026 NeuralBI. All rights reserved.
          </span>
        </div>
      </main>
    </div>
  );
}
