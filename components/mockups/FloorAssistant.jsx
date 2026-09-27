'use client';

import React from 'react';
import { BookOpen, Database, DraftingCompass, History, Mic, TriangleAlert } from 'lucide-react';
import { Pill, ProductBar } from './ui/primitives';
import { AgentChat, AgentTurn, Answer, Composer, PolicyChip, ReadAloud, Reasoning, Thought, ToolCall, TrailItem, VoiceBubble } from './ui/agent';
import { useBeatSteps, useStoryline } from './ui/useStoryline';
import f from './FloorAssistant.module.css';

/* NeuralBI · Floor Assistant: the product behind "Factory Floor AI Assistant": a Copilot Studio agent an engineer talks
 * to at the machine. At 22:04 Ana Ríos, booked by the maintenance flow, stands at IMM-02 on WO-5531 and asks aloud how to
 * swap the pump bearing. The agent reasons in the open, pulls the service manual, the pump's schematic and the repair log,
 * puts safety first, then answers aloud with its sources. The sources pane shows what each call brought back. */
const BEATS = [
  { id: 'ask', duration: 2600 },
  { id: 'ground', duration: 1700 },
  { id: 'search', duration: 2700 },
  { id: 'safety', duration: 1700 },
  { id: 'answer', duration: 4400 },
];
// Reasoning clock by beat, in seconds.
const CLOCK = { ask: 0, ground: 1, search: 3, safety: 5, answer: 6 };

const words = {
  en: {
    agents: 'Agents', title: 'Floor Assistant', grounded: 'Grounded · manuals · drawings · logs', voice: 'Voice · hands-free',
    voiceHead: 'Ana Ríos · voice · 22:04',
    question: 'How do I swap the pump bearing on IMM-02? Anything I should watch out for?',
    reasoning: 'Reasoning', reasoned: 'Reasoned for 6 s · 3 sources',
    thoughts: {
      ground: 'Ana is at IMM-02 on WO-5531, the pump bearing swap. I will pull the procedure, the pump drawing and every past swap on this machine.',
      safety: 'The manual requires lockout and a bled accumulator before the pump opens. The log adds a catch: after the last swap the coupling ran 0.3 mm out.',
    },
    safetyOk: 'Safety · lockout first',
    results: { manual: '§7.4 · p. 212', schematic: 'Item ② · 6310-2RS', log: '3 jobs · 1 note' },
    logRows: ['WO-4127 · coupling 0.3 mm out'],
    answer: 'Lock out IMM-02 and bleed the accumulator to 0 bar first. Pull the coupling guard, then press out bearing ② with puller P-12; your 6310-2RS is waiting in bin A-14. Torque the housing bolts to 45 N·m. The last swap left the coupling 0.3 mm out, so laser-align it before restart.',
    sources: ['Manual §7.4', 'Schematic rev C', 'WO-4127'],
    actions: ['Steps pinned to WO-5531', 'Schematic sent to tablet'],
    reading: 'Reading aloud', read: 'Read aloud · 0:21',
    ask: 'Hold to talk or type…', handsFree: 'Hands-free',
    sourcesTitle: 'Sources', sourcesMeta: 'SharePoint · Dataverse',
    manual: 'Service manual · §7.4 Pump bearing',
    steps: [
      'Lock out IMM-02 and bleed the accumulator to 0 bar.',
      'Remove the coupling guard and the coupling half.',
      'Press out bearing ② with puller P-12.',
      'Fit the new 6310-2RS; torque housing bolts to 45 N·m.',
    ],
    schematic: 'Schematic · HP-40 pump', itemLabel: '6310-2RS · A-14',
    log: 'Repair log · IMM-02 pump',
    jobs: [
      ['Jul 2024', 'WO-4127', 'Bearing 6310-2RS replaced · L. Mena', 'Coupling 0.3 mm out after the swap; laser-realigned.'],
      ['Nov 2023', 'WO-3310', 'Seal kit HP-40 replaced'],
      ['Mar 2023', 'WO-2894', 'Bearing replaced · vibration zone C'],
    ],
  },
  es: {
    agents: 'Agentes', title: 'Asistente de planta', grounded: 'Conectado · manuales · planos · historial', voice: 'Voz · manos libres',
    voiceHead: 'Ana Ríos · voz · 22:04',
    question: '¿Cómo cambio el rodamiento de la bomba de IMM-02? ¿Algo que deba vigilar?',
    reasoning: 'Razonamiento', reasoned: 'Razonó durante 6 s · 3 fuentes',
    thoughts: {
      ground: 'Ana está en IMM-02 con la WO-5531, el cambio del rodamiento de la bomba. Buscaré el procedimiento, el plano de la bomba y cada cambio anterior en esta máquina.',
      safety: 'El manual exige bloqueo y el acumulador purgado antes de abrir la bomba. El historial agrega un detalle: tras el último cambio el acople quedó 0.3 mm desalineado.',
    },
    safetyOk: 'Seguridad · bloqueo primero',
    results: { manual: '§7.4 · p. 212', schematic: 'Ítem ② · 6310-2RS', log: '3 trabajos · 1 nota' },
    logRows: ['WO-4127 · acople 0.3 mm desalineado'],
    answer: 'Primero bloquea IMM-02 y purga el acumulador a 0 bar. Retira la guarda del acople y extrae el rodamiento ② con el extractor P-12; tu 6310-2RS te espera en la ubicación A-14. Aprieta los pernos de la carcasa a 45 N·m. En el último cambio el acople quedó 0.3 mm desalineado, así que alinéalo con láser antes de arrancar.',
    sources: ['Manual §7.4', 'Plano rev C', 'WO-4127'],
    actions: ['Pasos fijados en WO-5531', 'Plano enviado a la tablet'],
    reading: 'Leyendo en voz alta', read: 'Leído en voz alta · 0:21',
    ask: 'Mantén para hablar o escribe…', handsFree: 'Manos libres',
    sourcesTitle: 'Fuentes', sourcesMeta: 'SharePoint · Dataverse',
    manual: 'Manual de servicio · §7.4 Rodamiento de bomba',
    steps: [
      'Bloquea IMM-02 y purga el acumulador a 0 bar.',
      'Retira la guarda y el medio acople.',
      'Extrae el rodamiento ② con el extractor P-12.',
      'Monta el 6310-2RS nuevo; aprieta la carcasa a 45 N·m.',
    ],
    schematic: 'Plano · bomba HP-40', itemLabel: '6310-2RS · A-14',
    log: 'Historial · bomba IMM-02',
    jobs: [
      ['jul 2024', 'WO-4127', 'Rodamiento 6310-2RS cambiado · L. Mena', 'Acople 0.3 mm desalineado tras el cambio; realineado con láser.'],
      ['nov 2023', 'WO-3310', 'Kit de sellos HP-40 cambiado'],
      ['mar 2023', 'WO-2894', 'Rodamiento cambiado · vibración zona C'],
    ],
  },
};
// The agent's tool calls, as it names them, with the arguments it passes; one per source, in the pane's order.
const TOOLS = {
  manual: { icon: BookOpen, name: 'search_manuals', args: '{ asset: "IMM-02", q: "pump bearing replacement" }' },
  schematic: { icon: DraftingCompass, name: 'open_schematic', args: '{ drawing: "HP-40 pump", rev: "C" }' },
  log: { icon: History, name: 'repair_history', args: '{ asset: "IMM-02", part: "6310-2RS" }' },
};
// Schematic callouts: item, the point on the part, and where its balloon sits.
const CALLOUTS = [[1, 41, 26, 41, 11], [4, 107, 74, 107, 104], [2, 149, 38, 149, 11], [3, 182, 76, 182, 104], [5, 272, 30, 290, 11]];
const count = text => text.split(' ').length;

function readings(phase, step, t) {
  const index = BEATS.findIndex(beat => beat.id === phase);
  // Work done so far within a beat: nothing before it, all of it after.
  const through = id => index > BEATS.findIndex(beat => beat.id === id) ? Infinity : phase === id ? step : -1;
  const search = through('search'), safety = through('safety');
  // One tool per search step, each source filling in as its tool returns.
  const tool = i => (search >= i + 1 ? 'done' : search >= i ? 'running' : null);
  const source = i => (search >= i + 1 ? 'ready' : search >= i ? 'loading' : 'idle');
  return {
    index,
    heard: through('ask'),
    thoughts: { ground: through('ground'), safety },
    tools: { manual: tool(0), schematic: tool(1), log: tool(2) },
    sources: { manual: source(0), schematic: source(1), log: source(2) },
    safe: safety >= count(t.thoughts.safety),
    answer: through('answer'),
    clock: CLOCK[phase],
  };
}

export default function FloorAssistant({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  // Per beat: how many pieces of work land (spoken words, thought words, tool replies), and how often.
  const [limit, every] = {
    ask: [count(t.question), 150],
    ground: [count(t.thoughts.ground), 45],
    search: [3, 850],
    safety: [count(t.thoughts.safety), 45],
    answer: [count(t.answer), 60],
  }[phase];
  const step = useBeatSteps(phase, live, limit, every);
  const data = readings(phase, step, t);
  const answering = data.answer >= 0;
  const spoken = Math.min(Math.max(data.answer, 0), count(t.answer)) / count(t.answer);

  const thought = id => data.thoughts[id] >= 0 && <Thought key={`thought-${id}`} text={t.thoughts[id]} shown={data.thoughts[id]}>
    {id === 'safety' && <PolicyChip shown={data.safe}>{t.safetyOk}</PolicyChip>}
  </Thought>;
  const call = id => data.tools[id] && <ToolCall key={`tool-${id}`} {...TOOLS[id]} state={data.tools[id]} result={t.results[id]}
    rows={id === 'log' ? t.logRows : undefined} />;
  // Manual steps: the lockout one once the agent has put safety first, the ones it cites once it answers.
  const mark = i => (i === 0 ? (data.safe ? 'safety' : 'none') : i >= 2 && answering ? 'cited' : 'none');

  return <div className={f.app} data-phase={phase}>
    <ProductBar section={t.agents} title={t.title}>
      <span className={f.grounded}><Pill icon={Database}>{t.grounded}</Pill></span>
      <Pill icon={Mic} tone="ok">{t.voice}</Pill>
    </ProductBar>

    <div className={f.body}>
      <AgentChat composer={<Composer placeholder={t.ask} toggle={t.handsFree} icon={Mic} />}>
        <VoiceBubble head={t.voiceHead} context="WO-5531" text={t.question} shown={data.heard} />
        {data.index >= 1 && <AgentTurn name={t.title}>
          <Reasoning open={!answering} label={t.reasoning} clock={data.clock} closed={t.reasoned}
            trail={<>{Object.values(TOOLS).map(({ name }) => <TrailItem key={name}>{name}</TrailItem>)}<TrailItem policy>{t.safetyOk}</TrailItem></>}>
            {thought('ground')}
            {call('manual')}
            {call('schematic')}
            {call('log')}
            {thought('safety')}
          </Reasoning>
          {answering && <Answer text={t.answer} shown={data.answer} complete={spoken >= 1} sources={t.sources} actions={t.actions} />}
          {answering && <ReadAloud progress={spoken} label={spoken >= 1 ? t.read : t.reading} />}
        </AgentTurn>}
      </AgentChat>

      <aside className={f.pane}>
        <header className={f.paneHead}><b>{t.sourcesTitle}</b><span>{t.sourcesMeta}</span></header>

        <section className={f.source} data-state={data.sources.manual} data-source="manual">
          <SourceHead n={1} icon={BookOpen} title={t.manual} meta="p. 212" />
          <ol className={f.steps}>
            {t.steps.map((text, i) => <li key={text} data-mark={mark(i)}>
              <b>{i + 1}</b><span>{text}</span>{i === 0 && <TriangleAlert strokeWidth={2.2} />}
            </li>)}
          </ol>
        </section>

        <section className={f.source} data-state={data.sources.schematic} data-source="schematic">
          <SourceHead n={2} icon={DraftingCompass} title={t.schematic} meta="rev C" />
          <Schematic label={t.itemLabel} />
        </section>

        <section className={f.source} data-state={data.sources.log} data-source="log">
          <SourceHead n={3} icon={History} title={t.log} meta="IMM-02" />
          <ol className={f.jobs}>
            {t.jobs.map(([date, wo, what, note]) => <li key={wo} data-note={Boolean(note) && data.safe}>
              <time>{date}</time><b>{wo}</b><span>{what}</span>
              {note && <em>{note}</em>}
            </li>)}
          </ol>
        </section>
      </aside>
    </div>
  </div>;
}

/** A source's title row: the number the answer cites it by, what it is, and where in it the agent looked. */
function SourceHead({ n, icon: Icon, title, meta }) {
  return <span className={f.sourceHead}>
    <i className={f.cite}>{n}</i><Icon strokeWidth={2} /><b>{title}</b><span>{meta}</span>
  </span>;
}

/** HP-40 pump, exploded along its shaft: ① motor, ④ coupling, ② bearing, ③ seal kit, ⑤ pump head. */
function Schematic({ label }) {
  return <svg viewBox="0 0 320 116" className={f.drawing} aria-hidden="true">
    <path d="M4 60H316" className={f.centerline} />
    <g className={f.part}>
      <rect x="12" y="32" width="58" height="56" rx="4" />
      <path d="M22 32V26M32 32V26M42 32V26M52 32V26M62 32V26" />
      <rect x="70" y="56" width="12" height="8" rx="1" />
    </g>
    <g className={f.part}>
      <rect x="92" y="46" width="10" height="28" rx="2" />
      <rect x="104" y="50" width="6" height="20" rx="1" />
      <rect x="112" y="46" width="10" height="28" rx="2" />
    </g>
    <rect x="130" y="56" width="92" height="8" rx="1" className={f.shaft} />
    <g className={f.bearing}>
      <rect x="140" y="38" width="18" height="16" rx="1.5" /><circle cx="149" cy="46" r="4.5" />
      <rect x="140" y="66" width="18" height="16" rx="1.5" /><circle cx="149" cy="74" r="4.5" />
    </g>
    <g className={f.part}>
      <rect x="176" y="44" width="5" height="32" rx="1" />
      <rect x="184" y="44" width="5" height="32" rx="1" />
    </g>
    <g className={f.part}>
      <rect x="204" y="30" width="80" height="60" rx="6" />
      <rect x="236" y="18" width="16" height="12" rx="1" />
      <rect x="284" y="52" width="14" height="16" rx="1" />
      <circle cx="244" cy="60" r="17" /><circle cx="244" cy="60" r="6" />
    </g>
    {CALLOUTS.map(([item, x, y, bx, by]) => <g key={item} className={f.callout} data-item={item}>
      <path d={`M${x} ${y}L${bx} ${by + (by < y ? 6 : -6)}`} />
      <circle cx={bx} cy={by} r="6" />
      <text x={bx} y={by + 2.4}>{item}</text>
    </g>)}
    <text x="160" y="13.5" className={f.itemLabel}>{label}</text>
  </svg>;
}
