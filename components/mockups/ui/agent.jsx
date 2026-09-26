'use client';

import React from 'react';
import { ArrowUp, Check, ChevronDown, Mic, ShieldCheck, Volume2 } from 'lucide-react';
import { LiveNumber, Mark, Words } from './primitives';
import a from './agent.module.css';

/* Agent primitives: how a Copilot Studio agent reads in the product mockups. The conversation is anchored to the
 * bottom like a thread; an event, a written request or a spoken question takes the user's place, the agent reasons in
 * the open (thoughts, tool calls, its policy), then folds that reasoning into a trail and answers with sources, aloud
 * when it was asked aloud. */

// Voice envelopes (bar heights, 0–1): what the engineer says, and the agent's spoken answer.
const HEARD = [.59, 1, 1, .78, .23, .6, .7, .52, .29, .31, .32, .32, .67, .83, .6, .35, .91, 1, .94, .47, .36, .51, .4, .2, .38, .36, .34, .78, 1, .92, .4, .61, .98, .92, .55, .22, .37, .27, .33, .54];
const SPOKEN = [.59, .8, .59, .37, .39, .46, .27, .53, .79, .65, .26, .62, .82, .6, .26, .26, .2, .29, .66, .98, .78, .3, .93, 1, .58, .29, .44, .36];

/** The conversation column: the thread (starts at the top, keeps the newest in view) and the composer under it. */
export function AgentChat({ composer, children }) {
  return <section className={a.chat}>
    <div className={a.threadBox}><div className={a.thread}><div className={a.threadInner}>{children}</div></div></div>
    {composer}
  </section>;
}

/** What set the agent off, in the user's place: an alert or an event from a feed. */
export function EventBubble({ icon: Icon, head, children }) {
  return <div className={a.event}>
    <span className={a.eventHead}><Icon strokeWidth={2} />{head}</span>
    <p>{children}</p>
  </div>;
}

/** A person's written request in the user's place: their initials, who they are and when, then what they asked. */
export function MessageBubble({ initials, head, children }) {
  return <div className={a.message}>
    <span className={a.messageHead}><i>{initials}</i>{head}</span>
    <p>{children}</p>
  </div>;
}

/** A spoken turn in the user's place: who, the voice revealed as it is heard, and its transcript word by word. */
export function VoiceBubble({ head, context, text, shown }) {
  const total = text.split(' ').length;
  const heard = Math.max(0, Math.min(shown, total)) / total;
  return <div className={a.voice}>
    <span className={a.voiceHead}><Mic strokeWidth={2} />{head}{context && <em>{context}</em>}</span>
    <span className={a.wave} style={{ clipPath: `inset(0 ${100 - heard * 100}% 0 0)` }} data-heard={heard >= 1}>
      {HEARD.map((height, i) => <i key={i} style={{ transform: `scaleY(${height})` }} />)}
    </span>
    <p><Words text={text} shown={shown} /></p>
  </div>;
}

/** The agent's turn: its mark and name, then its reasoning and answer. */
export function AgentTurn({ name, children }) {
  return <div className={a.turn}>
    <span className={a.agent}><Mark className={a.avatar} /><b>{name}</b></span>
    {children}
  </div>;
}

/** Reasoning in the open while `open` (with its clock); once the agent answers it folds into `closed` and the trail. */
export function Reasoning({ open, label, clock, closed, trail, children }) {
  return <div className={a.reasoning} data-open={open}>
    <span className={a.reasonHead}>
      <ChevronDown strokeWidth={2} />
      {open ? <>{label} · <LiveNumber value={clock} decimals={0} suffix=" s" /></> : closed}
    </span>
    <div className={a.fold}><ol className={a.steps}>{children}</ol></div>
    <span className={a.trail}>{trail}</span>
  </div>;
}

/** One entry of the folded trail: a tool the agent used, or (`policy`) the policy it checked. */
export function TrailItem({ policy = false, children }) {
  return <span data-policy={policy || undefined}>{policy ? <ShieldCheck strokeWidth={2} /> : <Check strokeWidth={3} />}{children}</span>;
}

/** A thought in plain language, landing word by word; `children` follow it (a policy chip). */
export function Thought({ text, shown, children }) {
  return <li className={a.thought}>
    <p><Words text={text} shown={shown} /></p>
    {children}
  </li>;
}

/** The policy the agent checked before acting, shown once its thought has landed. */
export function PolicyChip({ shown, children }) {
  return <span className={a.policy} data-shown={shown}><ShieldCheck strokeWidth={2} />{children}</span>;
}

/** A tool call: its name and arguments, then what came back (and, once done, any rows it returned). */
export function ToolCall({ icon: Icon, name, args, state, result, rows }) {
  return <li className={a.tool} data-state={state}>
    <span className={a.toolIcon}><Icon strokeWidth={1.9} /></span>
    <span className={a.toolText}><b>{name}</b><code>{args}</code></span>
    <span className={a.toolResult}>{state === 'done' ? <><Check strokeWidth={3} />{result}</> : '…'}</span>
    {rows && state === 'done' && <span className={a.rows}>{rows.map(row => <span key={row}>{row}</span>)}</span>}
  </li>;
}

/** The answer, word by word, then its numbered sources and what the agent did. */
export function Answer({ text, shown, complete, sources, actions }) {
  return <div className={a.answer} data-complete={complete}>
    <p><Words text={text} shown={shown} /></p>
    <span className={a.sources}>{sources.map((source, i) => <span key={source}><b>{i + 1}</b>{source}</span>)}</span>
    <span className={a.actions}>{actions.map(action => <span key={action}><Check strokeWidth={3} />{action}</span>)}</span>
  </div>;
}

/** The answer spoken aloud: the bars fill as its words are said; `label` names the state. */
export function ReadAloud({ progress, label }) {
  const lit = Math.round(Math.min(progress, 1) * SPOKEN.length);
  return <span className={a.readAloud} data-done={progress >= 1}>
    <Volume2 strokeWidth={2} />
    <span className={a.meter}>{SPOKEN.map((height, i) => <i key={i} data-lit={i < lit} style={{ transform: `scaleY(${height})` }} />)}</span>
    <b>{label}</b>
  </span>;
}

/** The composer: nobody is typing; the switch is on (autonomy, or hands-free voice). */
export function Composer({ placeholder, toggle, icon: Icon = ArrowUp }) {
  return <div className={a.composer}>
    <span className={a.ask}>{placeholder}</span>
    <span className={a.toggle}><i />{toggle}</span>
    <span className={a.send}><Icon strokeWidth={2.2} /></span>
  </div>;
}
