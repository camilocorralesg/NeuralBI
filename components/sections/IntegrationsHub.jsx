'use client';
import React, { memo, useRef } from 'react';
import CharacterReveal from '../CharacterReveal';
import AuroraField from '../AuroraField';
import { UnifiedDeliveryScene } from '../graphics/UnifiedDeliveryScene';
import { useLanguage } from '../../context/LanguageContext';
import styles from './IntegrationsHub.module.css';
import Reveal from '../Reveal';

function IntegrationsHub() {
  const { language } = useLanguage();
  const stageRef = useRef(null);
  const isEs = language === 'es';

  // Real brand marks for the named sources, in public/assets/integrations: CC0 drawings from gilbarbara/logos and
  // Simple Icons, and the Microsoft Fabric mark supplied by the client. Product names and logos are trademarks of their
  // owners, used to name the systems NeuralBI connects. The grouped nodes of the phone layout keep plain glyphs: each
  // stands for several systems at once.
  const logo = (file, width, height) => (
    <img src={`/NeuralBI/assets/integrations/${file}`} alt="" width={width} height={height} className={styles.logo} loading="lazy" decoding="async" />
  );
  const wordmark = (file, alt, width, height, rest) => ({ src: `/NeuralBI/assets/integrations/${file}`, alt, width, height, rest });

  // SVG Icons for the integration nodes
  const icons = {
    Salesforce: logo('salesforce.svg', 27, 19),
    Azure: logo('azure.svg', 20, 19),
    HubSpot: logo('hubspot.svg', 19, 19),
    Fabric: logo('fabric.svg', 19, 19),
    Systems: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    Databases: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    ),
    Documents: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
    PowerBI: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    PowerApps: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    Copilot: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 7.54 16.59l-1.42-1.42A8 8 0 1 0 5.88 17.5l-1.42 1.42A10 10 0 0 1 12 2z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 7v2" />
        <path d="M12 15v2" />
        <path d="M7 12h2" />
        <path d="M15 12h2" />
      </svg>
    )
  };

  const nodes = [
    // --- INPUTS (Left Side) ---
    {
      id: "SAP",
      name: "SAP ERP",
      left: '18%',
      top: '20%',
      align: 'left',
      desc: isEs
        ? "Sincronización automatizada de inventario, compras y libros contables."
        : "Automated sync of inventory, procurement, and financial ledgers.",
      status: "STABLE",
      latency: "12ms",
      type: isEs ? "ERP Nativo" : "ERP Native",
      wordmark: wordmark('sap.svg', 'SAP', 32, 16, 'ERP')
    },
    {
      id: "Salesforce",
      name: "Salesforce CRM",
      left: '12%',
      top: '40%',
      align: 'left',
      desc: isEs
        ? "Sincronización bidireccional de embudos de ventas, cuentas y contactos."
        : "Bi-directional sync of sales pipelines, accounts, and contact records.",
      status: "CONNECTED",
      latency: "8ms",
      type: "REST Pipeline",
      iconKey: "Salesforce"
    },
    {
      id: "SQL",
      name: "Azure SQL Database",
      left: '18%',
      top: '60%',
      align: 'left',
      desc: isEs
        ? "Motor de consulta de alta velocidad para bases de datos relacionales."
        : "High-speed query engine orchestrating structured enterprise databases.",
      status: "SYNC_OK",
      latency: "4ms",
      type: "ODBC Pipeline",
      iconKey: "Azure"
    },
    // --- INPUTS (Right Side) ---
    {
      id: "Oracle",
      name: "Oracle Database",
      left: '82%',
      top: '20%',
      align: 'right',
      desc: isEs
        ? "Mapeo de libros contables e ingesta de tablas relacionales empresariales."
        : "Enterprise ledger mapping and relational table ingestion.",
      status: "STABLE",
      latency: "14ms",
      type: isEs ? "OCI Nativo" : "OCI Native",
      wordmark: wordmark('oracle.svg', 'Oracle', 61, 8, 'Database')
    },
    {
      id: "HubSpot",
      name: "HubSpot CRM",
      left: '88%',
      top: '40%',
      align: 'right',
      desc: isEs
        ? "Sincronización automatizada de campañas de marketing y atribución de prospectos."
        : "Automated sync of marketing campaigns and lead attribution.",
      status: "CONNECTED",
      latency: "7ms",
      type: "Web API",
      iconKey: "HubSpot"
    },
    {
      id: "Fabric",
      name: "Microsoft Fabric",
      left: '82%',
      top: '60%',
      align: 'right',
      desc: isEs
        ? "Lakehouses y almacenes en OneLake, leídos en sitio con accesos directos y Direct Lake, sin copias."
        : "OneLake lakehouses and warehouses, read in place through shortcuts and Direct Lake, with no copies.",
      status: "SYNC_OK",
      latency: "6ms",
      type: "OneLake Native",
      iconKey: "Fabric"
    },
    // --- OUTPUTS (Bottom Side) ---
    {
      id: "PowerBI",
      name: isEs ? "Reportes de Power BI" : "Power BI Reports",
      left: '26%',
      top: '80%',
      align: 'bottom-left',
      desc: isEs
        ? "Tableros de analítica ejecutiva con información predictiva en tiempo real."
        : "Executive analytics dashboards with real-time predictive insights.",
      status: "RENDERED",
      latency: "Live",
      type: isEs ? "Visualización" : "Visualization",
      iconKey: "PowerBI"
    },
    {
      id: "PowerApps",
      name: "Power Apps",
      left: '50%',
      top: '84%',
      align: 'bottom-center',
      desc: isEs
        ? "Interfaces empresariales web y móviles para automatizar operaciones."
        : "Mobile and web business interfaces automating operations.",
      status: "ACTIVE",
      latency: "<10ms",
      type: "Low-Code UI",
      iconKey: "PowerApps"
    },
    {
      id: "Copilot",
      name: isEs ? "Agentes AI Copilot" : "AI Copilot Agents",
      left: '74%',
      top: '80%',
      align: 'bottom-right',
      desc: isEs
        ? "Agentes de razonamiento con IA personalizada para automatizar flujos complejos."
        : "Custom AI reasoning agents automating complex user chats.",
      status: "ONLINE",
      latency: "Cognitive",
      type: "Copilot Studio",
      iconKey: "Copilot"
    }
  ];

  const mobileInputNodes = [
    {
      id: "crm-erp",
      name: isEs ? "Sistemas CRM y ERP" : "CRM & ERP Systems",
      desc: isEs
        ? "Sincronización bidireccional automatizada para pipelines de SAP, Salesforce y HubSpot."
        : "Bi-directional automated sync for SAP, Salesforce, and HubSpot enterprise pipelines.",
      status: "STABLE",
      latency: "<10ms",
      type: isEs ? "Pipelines Empresariales" : "Enterprise Pipelines",
      iconKey: "Systems"
    },
    {
      id: "databases",
      name: isEs ? "Bases de Datos y Almacenes" : "Databases & Warehouses",
      desc: isEs
        ? "Motor de consultas de alta velocidad para Azure SQL, Oracle y almacenes de datos relacionales."
        : "High-speed query engine orchestrating Azure SQL, Oracle, and relational data stores.",
      status: "SYNC_OK",
      latency: "4ms",
      type: "ODBC / OCI Native",
      iconKey: "Databases"
    },
    {
      id: "ms-office",
      name: isEs ? "Ecosistema Microsoft" : "Microsoft Ecosystem",
      desc: isEs
        ? "Indexación unificada de documentos y sincronización de metadatos mediante Microsoft Graph API."
        : "Unified document index mapping and file metadata syncing via Microsoft Graph API.",
      status: "CONNECTED",
      latency: "8ms",
      type: "Graph Native",
      iconKey: "Documents"
    }
  ];

  const inputsHeader = isEs ? 'Fuentes de datos' : 'Data inputs';
  const deliverablesHeader = isEs ? 'Entregables de negocio' : 'Business deliverables';

  const title = isEs ? 'Integraciones con sus sistemas' : 'Integrations with your systems';
  const subtitle = isEs
    ? "Conectamos SAP, Salesforce, Oracle, Azure SQL, HubSpot y Microsoft Fabric con reportes, aplicaciones de negocio y agentes de IA, dentro de su tenant."
    : "We connect SAP, Salesforce, Oracle, Azure SQL, HubSpot and Microsoft Fabric to reports, business apps and AI agents, inside your tenant.";
  const mobileSubtitle = isEs
    ? "Su ERP, CRM y bases de datos, conectados a reportes, aplicaciones y agentes de IA dentro de su tenant."
    : "Your ERP, CRM and databases, connected to reports, apps and AI agents inside your tenant.";

  return (
    <section className={styles.section}>
      <AuroraField clearRef={stageRef} />

      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            <CharacterReveal text={title} />
          </h2>
          <Reveal as="p" className={styles.lede} delay={300}>{subtitle}</Reveal>
          <Reveal as="p" className={`${styles.lede} ${styles.ledeCompact}`} delay={300}>{mobileSubtitle}</Reveal>
        </header>

        <Reveal ref={stageRef} variant="visual" delay={120} amount={0.12} className={styles.stage}>
          {['tl', 'tr', 'bl', 'br'].map((corner) => <span key={corner} className={styles.mark} data-corner={corner} aria-hidden="true" />)}
          <UnifiedDeliveryScene
            nodes={nodes}
            mobileInputNodes={mobileInputNodes}
            icons={icons}
            language={language}
            inputsHeader={inputsHeader}
            deliverablesHeader={deliverablesHeader}
          />
        </Reveal>
      </div>
    </section>
  );
}

export default memo(IntegrationsHub);
