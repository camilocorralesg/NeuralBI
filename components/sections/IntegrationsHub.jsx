'use client';
import React, { memo, useRef } from 'react';
import CharacterReveal from '../CharacterReveal';
import AuroraField from '../AuroraField';
import { UnifiedDeliveryScene } from '../graphics/UnifiedDeliveryScene';
import { useLanguage } from '../../context/LanguageContext';
import styles from './IntegrationsHub.module.css';
import Reveal from '../Reveal';
import { wordsIn } from '../revealTiming';

function IntegrationsHub() {
  const { language } = useLanguage();
  const stageRef = useRef(null);
  const isEs = language === 'es';

  // SVG Icons for the integration nodes
  const icons = {
    SAP: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    Salesforce: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.47 0-.89.09-1.3.27A5 5 0 0 0 5 14c0 .12.01.24.02.36A4 4 0 0 0 8 22h8a4 4 0 0 0 1.5-3Z" />
      </svg>
    ),
    SQL: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    ),
    Oracle: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v12" />
        <path d="M6 12h12" />
      </svg>
    ),
    HubSpot: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.5" y1="10.5" x2="15.5" y2="6.5" />
        <line x1="8.5" y1="13.5" x2="15.5" y2="17.5" />
      </svg>
    ),
    SharePoint: (
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
      iconKey: "SAP"
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
      iconKey: "SQL"
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
      iconKey: "Oracle"
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
      id: "SharePoint",
      name: "SharePoint Portal",
      left: '82%',
      top: '60%',
      align: 'right',
      desc: isEs
        ? "Índice unificado de documentos y sincronización de metadatos de archivos."
        : "Unified document index mapping and file metadata syncing.",
      status: "SYNC_OK",
      latency: "9ms",
      type: "Graph Native",
      iconKey: "SharePoint"
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
      iconKey: "SAP"
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
      iconKey: "SQL"
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
      iconKey: "SharePoint"
    }
  ];

  const inputsHeader = isEs ? '[ Fuentes de Datos ]' : '[ Data Inputs ]';
  const deliverablesHeader = isEs ? '[ Entregables de Negocio ]' : '[ Business Deliverables ]';

  const title = isEs
    ? ['Conectividad sin fisuras.', '*Entrega unificada.*']
    : ['Seamless Connectivity.', '*Unified Delivery.*'];
  const subtitle = isEs
    ? "De bases de datos a arquitecturas modernas en la nube. Conectamos datos propietarios directamente a capas semánticas de alto rendimiento, reportes, aplicaciones y flujos de IA con cero fricción."
    : "From databases to modern cloud architectures. We pipe proprietary enterprise data directly into high-throughput semantic layers, beautiful reports, custom React applications, and cognitive AI workflows with zero processing friction.";
  const mobileSubtitle = isEs
    ? "Conectamos datos empresariales directamente a capas semánticas de alto rendimiento, aplicaciones personalizadas y flujos cognitivos de IA sin fricción."
    : "We pipe proprietary enterprise data directly into high-throughput semantic layers, custom React applications, and cognitive AI workflows with zero friction.";

  return (
    <section className={styles.section}>
      <AuroraField clearRef={stageRef} />

      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            <CharacterReveal text={title[0]} style={{ display: 'block' }} />
            <CharacterReveal text={title[1]} delay={wordsIn(title[0])} style={{ display: 'block' }} />
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
