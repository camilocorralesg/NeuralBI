'use client';

import React, { memo, useEffect, useId, useRef } from 'react';
import s from './PowerAppsAnimations.module.css';
import { useLanguage } from '../../context/LanguageContext';

function Frame({ title, description, children }) {
  const ref = useRef(null);
  const id = useId();
  useEffect(() => {
    const element = ref.current;
    const visibility = () => { element.dataset.visible = String(!document.hidden); };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(
      ([entry]) => { element.dataset.running = String(entry.isIntersecting); },
      { threshold: 0.15 },
    );
    visibility();
    if (observer) observer.observe(element);
    else element.dataset.running = 'true';
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);
  return <figure ref={ref} className={s.frame} data-running="false" aria-labelledby={`${id}-title`} aria-describedby={`${id}-desc`}>
    <figcaption id={`${id}-title`} className={s.title}>{title}</figcaption>
    <svg className={s.canvas} viewBox="0 0 360 220" fill="none" aria-hidden="true">{children}</svg>
    <span id={`${id}-desc`} className={s.srOnly}>{description}</span>
  </figure>;
}

function Footer({ children }) {
  return <g><path d="M18 191H342" className={s.rule} /><circle cx="23" cy="204" r="2.5" className={s.status} /><text x="33" y="207" className={s.micro}>{children}</text><text x="341" y="207" textAnchor="end" className={s.micro}>POWER APPS</text></g>;
}

function Flow({ d, delay = '0s', outgoing = false }) {
  return <g style={{ '--delay': delay }}><path d={d} className={s.connection} /><path d={d} pathLength="100" className={outgoing ? s.outgoing : s.packet} /></g>;
}

function Check({ x, y, className = s.check }) {
  return <path d={`M${x} ${y}l3 3 6-6`} className={className} />;
}

export const PbaThreeParadigmsAnim = memo(function PbaThreeParadigmsAnim() {
  const id = useId();
  const { language } = useLanguage();
  const isEs = language === 'es';
  return <Frame
    title={isEs ? 'Canvas App → Arquitectura híbrida Pro-Code' : 'Canvas App → Pro-Code Hybrid Architecture'}
    description={isEs ? 'Un componente React se empaqueta como control PCF y se convierte en una interfaz de aprobación de órdenes dentro de una Canvas app. La interfaz completada permanece antes de que la secuencia se repita.' : 'A React component is packaged as a PCF control and becomes a working order approval interface inside a Canvas app. The completed interface holds before the sequence repeats.'}
  >
    <defs><clipPath id={`${id}-control`}><rect x="208" y="81" width="127" height="88" rx="5" /></clipPath></defs>
    <text x="18" y="25" className={s.label}>{isEs ? 'Construir componente' : 'Build the component'}</text><text x="204" y="25" className={s.label}>{isEs ? 'Diseñar experiencia' : 'Shape the experience'}</text>
    <rect x="16" y="39" width="137" height="135" rx="7" className={s.surface} />
    <text x="27" y="58" className={s.file}>Approval.tsx</text><path d="M16 68H153" className={s.rule} />
    <g className={s.code}>
      <text x="26" y="88"><tspan className={s.codeNumber}>01 </tspan><tspan className={s.keyword}>return</tspan>{' ('}</text>
      <text x="26" y="106"><tspan className={s.codeNumber}>02 </tspan><tspan className={s.keyword}>{' <Approval'}</tspan></text>
      <text x="26" y="124"><tspan className={s.codeNumber}>03 </tspan>{'  data={rows}'}</text>
      <text x="26" y="142"><tspan className={s.codeNumber}>04 </tspan><tspan className={s.keyword}>{' />'}</tspan></text>
    </g>
    <path d="M47 130H132" className={s.codeUnderline} />
    <text x="27" y="162" className={s.micro}>React + TypeScript</text>
    <Flow d="M154 107H199" />
    <path d="M194 103l5 4-5 4" className={s.arrow} /><text x="176" y="92" textAnchor="middle" className={s.bridgeLabel}>PCF</text>
    <rect x="200" y="39" width="144" height="135" rx="7" className={s.appSurface} />
    <text x="212" y="58" className={s.appTitle}>{isEs ? 'Aprobación de órdenes' : 'Order approvals'}</text><circle cx="330" cy="54" r="2.5" className={s.readyDot} />
    <path d="M200 68H344" className={s.rule} />
    <g className={s.wireframe}><rect x="211" y="82" width="122" height="78" rx="4" className={s.slot} /><path d="M222 97H293M222 110H309M222 124H277M222 146H267" className={s.skeleton} /></g>
    <g clipPath={`url(#${id}-control)`}>
      <g className={s.compiled}>
        <text x="212" y="90" className={s.micro}>{isEs ? 'Orden de compra' : 'Purchase request'}</text><text x="212" y="108" className={s.order}>PO-2048</text>
        <text x="212" y="126" className={s.micro}>{isEs ? 'Operaciones' : 'Operations'}</text><text x="331" y="126" textAnchor="end" className={s.micro}>{isEs ? 'Listo' : 'Ready'}</text>
        <rect x="211" y="138" width="122" height="24" rx="4" className={s.action} /><text x="226" y="154" className={s.actionLabel}>{isEs ? 'Aprobar orden' : 'Approve request'}</text><Check x={314} y={150} className={s.actionCheck} />
      </g>
    </g>
    <Footer>{isEs ? 'Código a medida. Experiencia nativa.' : 'Custom code. Native app experience.'}</Footer>
  </Frame>;
});

const sourceDefs = [
  { en: { title: 'Accounts' }, es: { title: 'Cuentas' }, field: 'account_id', y: 39, d: 'M112 59H135Q143 59 143 67V98H155' },
  { en: { title: 'Contacts' }, es: { title: 'Contactos' }, field: 'contact_id', y: 89, d: 'M112 109H155' },
  { en: { title: 'Security roles' }, es: { title: 'Roles de seguridad' }, field: 'role_id', y: 139, d: 'M112 159H135Q143 159 143 151V119H155' },
];

export const PbaProCodeApiEngineAnim = memo(function PbaProCodeApiEngineAnim() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  return <Frame
    title={isEs ? 'Fusión de esquema Dataverse y PCF' : 'The Dataverse Schema & PCF Fusion'}
    description={isEs ? 'Cuentas, Contactos y Roles de seguridad convergen en un componente PCF. Sus relaciones se convierten en una interfaz vinculada con contacto y permisos de acceso.' : 'Accounts, Contacts and Security Roles converge in a PCF component. Their relationships become a bound account interface with its contact and permitted access displayed.'}
  >
    <text x="18" y="25" className={s.label}>Dataverse</text><text x="239" y="25" className={s.label}>{isEs ? 'Componente vinculado' : 'Bound component'}</text>
    {sourceDefs.map((source, i) => {
      const copy = isEs ? source.es : source.en;
      return <g key={source.en.title}>
        <Flow d={source.d} delay={`${i * .4}s`} />
        <g className={s.source} style={{ '--delay': `${i * .4}s` }}>
          <rect x="16" y={source.y} width="96" height="40" rx="5" className={s.surface} />
          <text x="26" y={source.y + 16} className={s.sourceTitle}>{copy.title}</text><text x="26" y={source.y + 31} className={s.field}>{source.field}</text>
        </g>
      </g>;
    })}
    <rect x="151" y="80" width="57" height="57" rx="10" className={s.hubRim} /><rect x="155" y="84" width="49" height="49" rx="7" className={s.hub} />
    <path d="M172 95l-6 6 6 6m15-12 6 6-6 6m-5-13-5 15" className={s.codeGlyph} /><text x="180" y="122" textAnchor="middle" className={s.bridgeLabel}>PCF</text>
    <Flow d="M209 109H235" outgoing /><path d="M230 105l5 4-5 4" className={s.arrow} />
    <rect x="237" y="39" width="107" height="140" rx="7" className={s.appSurface} />
    <g className={s.boundData}>
      <circle cx="258" cy="61" r="11" className={s.avatar} /><text x="258" y="65" textAnchor="middle" className={s.avatarText}>A</text>
      <text x="248" y="89" className={s.appTitle}>{isEs ? 'Cuenta Acme' : 'Acme account'}</text><text x="248" y="104" className={s.micro}>{isEs ? 'Corporativo' : 'Enterprise'}</text>
      <path d="M248 116H333" className={s.rule} />
      <text x="248" y="133" className={s.micro}>{isEs ? 'Contacto principal' : 'Primary contact'}</text><text x="248" y="149" className={s.contact}>Alex Morgan</text>
      <Check x={249} y={166} /><text x="264" y="169" className={s.access}>{isEs ? 'Rol aplicado' : 'Role applied'}</text>
    </g>
    <Footer>{isEs ? 'Datos relacionales, interfaces a medida' : 'Relational data, tailored interfaces'}</Footer>
  </Frame>;
});

const layerDefs = [
  { en: { name: 'Custom React UI', detail: 'PCF control' }, es: { name: 'UI React a medida', detail: 'Control PCF' }, y: 45, icon: 'M40 57l-5 5 5 5m10-10 5 5-5 5' },
  { en: { name: 'API gateway', detail: 'Enterprise connectors' }, es: { name: 'Gateway de APIs', detail: 'Conectores enterprise' }, y: 93, icon: 'M36 110h18m-4-4 4 4-4 4M40 106l-4 4 4 4' },
  { en: { name: 'Dataverse', detail: 'Governed records' }, es: { name: 'Dataverse', detail: 'Registros gobernados' }, y: 141, icon: 'M37 153h16v12H37zM37 157h16M42 153v12' },
];

export const PbaEnterpriseDataverseMeshAnim = memo(function PbaEnterpriseDataverseMeshAnim() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const permissions = isEs
    ? ['Identidad', 'Acceso acotado', 'Permisos por fila']
    : ['Identity', 'Scoped access', 'Row permissions'];

  return <Frame
    title={isEs ? 'Malla de arquitectura empresarial segura' : 'The Secure Custom Architecture Grid'}
    description={isEs ? 'Dentro del perímetro del tenant, una petición pasa desde una UI en React a través de un gateway de APIs hacia registros gobernados de Dataverse. Identidad, acceso acotado y permisos por fila acompañan a cada capa.' : 'Inside a tenant boundary, a request moves from a custom React interface through an API gateway to governed Dataverse records. Identity, scoped access and row permissions accompany each layer.'}
  >
    <rect x="16" y="13" width="328" height="169" rx="9" className={s.boundary} />
    <path d="M27 24v-4a3 3 0 0 1 6 0v4m-7 0h8v7h-8z" className={s.lock} /><text x="41" y="28" className={s.micro}>{isEs ? 'Perímetro de su tenant' : 'Your tenant boundary'}</text>
    <text x="332" y="28" textAnchor="end" className={s.boundaryLabel}>ZERO TRUST</text>
    <Flow d="M44 79V93" delay="0s" /><Flow d="M44 127V141" delay="1s" />
    {layerDefs.map((layer, i) => {
      const copy = isEs ? layer.es : layer.en;
      return <g key={layer.en.name} style={{ '--delay': `${i * 1}s` }}>
        <rect x="26" y={layer.y} width="178" height="34" rx="5" className={s.layer} />
        <path d={layer.icon} className={s.layerIcon} />
        <text x="65" y={layer.y + 14} className={s.layerTitle}>{copy.name}</text><text x="65" y={layer.y + 26} className={s.micro}>{copy.detail}</text>
        <path d={`M204 ${layer.y + 17}H223`} className={s.connection} />
        <g className={s.verified}><circle cx="236" cy={layer.y + 17} r="8" className={s.verifiedRing} /><Check x={232} y={layer.y + 17} /><text x="250" y={layer.y + 21} className={s.permission}>{permissions[i]}</text></g>
      </g>;
    })}
    <Footer>{isEs ? 'Seguridad en cada capa' : 'Security at every layer'}</Footer>
  </Frame>;
});
