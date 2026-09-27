'use client';

import React from 'react';
import { CalendarRange, Database, FilePen, Percent, ShieldCheck, ShoppingBasket } from 'lucide-react';
import { Pill, ProductBar } from './ui/primitives';
import { AgentChat, AgentTurn, Answer, Composer, MessageBubble, PolicyChip, Reasoning, Thought, ToolCall, TrailItem } from './ui/agent';
import { useBeatSteps, useStoryline } from './ui/useStoryline';
import m from './MerchCopilot.module.css';

/* NeuralBI · Merchandising Copilot: the product behind "Merchandising Strategy Copilot": a Copilot Studio agent that
 * Andina Retail's merchandise planner asks for the end-of-season plan. It reads the baskets to find what sells together,
 * optimises a stepped markdown for the summer lines within the margin floor, and drafts, never sends, new terms for
 * Textiles Pacífico as a redline. The season plan beside it fills in, section by section, as each tool returns. */
const BEATS = [
  { id: 'ask', duration: 1400 },
  { id: 'affinity', duration: 2600 },
  { id: 'markdown', duration: 2600 },
  { id: 'terms', duration: 2600 },
  { id: 'answer', duration: 3800 },
];
// Reasoning clock by beat, in seconds.
const CLOCK = { ask: 0, affinity: 3, markdown: 7, terms: 11, answer: 14 };
// A tool runs for this many steps after the thought before it has landed (45 ms steps: about half a second).
const TOOL_STEPS = 12;

const words = {
  en: {
    agents: 'Agents', title: 'Merchandising Copilot', grounded: 'Grounded · Fabric sales · D365 contracts', guard: 'Drafts only · buyer signs',
    who: 'Valentina G. · Merch planner · 08:05',
    request: 'Plan the end of season for rainwear and summer: what do we bundle, when do we mark down, and what do we ask Textiles Pacífico for?',
    reasoning: 'Reasoning', reasoned: 'Reasoned for 14 s · 3 tools',
    thoughts: {
      affinity: 'Start with what sells together. I will read 26 weeks of baskets across the 38 stores and the online store.',
      markdown: 'Summer lines sit at 41% sell-through with seven weeks left. A stepped markdown now keeps more margin than clearing everything at the end.',
      terms: 'The rain kit needs 1,200 jackets from Textiles Pacífico. Terms bind the company, so I will draft them for the buyer to sign.',
    },
    policy: 'Policy · margin ≥ 38% · buyer signs',
    results: { affinity: '4 clusters · lift 3.2×', markdown: '3 steps · margin 39.2%', terms: 'Draft v1 · 4 terms' },
    affinityRows: ['Rain kit · jacket + umbrella + boots'],
    answer: 'Bundle the rain kit: jacket, umbrella and boots sell together 3.2× more often than chance. Mark summer tees and sandals down in three steps from W26 to reach 86% sell-through by W32, with margin at 39.2%. Ask Textiles Pacífico for 1,200 jackets, a 6% rebate, 50% co-funded markdowns after W30 and net 60.',
    sources: ['POS + online baskets', 'Pricing model', 'Contract TP-2023'],
    actions: ['Markdowns staged · pending approval', 'Draft sent to Valentina'],
    ask: 'Ask Merchandising Copilot…', toggle: 'Auto-draft',
    plan: 'Season plan · W25', planSub: 'Rainwear & summer · Andina Retail', drafting: 'Drafting', ready: 'Ready for review',
    clusters: 'Affinity clusters', clustersMeta: '1.2M baskets · 26 wk',
    clusterNames: ['Rain kit · lift 3.2×', 'Summer · 41% sold', 'Denim', 'Basics'],
    products: { jacket: 'Jacket', tees: 'Tees', jeans: 'Jeans', socks: 'Socks' },
    markdown: 'Markdown schedule', lines: [['Summer tees', '2,400 u'], ['Sandals', '1,150 u']],
    sellThrough: 'Sell-through', by: 'by W32', margin: 'Margin', floor: 'floor 38%',
    terms: 'Supply terms · Textiles Pacífico', amendment: 'Amendment to contract TP-2023', draft: 'Draft v1 · buyer signs', sign: 'Buyer signature · pending',
    clauses: [
      ['Volume', [['del', '800'], ['ins', '1,200'], ['text', ' rain jackets · Q3']]],
      ['Rebate', [['ins', '6% above 1,000 units']]],
      ['Markdown support', [['ins', '50% co-funded after W30']]],
      ['Payment', [['text', 'net '], ['del', '30'], ['ins', '60']]],
    ],
  },
  es: {
    agents: 'Agentes', title: 'Copiloto de Merchandising', grounded: 'Conectado · ventas Fabric · contratos D365', guard: 'Solo borradores · firma el comprador',
    who: 'Valentina G. · Planeación comercial · 08:05',
    request: 'Planea el cierre de temporada de lluvia y verano: ¿qué empacamos juntos, cuándo rebajamos y qué le pedimos a Textiles Pacífico?',
    reasoning: 'Razonamiento', reasoned: 'Razonó durante 14 s · 3 herramientas',
    thoughts: {
      affinity: 'Primero, qué se vende junto. Leeré 26 semanas de canastas de las 38 tiendas y la tienda online.',
      markdown: 'El verano va en 41% de venta con siete semanas por delante. Una rebaja escalonada ahora conserva más margen que liquidar todo al final.',
      terms: 'El rain kit necesita 1,200 chaquetas de Textiles Pacífico. Los términos comprometen a la empresa, así que los redactaré para que el comprador los firme.',
    },
    policy: 'Política · margen ≥ 38% · firma el comprador',
    results: { affinity: '4 clusters · lift 3.2×', markdown: '3 pasos · margen 39.2%', terms: 'Borrador v1 · 4 términos' },
    affinityRows: ['Rain kit · chaqueta + paraguas + botas'],
    answer: 'Arma el rain kit: chaqueta, paraguas y botas se compran juntos 3.2× más que por azar. Rebaja camisetas y sandalias de verano en tres pasos desde W26 para llegar a 86% de venta en W32 con margen de 39.2%. Pide a Textiles Pacífico 1,200 chaquetas, 6% por volumen, 50% cofinanciado en rebajas desde W30 y pago a 60 días.',
    sources: ['Canastas POS + online', 'Modelo de precios', 'Contrato TP-2023'],
    actions: ['Rebajas preparadas · por aprobar', 'Borrador enviado a Valentina'],
    ask: 'Pregúntale al Copiloto de Merchandising…', toggle: 'Autoborrador',
    plan: 'Plan de temporada · W25', planSub: 'Lluvia y verano · Andina Retail', drafting: 'Redactando', ready: 'Listo para revisión',
    clusters: 'Clusters de afinidad', clustersMeta: '1.2M canastas · 26 sem',
    clusterNames: ['Rain kit · lift 3.2×', 'Verano · 41% vendido', 'Denim', 'Básicos'],
    products: { jacket: 'Chaqueta', tees: 'Camisetas', jeans: 'Jeans', socks: 'Medias' },
    markdown: 'Calendario de rebajas', lines: [['Camisetas de verano', '2,400 u'], ['Sandalias', '1,150 u']],
    sellThrough: 'Venta', by: 'en W32', margin: 'Margen', floor: 'piso 38%',
    terms: 'Términos de suministro · Textiles Pacífico', amendment: 'Enmienda al contrato TP-2023', draft: 'Borrador v1 · firma el comprador', sign: 'Firma del comprador · pendiente',
    clauses: [
      ['Volumen', [['del', '800'], ['ins', '1,200'], ['text', ' chaquetas impermeables · T3']]],
      ['Rebaja por volumen', [['ins', '6% sobre 1,000 unidades']]],
      ['Apoyo a rebajas', [['ins', '50% cofinanciado desde W30']]],
      ['Pago', [['text', 'neto '], ['del', '30'], ['ins', '60']]],
    ],
  },
};
// The agent's tool calls, as it names them, with the arguments it passes.
const TOOLS = {
  affinity: { icon: ShoppingBasket, name: 'basket_affinity', args: '{ baskets: "1.2M", weeks: 26, stores: 38 }' },
  markdown: { icon: Percent, name: 'markdown_optimizer', args: '{ target: "85% by W32", margin_floor: 0.38 }' },
  terms: { icon: FilePen, name: 'draft_terms', args: '{ supplier: "Textiles Pacífico", volume: 1200 }' },
};
// Affinity clusters as packed bubbles (SVG units): each cluster's circle, then its products sized by sales; the
// largest product of each cluster carries its name (the key below names the clusters).
const CLUSTERS = [
  { tone: 'rain', cx: 66, cy: 52, r: 44, items: [['jacket', 54, 44, 15], [null, 86, 38, 12.5], [null, 62, 76, 10], [null, 91, 66, 7]] },
  { tone: 'summer', cx: 168, cy: 46, r: 34, items: [['tees', 158, 40, 15], [null, 182, 56, 11], [null, 160, 66, 6]] },
  { tone: 'quiet', cx: 238, cy: 32, r: 24, items: [['jeans', 234, 30, 12], [null, 253, 42, 5]] },
  { tone: 'quiet', cx: 256, cy: 80, r: 20, items: [['socks', 250, 80, 9.5], [null, 266, 88, 5]] },
];
// Markdown steps by line, as week columns (W26 = 1, end exclusive) and the cut.
const WEEKS = ['W26', 'W27', 'W28', 'W29', 'W30', 'W31', 'W32'];
const STEPS_BY_LINE = [[[1, 3, 20], [3, 5, 35], [5, 8, 50]], [[1, 4, 25], [4, 8, 40]]];
const count = text => text.split(' ').length;

function readings(phase, step, t) {
  const index = BEATS.findIndex(beat => beat.id === phase);
  // Work done so far within a beat: nothing before it, all of it after.
  const through = id => index > BEATS.findIndex(beat => beat.id === id) ? Infinity : phase === id ? step : -1;
  const thoughts = { affinity: through('affinity'), markdown: through('markdown'), terms: through('terms') };
  const landed = id => thoughts[id] >= count(t.thoughts[id]);
  const returned = id => thoughts[id] >= count(t.thoughts[id]) + TOOL_STEPS;
  const tool = id => (returned(id) ? 'done' : landed(id) ? 'running' : null);
  return {
    index,
    thoughts,
    tools: { affinity: tool('affinity'), markdown: tool('markdown'), terms: tool('terms') },
    ready: { clusters: returned('affinity'), markdown: returned('markdown'), terms: returned('terms') },
    policyShown: landed('terms'),
    answer: through('answer'),
    clock: CLOCK[phase],
  };
}

export default function MerchCopilot({ live, language }) {
  const t = words[language] || words.en;
  const phase = useStoryline(BEATS, live);
  // Per beat: how many pieces of work land (a thought's words and its tool's run, or the answer's words), and how often.
  const [limit, every] = {
    ask: [1, 700],
    affinity: [count(t.thoughts.affinity) + TOOL_STEPS, 45],
    markdown: [count(t.thoughts.markdown) + TOOL_STEPS, 45],
    terms: [count(t.thoughts.terms) + TOOL_STEPS, 45],
    answer: [count(t.answer), 55],
  }[phase];
  const step = useBeatSteps(phase, live, limit, every);
  const data = readings(phase, step, t);
  const answering = data.answer >= 0;
  const answered = data.answer >= count(t.answer);

  const thought = id => data.thoughts[id] >= 0 && <Thought key={`thought-${id}`} text={t.thoughts[id]} shown={data.thoughts[id]}>
    {id === 'terms' && <PolicyChip shown={data.policyShown}>{t.policy}</PolicyChip>}
  </Thought>;
  const call = id => data.tools[id] && <ToolCall key={`${id}-call`} {...TOOLS[id]} state={data.tools[id]} result={t.results[id]}
    rows={id === 'affinity' ? t.affinityRows : undefined} />;

  return <div className={m.app} data-phase={phase}>
    <ProductBar section={t.agents} title={t.title}>
      <span className={m.grounded}><Pill icon={Database}>{t.grounded}</Pill></span>
      <Pill icon={ShieldCheck} tone="ok">{t.guard}</Pill>
    </ProductBar>

    <div className={m.body}>
      <AgentChat composer={<Composer placeholder={t.ask} toggle={t.toggle} />}>
        <MessageBubble initials="VG" head={t.who}>{t.request}</MessageBubble>
        {data.index >= 1 && <AgentTurn name={t.title}>
          <Reasoning open={!answering} label={t.reasoning} clock={data.clock} closed={t.reasoned}
            trail={<>{Object.values(TOOLS).map(({ name }) => <TrailItem key={name}>{name}</TrailItem>)}<TrailItem policy>{t.policy}</TrailItem></>}>
            {thought('affinity')}
            {call('affinity')}
            {thought('markdown')}
            {call('markdown')}
            {thought('terms')}
            {call('terms')}
          </Reasoning>
          {answering && <Answer text={t.answer} shown={data.answer} complete={answered} sources={t.sources} actions={t.actions} />}
        </AgentTurn>}
      </AgentChat>

      <article className={m.plan} data-status={answered ? 'ready' : 'drafting'}>
        <header className={m.planHead}>
          <span className={m.planIcon}><CalendarRange strokeWidth={1.9} /></span>
          <span className={m.planTitle}><b>{t.plan}</b><span>{t.planSub}</span></span>
          <Pill tone={answered ? 'ok' : 'idle'}>{answered ? t.ready : t.drafting}</Pill>
        </header>

        <section className={m.block} data-ready={data.ready.clusters} data-section="clusters">
          <small>{t.clusters}<span>{t.clustersMeta}</span></small>
          <svg viewBox="16 4 268 98" className={m.bubbles} aria-hidden="true">
            {CLUSTERS.map(({ tone, cx, cy, r, items }, c) => <g key={c} data-tone={tone}>
              <circle cx={cx} cy={cy} r={r} className={m.cluster} />
              {items.map(([product, x, y, size], i) => <g key={i} className={m.item} style={{ '--i': c * 2 + i }}>
                <circle cx={x} cy={y} r={size} />
                {product && <text x={x} y={y + 2.3}>{t.products[product]}</text>}
              </g>)}
            </g>)}
            <text x="104" y="14" className={m.lift}>3.2×</text>
          </svg>
          <span className={m.clusterKey}>
            {t.clusterNames.map((name, i) => <span key={name} data-tone={['rain', 'summer', 'quiet', 'quiet'][i]}><i />{name}</span>)}
          </span>
        </section>

        <section className={m.block} data-ready={data.ready.markdown} data-section="markdown">
          <small>{t.markdown}<span>W26–W32</span></small>
          <div className={m.schedule}>
            <span className={m.weeks}><span /><span className={m.weekCols}>{WEEKS.map(week => <span key={week}>{week}</span>)}</span></span>
            {t.lines.map(([name, units], i) => <span key={name} className={m.line}>
              <span className={m.lineName}><b>{name}</b><span>{units}</span></span>
              <span className={m.steps}>
                {STEPS_BY_LINE[i].map(([from, to, cut], j) => <i key={cut} data-cut={cut} style={{ gridColumn: `${from} / ${to}`, '--j': i * 3 + j }}>−{cut}%</i>)}
              </span>
            </span>)}
          </div>
          <span className={m.outcome}>
            <span>{t.sellThrough} <b>41% → 86%</b> {t.by}</span>
            <span>{t.margin} <b>39.2%</b> · {t.floor}</span>
          </span>
        </section>

        <section className={m.block} data-ready={data.ready.terms} data-section="terms">
          <small>{t.terms}</small>
          <div className={m.paper}>
            <span className={m.paperHead}><b>{t.amendment}</b><em>{t.draft}</em></span>
            <ol className={m.clauses}>
              {t.clauses.map(([label, parts], i) => <li key={label} style={{ '--i': i }}>
                <b>{label}:</b>{' '}
                {parts.map(([kind, text], j) => (kind === 'del' ? <del key={j}>{text}</del> : kind === 'ins' ? <ins key={j}>{text}</ins> : <span key={j}>{text}</span>))}
              </li>)}
            </ol>
            <span className={m.sign}>{t.sign}</span>
          </div>
        </section>
      </article>
    </div>
  </div>;
}
