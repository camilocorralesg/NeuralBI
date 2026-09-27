'use client';

import React from 'react';
import {
  Bot, Check, CircleCheck, Database, Download, FilePen, FileText, GitBranch, GitCompareArrows, Lock, Mail, MessageSquare,
  Minus, Paperclip, Repeat, ScanText, TriangleAlert, UserCheck, Workflow,
} from 'lucide-react';
import { LiveNumber, Mark, Pill, ProductBar } from './ui/primitives';
import { useBeatSteps, useStoryline } from './ui/useStoryline';
import m from './DocumentIntelligence.module.css';

/* NeuralBI Flows: the product behind "Cognitive Automation & Documents": a Power Automate flow, seen in its designer
 * while it runs. The email of PO #4821 triggers it, a headless RPA bot fetches the customs declaration from the broker
 * portal, AI extracts every document, the matching engine finds a declared-value gap, the condition corrects it within
 * tolerance and the entry is posted to Dynamics 365. The run details pane shows what each step does to the business. */
const BEATS = [
  { id: 'trigger', duration: 1600 },
  { id: 'rpa', duration: 2600 },
  { id: 'extract', duration: 2600 },
  { id: 'match', duration: 2000 },
  { id: 'branch', duration: 2200 },
  { id: 'publish', duration: 2600 },
];
// Per beat: how many pieces of work land, and how often.
const STEPS = {
  trigger: [1, 900], rpa: [4, 460], extract: [5, 420], match: [5, 300], branch: [3, 600], publish: [1, 700],
};
const ELAPSED = { trigger: 1, rpa: 13, extract: 27, match: 31, branch: 36, publish: 42 };

const words = {
  en: {
    flows: 'Flows', flowName: 'Customs document ingestion', designer: 'Designer', history: 'Run history',
    running: 'Running', succeeded: 'Succeeded', run: 'Run #1287',
    nodes: {
      trigger: ['When a new email arrives', 'Outlook · customs@neuralbi.io'],
      rpa: ['Run desktop flow', 'Broker portal · unattended, headless'],
      loop: ['Apply to each', 'Documents'],
      extract: ['Extract information from documents', 'AI Builder · custom model'],
      match: ['Match discrepancies', 'NeuralBI matching engine'],
      condition: ['Condition', 'Value gap ≤ 2%'],
      update: ['Update declaration', 'Broker portal · DEC-5520'],
      notify: ['Post in Teams', 'Customs broker channel'],
      approval: ['Start an approval', 'Customs manager'],
      erp: ['Add a new row', 'Dynamics 365 · Customs entries'],
    },
    results: { trigger: '2 files', rpa: '12 s', extract: '98%', match: '1 gap', condition: 'true', update: '0.6 s', notify: '0.3 s', erp: '201' },
    yes: 'True', no: 'False', skipped: 'Skipped', docs: ['Invoice', 'Declaration', 'BL'],
    inputs: 'Inputs', outputs: 'Outputs', statusRunning: 'Running', statusDone: 'Succeeded',
    from: 'From', to: 'To', subject: 'Subject', subjectText: 'PO #4821 · export documents', received: 'Received 14:18',
    headless: 'Headless session · VM-RPA-02', portalFields: [['Entry no.', '25 47 3902 0005520'], ['Consignee', 'Andina Retail S.A.S.'], ['Declared value', 'USD 182,400.00']],
    downloaded: 'Downloaded', downloading: 'Downloading',
    paperTitle: 'Commercial invoice', date: '16 May 2025', seller: 'Seller', consignee: 'Consignee',
    sellerName: 'Polímeros del Norte S.A.', sellerCity: 'Monterrey, MX', buyerName: 'Andina Retail S.A.S.', buyerCity: 'Bogotá, CO',
    description: 'Description', item: 'PET resin, food grade', qty: 'Qty', weight: 'Weight', amount: 'Amount', total: 'Total',
    tags: ['Invoice No. · 99%', 'Consignee · 98%', 'HS code · 99%', 'Pallets · 97%', 'Total · 99%'], iteration: 'Iteration 1 of 3 · INV-8841.pdf',
    colInvoice: 'Invoice', colCustoms: 'Customs', rows: ['Consignee', 'HS code', 'Pallets', 'Gross weight', 'Declared value'],
    finding: 'Declared value on the customs declaration is 1.0% below the invoice and BL.',
    expression: 'Expression', updated: 'Declared value', teams: 'Declaration DEC-5520 updated to $184,200 to match INV-8841. No action needed.',
    created: '201 Created', straight: 'Straight-through', cycle: 'Cycle time', manual: 'vs ~3 h manual',
    documents: 'Documents in this run', docNames: ['Invoice', 'Customs declaration', 'Bill of lading'],
    docStates: { waiting: 'Waiting', received: 'Received', extracted: 'Extracted', matched: 'Matched', gap: '1 gap', corrected: 'Corrected', posted: 'Posted' },
  },
  es: {
    flows: 'Flujos', flowName: 'Ingesta de documentos aduaneros', designer: 'Diseñador', history: 'Historial',
    running: 'En curso', succeeded: 'Correcto', run: 'Ejecución #1287',
    nodes: {
      trigger: ['Cuando llega un correo nuevo', 'Outlook · customs@neuralbi.io'],
      rpa: ['Ejecutar flujo de escritorio', 'Portal del agente · desatendido, headless'],
      loop: ['Aplicar a cada uno', 'Documentos'],
      extract: ['Extraer información de documentos', 'AI Builder · modelo personalizado'],
      match: ['Detectar discrepancias', 'Motor de matching NeuralBI'],
      condition: ['Condición', 'Diferencia de valor ≤ 2%'],
      update: ['Actualizar declaración', 'Portal del agente · DEC-5520'],
      notify: ['Publicar en Teams', 'Canal del agente aduanal'],
      approval: ['Iniciar aprobación', 'Gerente de aduanas'],
      erp: ['Agregar una nueva fila', 'Dynamics 365 · Entradas aduaneras'],
    },
    results: { trigger: '2 archivos', rpa: '12 s', extract: '98%', match: '1 diferencia', condition: 'true', update: '0.6 s', notify: '0.3 s', erp: '201' },
    yes: 'Verdadero', no: 'Falso', skipped: 'Omitido', docs: ['Factura', 'Declaración', 'BL'],
    inputs: 'Entradas', outputs: 'Salidas', statusRunning: 'En curso', statusDone: 'Correcto',
    from: 'De', to: 'Para', subject: 'Asunto', subjectText: 'OC #4821 · documentos de exportación', received: 'Recibido 14:18',
    headless: 'Sesión headless · VM-RPA-02', portalFields: [['N.º de pedimento', '25 47 3902 0005520'], ['Consignatario', 'Andina Retail S.A.S.'], ['Valor declarado', 'USD 182,400.00']],
    downloaded: 'Descargado', downloading: 'Descargando',
    paperTitle: 'Factura comercial', date: '16 may 2025', seller: 'Vendedor', consignee: 'Consignatario',
    sellerName: 'Polímeros del Norte S.A.', sellerCity: 'Monterrey, MX', buyerName: 'Andina Retail S.A.S.', buyerCity: 'Bogotá, CO',
    description: 'Descripción', item: 'Resina PET grado alimenticio', qty: 'Cant.', weight: 'Peso', amount: 'Importe', total: 'Total',
    tags: ['N.º factura · 99%', 'Consignatario · 98%', 'Código HS · 99%', 'Pallets · 97%', 'Total · 99%'], iteration: 'Iteración 1 de 3 · INV-8841.pdf',
    colInvoice: 'Factura', colCustoms: 'Aduana', rows: ['Consignatario', 'Código HS', 'Pallets', 'Peso bruto', 'Valor declarado'],
    finding: 'El valor declarado en la declaración aduanera está 1.0% por debajo de la factura y el BL.',
    expression: 'Expresión', updated: 'Valor declarado', teams: 'Declaración DEC-5520 actualizada a $184,200 según INV-8841. No requiere acción.',
    created: '201 Created', straight: 'Sin intervención', cycle: 'Tiempo de ciclo', manual: 'vs ~3 h manual',
    documents: 'Documentos de esta ejecución', docNames: ['Factura', 'Declaración aduanera', 'Conocimiento de embarque'],
    docStates: { waiting: 'En espera', received: 'Recibido', extracted: 'Extraído', matched: 'Cuadrado', gap: '1 diferencia', corrected: 'Corregido', posted: 'Publicado' },
  },
};
// Field × document readings; the customs declaration's declared value is the discrepancy.
const MATRIX = [
  ['✓', '✓', '✓'],
  ['3907.61', '3907.61', '3907.61'],
  ['24', '24', '24'],
  ['18.4 t', '18.4 t', '18.4 t'],
  ['$184.2k', '$182.4k', '$184.2k'],
];
const DOCS = ['INV-8841', 'DEC-5520', 'MXCOL-4821'];
const ICONS = {
  trigger: Mail, rpa: Bot, loop: Repeat, extract: ScanText, match: GitCompareArrows, condition: GitBranch,
  update: FilePen, notify: MessageSquare, approval: UserCheck, erp: Database,
};
// The action whose run details the pane shows, by beat.
const ACTIVE = { trigger: 'trigger', rpa: 'rpa', extract: 'extract', match: 'match', branch: 'condition', publish: 'erp' };

/** Every action's run state for the phase: 'idle' | 'running' | 'done' | 'skipped'. */
function readings(phase, step) {
  const index = BEATS.findIndex(beat => beat.id === phase);
  const own = id => {
    const at = BEATS.findIndex(beat => beat.id === id);
    return index > at ? 'done' : index < at ? 'idle' : step >= STEPS[id][0] ? 'done' : 'running';
  };
  // Work done so far within a beat: nothing before it, all of it after.
  const through = id => index > BEATS.findIndex(beat => beat.id === id) ? Infinity : phase === id ? step : -1;
  const branch = through('branch');
  const pick = (from, to) => branch >= to ? 'done' : branch >= from ? 'running' : 'idle';
  const extracted = through('extract');
  const nodes = {
    trigger: own('trigger'), rpa: own('rpa'), extract: own('extract'), match: own('match'),
    condition: pick(0, 1), update: pick(1, 2), notify: pick(2, 3), approval: branch >= 1 ? 'skipped' : 'idle', erp: own('publish'),
  };
  // Each document's state in the run; the declaration arrives through the bot and carries the gap until corrected.
  const docs = DOCS.map((_, i) => {
    const customs = i === 1;
    if (nodes.erp === 'done') return 'posted';
    if (customs && branch >= 2) return 'corrected';
    if (through('match') >= 5) return customs ? 'gap' : 'matched';
    if ((extracted >= 5 ? 3 : extracted >= 3 ? 2 : extracted >= 1 ? 1 : 0) > i) return 'extracted';
    return (customs ? nodes.rpa : nodes.trigger) === 'done' ? 'received' : 'waiting';
  });
  return {
    nodes,
    docs,
    portal: through('rpa'),
    fields: extracted,
    iterations: extracted >= 5 ? 3 : extracted >= 3 ? 2 : extracted >= 1 ? 1 : 0,
    rows: through('match'),
    branch,
    done: nodes.erp === 'done',
    elapsed: ELAPSED[phase],
  };
}

export default function DocumentIntelligence({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  // Within a beat the action's work lands piece by piece: form fields, extracted fields, compared rows, branch actions.
  const step = useBeatSteps(phase, live, ...STEPS[phase]);

  const data = readings(phase, step);
  const node = id => <Node id={id} t={t} state={data.nodes[id]} />;
  const link = id => <span className={m.link} data-state={data.nodes[id]} />;
  const active = ACTIVE[phase];
  const ActiveIcon = ICONS[active];
  const activeDone = phase === 'branch' ? data.branch >= 3 : data.nodes[active] === 'done';

  return <div className={m.app} data-phase={phase}>
    <ProductBar section={t.flows} title={t.flowName}>
      <span className={m.modes}><span data-active="true">{t.designer}</span><span>{t.history}</span></span>
      <Pill icon={data.done ? CircleCheck : Workflow} tone={data.done ? 'ok' : 'idle'}>
        {t.run} · {data.done ? `${t.succeeded} · 42 s` : <>{t.running} · <LiveNumber value={data.elapsed} decimals={0} suffix=" s" /></>}
      </Pill>
    </ProductBar>

    <div className={m.body}>
      <div className={m.canvas}>
        <div className={m.flow}>
          {node('trigger')}
          {link('rpa')}
          {node('rpa')}
          {link('extract')}
          <div className={m.loop} data-state={data.nodes.extract}>
            <span className={m.loopHead}>
              <Repeat strokeWidth={2} /><b>{t.nodes.loop[0]}</b><span>{t.nodes.loop[1]}</span>
              <span className={m.iterations}>{t.docs.map((doc, i) => <span key={doc} data-done={data.iterations > i}>{doc}</span>)}</span>
            </span>
            {node('extract')}
          </div>
          {link('match')}
          {node('match')}
          {link('condition')}
          {node('condition')}
          <svg className={m.fork} viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 0V4H25V10" data-state={data.branch >= 1 ? 'taken' : 'idle'} />
            <path d="M50 4H75V10" data-state={data.branch >= 1 ? 'skipped' : 'idle'} />
          </svg>
          <div className={m.branches}>
            <div className={m.branch} data-state={data.nodes.erp !== 'idle' ? 'taken' : 'idle'}>
              <span className={m.branchLabel} data-state={data.branch >= 1 ? 'taken' : 'idle'}>{t.yes}</span>
              {node('update')}
              {link('notify')}
              {node('notify')}
            </div>
            <div className={m.branch} data-state={data.branch >= 1 ? 'skipped' : 'idle'}>
              <span className={m.branchLabel} data-state={data.branch >= 1 ? 'skipped' : 'idle'}>{t.no}</span>
              {node('approval')}
            </div>
          </div>
          <svg className={m.fork} viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
            <path d="M25 0V5H50V10" data-state={data.nodes.erp !== 'idle' ? 'taken' : 'idle'} />
            <path d="M75 0V5H50" data-state={data.branch >= 1 ? 'skipped' : 'idle'} />
          </svg>
          {node('erp')}
        </div>
      </div>

      <aside className={m.inspector}>
        <header className={m.inspectHead}>
          <span className={m.inspectIcon}><ActiveIcon strokeWidth={1.9} /></span>
          <b>{t.nodes[active][0]}</b>
          <Pill tone={activeDone ? 'ok' : 'idle'}>{activeDone ? t.statusDone : t.statusRunning}</Pill>
        </header>
        <div className={m.inspectTabs}><span>{t.inputs}</span><span data-active="true">{t.outputs}</span></div>
        <div key={phase} className={m.view}>
          {phase === 'trigger' && <EmailView t={t} />}
          {phase === 'rpa' && <PortalView t={t} progress={data.portal} />}
          {phase === 'extract' && <InvoiceView t={t} fields={data.fields} extracting={live} />}
          {phase === 'match' && <MatchView t={t} rows={data.rows} />}
          {phase === 'branch' && <BranchView t={t} branch={data.branch} />}
          {phase === 'publish' && <ErpView t={t} done={data.done} />}
        </div>
        <div className={m.docs}>
          <span className={m.docsTitle}>{t.documents}</span>
          {DOCS.map((id, i) => <span key={id} className={m.doc} data-state={data.docs[i]}>
            <FileText strokeWidth={1.9} /><b>{t.docNames[i]}</b><span>{id}</span><em>{t.docStates[data.docs[i]]}</em>
          </span>)}
        </div>
      </aside>
    </div>
  </div>;
}

/** A flow action as the designer draws it: connector icon, name and detail, then its run result. */
function Node({ id, t, state }) {
  const Icon = ICONS[id];
  const tone = id === 'match' ? 'warn' : 'ok';
  return <div className={m.node} data-state={state} data-node={id}>
    <span className={m.nodeIcon}><Icon strokeWidth={1.9} /></span>
    <span className={m.nodeText}><b>{t.nodes[id][0]}</b><span>{t.nodes[id][1]}</span></span>
    <span className={m.nodeResult} data-tone={tone}>{state === 'done' ? t.results[id] : state === 'skipped' ? t.skipped : ''}</span>
    <span className={m.nodeMark} data-tone={tone}>
      {state === 'done' && (tone === 'warn' ? <TriangleAlert strokeWidth={2.4} /> : <Check strokeWidth={3} />)}
      {state === 'skipped' && <Minus strokeWidth={3} />}
    </span>
    {state === 'running' && <span className={m.nodeBar} />}
  </div>;
}

function EmailView({ t }) {
  return <div className={m.email}>
    <dl className={m.meta}>
      <dt>{t.from}</dt><dd>exports@polimerosnorte.mx</dd>
      <dt>{t.to}</dt><dd>customs@neuralbi.io</dd>
      <dt>{t.subject}</dt><dd><b>{t.subjectText}</b></dd>
    </dl>
    <span className={m.note}>{t.received}</span>
    <div className={m.files}>
      {[['INV-8841.pdf', '148 KB'], ['MXCOL-4821.pdf', '212 KB']].map(([file, size], i) => <span key={file} className={m.file} style={{ '--i': i }}>
        <Paperclip strokeWidth={2} /><span>{file}</span><small>{size}</small>
      </span>)}
    </div>
  </div>;
}

/** The unattended bot on the broker portal: it fills the entry and downloads the declaration, with no one watching. */
function PortalView({ t, progress }) {
  return <div className={m.portal}>
    <span className={m.note}><Bot strokeWidth={2} />{t.headless}</span>
    <div className={m.browser}>
      <span className={m.url}><Lock strokeWidth={2} />broker-portal.mx/declarations/5520</span>
      <div className={m.form}>
        {t.portalFields.map(([label, value], i) => <span key={label} className={m.input} data-filled={progress > i}>
          <small>{label}</small><span><i>{value}</i></span>
        </span>)}
      </div>
      <span className={m.download} data-done={progress >= 4}>
        <Download strokeWidth={2} /><span>DEC-5520.pdf</span>
        <span className={m.track}><span style={{ transform: `scaleX(${progress >= 4 ? 1 : progress >= 3 ? .4 : 0})` }} /></span>
        <small>{progress >= 4 ? t.downloaded : t.downloading}</small>
      </span>
    </div>
  </div>;
}

function InvoiceView({ t, fields, extracting }) {
  const field = (index, children, props = {}) => <Field index={index} fields={fields} extracting={extracting} tag={t.tags[index]} {...props}>{children}</Field>;
  return <div className={m.invoice}>
    <span className={m.note}><FileText strokeWidth={2} />{t.iteration}</span>
    <div className={m.paper}>
      <div className={m.paperHead}>
        <span className={m.paperTitle}>{t.paperTitle}</span>
        <span className={m.paperMeta}>{field(0, 'INV-8841', { align: 'end' })}<span>{t.date}</span></span>
      </div>
      <div className={m.parties}>
        <span><small>{t.seller}</small><b>{t.sellerName}</b><span>{t.sellerCity}</span></span>
        <span><small>{t.consignee}</small>{field(1, <b>{t.buyerName}</b>)}<span>{t.buyerCity}</span></span>
      </div>
      <div className={m.lines}>
        <span className={m.lineHead}><span>{t.description}</span><span>HS</span><span>{t.qty}</span><span>{t.weight}</span><span>{t.amount}</span></span>
        <span className={m.line}>
          <span>{t.item}</span>
          {field(2, '3907.61')}
          {field(3, '24 plt', { below: true })}
          <span>18,400 kg</span>
          <span>184,200</span>
        </span>
      </div>
      <div className={m.total}><span>{t.total} USD</span>{field(4, <b>184,200.00</b>, { align: 'end' })}</div>
    </div>
  </div>;
}

/** An extracted value: outlined once the model has read it; its confidence label shows while it is the latest read. */
function Field({ index, fields, extracting, tag, align = 'start', below = false, children }) {
  return <span className={m.field} data-shown={fields > index}>
    {children}
    <span className={m.fieldTag} data-fresh={extracting && fields === index + 1} data-align={align} data-below={below}>{tag}</span>
  </span>;
}

function MatchView({ t, rows }) {
  return <div className={m.matching}>
    <div className={m.table}>
      <span className={`${m.row} ${m.rowHead}`}><span /><span>{t.colInvoice}</span><span>{t.colCustoms}</span><span>BL</span></span>
      {t.rows.map((label, r) => {
        const shown = rows > r;
        const off = r === 4;
        return <span key={label} className={m.row} data-state={!shown ? 'pending' : off ? 'mismatch' : 'ok'}>
          <span className={m.rowLabel}>{label}</span>
          {MATRIX[r].map((cell, col) => <span key={col} className={m.cell} data-off={off && col === 1 && shown}>{shown ? cell : '–'}</span>)}
        </span>;
      })}
    </div>
    <p className={m.finding} data-shown={rows >= 5}><TriangleAlert strokeWidth={2} /><span>{t.finding}</span></p>
  </div>;
}

/** The condition holds, so the flow corrects the declaration itself and tells the broker. */
function BranchView({ t, branch }) {
  return <div className={m.branchView}>
    <code className={m.expression}>
      <small>{t.expression}</small>
      <span>abs(declared − invoice) / invoice</span>
      <span><b>1.0%</b> ≤ 2% → <b className={m.verdict} data-shown={branch >= 1}>true</b></span>
    </code>
    <span className={m.update} data-shown={branch >= 2}>
      <FilePen strokeWidth={2} /><span>DEC-5520 · {t.updated}</span><s>$182,400</s><b>$184,200</b>
    </span>
    <span className={m.teams} data-shown={branch >= 3}>
      <Mark className={m.teamsMark} />
      <span><b>NeuralBI Flows</b><span>{t.teams}</span></span>
    </span>
  </div>;
}

function ErpView({ t, done }) {
  return <div className={m.erp}>
    <span className={m.status} data-done={done}>POST /customsentries · <b>{done ? t.created : '…'}</b></span>
    <code className={m.json} data-shown={done}>
      <span>{'{'}</span>
      <span>  "entry": <b>"CUS-4821"</b>,</span>
      <span>  "status": <b>"Posted"</b>,</span>
      <span>  "declaredValue": <b>184200</b>,</span>
      <span>  "documents": <b>3</b></span>
      <span>{'}'}</span>
    </code>
    <div className={m.summary} data-ready={done}>
      <span><small>{t.straight}</small><b>{done ? 3 : 2}/3</b></span>
      <span><small>{t.cycle}</small><b>42 s</b><em>{t.manual}</em></span>
    </div>
  </div>;
}
