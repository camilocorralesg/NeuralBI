---
name: NeuralBI
description: Enterprise AI-Native Architecture & Business Intelligence Blueprint
colors:
  paper: "#000000"
  surface-1: "#121212"
  surface-2: "#1a1a1a"
  ink-primary: "#ffffff"
  ink-secondary: "#a1a1aa"
  ink-tertiary: "#71717a"
  accent: "#c6ff34"
  accent-hover: "#d4ff66"
  accent-ink: "#000000"
  border-subtle: "#27272a"
  accent-ai: "#6366f1"
  accent-ai-hover: "#818cf8"
  accent-telemetry: "#38bdf8"
  accent-telemetry-deep: "#0ea5e9"
  identity-power-bi: "#f2c811"
  identity-power-apps: "#e7a2cd"
  identity-power-automate: "#9bc5ec"
  identity-copilot-studio: "#a2d8c1"
  ink-tertiary-lifted: "#85858e"
  signal-amber: "#ffb547"
  signal-red: "#ff6a55"
  mockup-text: "#eef2ea"
  mockup-text-2: "#a0a99b"
  mockup-text-3: "#8f9889"
  mockup-olive: "#8fae63"
  mockup-moss: "#4f6641"
  mockup-raised: "#141915"
  mockup-sunken: "#0c0f0d"
  mockup-on-accent: "#0b0e0c"
  mockup-paper: "#f2f5ec"
  mockup-paper-ink: "#1c2119"
  mockup-paper-ink-2: "#56604f"
  mockup-paper-ink-3: "#7a8473"
  mockup-paper-rule: "#d6ddcb"
  mockup-land: "#161d17"
  mockup-land-edge: "#26302a"
  device-graphite-hi: "#313931"
  device-graphite: "#1c211d"
  device-graphite-lo: "#0d100e"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(2.5rem, 5vw + 1rem, 5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(2rem, 3vw + 1rem, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title-italic:
    fontFamily: "DM Sans, sans-serif"
    fontStyle: "italic"
    fontWeight: 300
    color: "#c6ff34"
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  ui:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontWeight: 600
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
  logotype:
    fontFamily: "Absolut, DM Sans, sans-serif"
    fontWeight: 500
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
  pill: "9999px"
  mockup-xs: "0.2em"
  mockup-sm: "0.4em"
  mockup-md: "0.6em"
  mockup-lg: "0.85em"
  mockup-xl: "1em"
  mockup-window: "1.3em"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "14px 36px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  card-glass:
    backgroundColor: "{colors.surface-1}"
    rounded: "{rounded.lg}"
    padding: "24px 24px"
  nav-pill:
    backgroundColor: "{colors.surface-1}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
---

# Design System: NeuralBI

## 1. Overview

**Creative North Star: "The Autonomous Blueprint"**

NeuralBI is an enterprise architecture platform engineered to communicate precision, velocity, and cognitive power. Rejecting the bland, generic conventions of legacy corporate IT consulting (such as Accenture or Deloitte) and disposable cookie-cutter SaaS templates, NeuralBI adopts an unapologetic dark obsidian foundation with tactile glassmorphism, physical inset lighting, and high-voltage accents.

The interface functions as a precision telemetry instrument. It synthesizes architectural schematics, 2D blueprint graphics, and live data telemetry into an environment that feels both industrial and extraordinarily refined. Density is balanced: hero elements and typographic headings command sweeping scale (`clamp()` fluid curves with up to 5rem impact), while analytical widgets, architecture cards, and status pills retain the micro-precision of a mission-control console.

Every surface is anchored in absolute black (`#000000`) rather than desaturated slate or muddy gray. Visual hierarchy is achieved through meticulous surface layering (`#121212`, `#1a1a1a`), 24px backdrop blur filtration, 1px perimeter highlight borders, and physical inset bevel shadows reminiscent of the Raycast design ethos. Motion is snappy and deterministic (`cubic-bezier(0.16, 1, 0.3, 1)`), reinforcing a sense of zero-latency execution.

**Key Characteristics:**
- **Obsidian Foundation:** Deep true-black backdrops with high-contrast, pure-white typographic hierarchy.
- **Physical Inset Bevels:** Multi-layered box shadows with top-edge specular highlights (`inset 0 1px 0 rgba(255, 255, 255, 0.8)`) creating physical depth without visual clutter.
- **Electric Volt Accents:** Strategic deployment of high-chroma volt lime (`#c6ff34`) reserved exclusively for primary actions, active telemetry states, and core ROI indicators.
- **Cognitive Secondary Accents:** Neural Indigo (`#6366f1`) for AI reasoning flows and Mesh Cyan (`#38bdf8`) for real-time telemetry and Fabric data connections.
- **Two Motion Curves, No Overshoot:** Entrances, exits and feedback ease out on `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`); what travels across the screen uses `--ease-in-out` (`cubic-bezier(0.77, 0, 0.175, 1)`). Nothing eases in, nothing bounces, everything pressable answers with `scale(.96)`, loops pause offscreen, the visitor's reduced-motion setting is followed, and nothing fades or rises in as the page scrolls: content is in place, and only motion that carries information moves (see Motion).
- **Tactile Bento Glassmorphism:** Translucent dark container cards (`rgba(10, 10, 10, 0.45)`) with 24px backdrop blur, subtle noise grain, and delicate perimeter glow.

---

## 2. Colors

The NeuralBI palette is a high-contrast dark scheme built on an absolute black canvas, punctuated by a razor-sharp electric volt accent and specialized technical telemetry hues.

### Primary
- **Volt Lime** (`#c6ff34`): The signature brand signifier. Used with deliberate restraint on primary call-to-action buttons, high-impact hover states, active live nodes, and conversion targets. It conveys immediate computational velocity.
- **Volt Lime Hover** (`#d4ff66`): Lightened state for immediate physical responsiveness on hover.

### Secondary
- **Neural Indigo** (`#6366f1` / `#818cf8`): Represents cognitive computation, autonomous agents, and internal reasoning models. Applied to copilot nodes, neural pipeline streams, and secondary graphic indicators.
- **Mesh Cyan** (`#38bdf8` / `#0ea5e9`): Represents real-time telemetry, Power BI semantic models, Azure infrastructure, and live database synchronizations. Available as the `--color-telemetry` token.

### Neutral
- **Deep Obsidian Paper** (`#000000`): The ground plane. Pure black foundation ensuring maximum dynamic range, energy efficiency on OLED displays, and theatrical contrast.
- **Surface Elevation 1** (`#121212`): Elevated cards, bento modules, and floating navigation container canvas.
- **Surface Elevation 2** (`#1a1a1a`): Inner inset panels, code telemetry blocks, and subtle card partitions.
- **Ink Primary** (`#ffffff`): Pure white, allocated exclusively to primary headlines and key values.
- **Ink Secondary** (`#a1a1aa`): Zinc-400 neutral for explanatory paragraphs, feature descriptions, and subtitle copy.
- **Ink Tertiary** (`#71717a`): Zinc-500 neutral for metadata tags, footer copyright, and deactivated node strokes.
- **Subtle Border** (`#27272a`): 1px structural container boundary maintaining container definition against the dark background.
- **Glass Border** (`rgba(255, 255, 255, 0.08)`): Faint specular boundary on glass panels and bento cards.

### Illustration & Product Palettes
- **Signal Amber & Red** (`signal-amber`, `signal-red`): Inside the product mockups, **Signal Amber** (`#ffb547`, `--mk-amber`) marks risk, discrepancies and pending attention; **Signal Red** (`#ff6a55`, `--mk-red`) is kept for faults, defects, sanctions and blocked states. Neither is ever decorative.
- **Product Mockup Palette** (`mockup-*`, `device-graphite-*`): The 2D product mockups (`components/mockups/`) carry their own graphite UI tokens as `--mk-*` on `MockupStage`: three text steps, raised and sunken wells, the dark ink that sits on lime, and a printed-document set (`mockup-paper` and its inks) used only for documents and labels depicted inside a product, never as a page or section background.

### Named Rules

**The Token-Only Mockup Rule.** Mockup and illustration CSS reference `--mk-*` / `--sc-*` tokens or `color-mix()` of them with pure black or white; a new literal hex inside a mockup is drift. Add the token first, then use it.

**The 10% Volt Rule.** The primary accent (`#c6ff34`) must never occupy more than 10% of any given viewport. Its power comes directly from its scarcity against the deep obsidian field. If the whole screen glows, nothing is actionable.

**The True Black Foundation Rule.** Surfaces must never default to charcoal, slate blue, navy, or desaturated brown as background canvas. The ground is `#000000`. Backgrounds with beige, cream, or sand tones are strictly forbidden.

**The Atmosphere Rule.** The ground stays `#000000` wherever two sections meet. Inside a section, `SectionAtmosphere` may lift the middle band to a tinted obsidian (no lighter than `oklch(0.16 0.02 128)`) with one soft Volt focus and one quieter Mesh Cyan focus, dissolving back to pure black at both edges. It is static by design (one paint, no scroll cost) and never carries content contrast on its own.

**The Aurora Rule.** Motion in a backdrop is reserved for `AuroraField`, the hero's light reprised as a liquid, grained gradient: one Volt streak on the hero's diagonal and two blooms welling up from the lower corners, breathing against each other on an 18 s swell. Most of the band stays black; the light lives at the edges and behind opaque surfaces. At most two Aurora sections per page (Unified Delivery and the ROI instrument), never adjacent to each other or to the hero. It renders in WebGL at half resolution and 30 fps, pauses offscreen and in hidden tabs, ignores the pointer, paints one still frame under reduced motion and falls back to a static CSS gradient without WebGL. Content on top must sit in a clearing (a radial black shade under the copy, a deeper one under any illustration), and text contrast is measured against the brightest moment of the swell, not the average. An **Aurora stage** is not a section: the light framed inside a bordered panel within the content width (the Industries `MockupStage`, the Manifesto field). Its light never reaches the section band or the page edges, so a stage may sit next to the hero; one stage per section.

**The Quiet Text Floor.** Ink Tertiary (`#71717a`) lands at ~4.4:1 on black, below AA for small text. Labels under 18px that use it must lift to `#85858e` (5.8:1); The Arsenal does this by overriding `--color-ink-3` at section scope, and the product mockups set their tertiary text to `#8f9889` (6.1:1 on the graphite window). Plain Ink Tertiary stays for strokes, dividers and inactive node rings.

**The Functional Chromatic Separation Rule.** Green/Volt represents action and velocity; Indigo represents AI logic; Cyan represents enterprise telemetry and data structure. Accents must never be mixed purely for decorative novelty.

**Product identity accents.** Power BI (`#f2c811`), Power Apps (`#e7a2cd`), Power Automate (`#9bc5ec`), and Copilot Studio (`#a2d8c1`) identify their product and illustration. Within The Arsenal section and its detail modals, navigation and action controls use the current product accent with the hero button's dark core, rounded geometry, and luminous edge. Inactive controls keep a quiet edge; the stronger response belongs to selection, hover, and focus. Actions elsewhere on the site remain Volt Lime.

---

## 3. Typography

The typographic system is aligned with the **NeuralNet** design ecosystem, pairing the modernist, confident geometry of **DM Sans** for display headings and for every control (buttons, navigation, tabs) with the legibility and human clarity of **Inter** for body text, and **JetBrains Mono** for engineering telemetry, labels, and code metrics. Montserrat was retired on 2026-11-06 in NeuralBI and NeuralNet: a third sans next to DM Sans and Inter added weight and no contrast.

**Display Font:** DM Sans (Weights: 600, 700, 800; Fallback: `system-ui, sans-serif`)  
**Editorial Accent Italic:** DM Sans Italic (Weight: 300; Color: `#c6ff34` Volt Lime; Fallback: `sans-serif`)  
**Body Font:** Inter (Weights: 400, 500; Fallback: `system-ui, sans-serif`)  
**UI / Button Font:** DM Sans (Weights: 500, 600, 700; `--font-ui` and `--font-button` point at the display face; Fallback: `system-ui, sans-serif`)  
**Monospace Font:** JetBrains Mono (Weights: 400, 500, 600; Fallback: `ui-monospace, SFMono-Regular, monospace`)  
**Branded Accent Font:** Absolut, only for the footer's NeuralBI signature, shipped as the seven letters it sets (`public/assets/fonts/AbsolutMedium-signature.woff2`, about 2 KB, subset from `AbsolutMediumReduced.ttf` with fonttools; re-subset it if the signature's text changes).

**Character:** Modernist, structural, and architectonic. Headings command visual authority with tight tracking (`-0.03em` to `-0.04em`); italic accents inject razor-sharp editorial energy in radiant Volt Lime; prose reads with effortless clarity; monospace telemetry grounds the design in real-time execution.

### Hierarchy

- **Display 1** (`weight: 800`, `clamp(2.4rem, 4.4vw, 4rem)`, `line-height: 1.08`, `letter-spacing: -0.03em`; phones `clamp(2.25rem, 10vw, 3.4rem)`): the hero headline, which names the category and the promise ("Microsoft data & AI consulting / *in production in weeks.*"), never a slogan. Each line wraps balanced. Under the action, one hard fact in quiet body type ("Technical blueprint in 5 business days · Mutual NDA before we see your data"), never a kicker.
- **Display 2 / Headline** (`weight: 600`, `clamp(2rem, 3vw + 1rem, 3.5rem)`, `line-height: 1.1`, `letter-spacing: -0.03em`): Section headings across the bento grid and methodology phases.
- **Display 3 / Title** (`weight: 600`, `1.5rem` (24px), `line-height: 1.2`, `letter-spacing: -0.02em`): Bento card titles, feature headers, and modal headings.
- **Editorial Italic Accent** (`weight: 300`, `font-style: italic`, `color: #c6ff34`, `letter-spacing: -0.03em` to `-0.04em`): Key words and punchlines in titles (`<em>`, `.title-italic`, `.font-editorial`).
- **Body Large** (`weight: 400`, `clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)`, `line-height: 1.6`): Subtitles, introductory thesis statements, and hero supporting copy. Maximum line length 65ch.
- **Body** (`weight: 400`, `1rem` (16px), `line-height: 1.5`): General body copy, feature explanations, and architectural descriptions.
- **UI / Button** (`weight: 600`, `0.875rem - 1rem`, `font-family: DM Sans` via `--font-ui`): Interactive controls, CTA buttons, tabs, and navigation links.
- **Label / Monospace** (`weight: 500`, `0.75rem` (12px), `line-height: 1.4`, `letter-spacing: 0.05em`, `text-transform: uppercase`): Section kickers (`> METHODOLOGY`), telemetry tags, phase counters (`01`, `02`), and terminal status indicators.

### Named Rules

**The NeuralNet Font Stack Rule.** Only fonts defined in the official NeuralNet stack (`DM Sans`, `Inter`, `JetBrains Mono`, `Absolut`) may be rendered. System defaults like Arial, Times New Roman, or legacy font pairings are forbidden.

**The Title Italic Lime Accent Rule.** Every title element formatted in italics (`<em>` or `.title-italic`) must render in `#c6ff34` (Volt Lime) with a lightweight weight of `300` and tight tracking (`-0.03em` to `-0.04em`). This creates a dynamic, high-contrast signature between the solid white bold display typeface and the radiant lime editorial emphasis.

**The Two Italics Rule.** Since 2026-11-08 the Volt italic appears in two titles only: the hero's promise ("in production in weeks.") and the closing call ("Let's put it to work."), the page's opening and its ask. Every section title between them is plain white: an italic word in all eight titles read as a template. A test guards it.

**The Section Title Rule.** Every section title is set at `--type-h2` (`clamp(2rem, 1.2rem + 2.2vw, 3rem)`), always a step under the hero's h1: 48px against 63px at 1440, 42 against 45 at 1024, 32 against 39 on a phone. A section title never outgrows the page's headline (the Arsenal's had reached 95px).

**The Plain Names Rule.** A heading or a navigation label names what the section holds: Why NeuralBI, Power Platform services, How we deliver, Integrations with your systems, Solutions by industry, Results, Frequently asked questions. The navigation follows the page's order (Services, Process, Integrations, Industries, Results). No metaphors (Manifesto, Arsenal, Protocol, Verticals) and no jargon (seamless, cognitive, zero friction, orchestrated, surgically precise, applied intelligence); a test scans both languages for it. Spanish addresses the reader as *usted* everywhere.

**The Light-on-Dark Breathing Rule.** Because light text on pure black visually bleeds slightly, body text (`--color-ink-2`) must always carry a minimum line-height of `1.5` to `1.6` and letter-spacing between `0` and `0.01em` to prevent typographic crowding.

---

## 4. Elevation

Depth in NeuralBI is conveyed through **tactile glassmorphism, physical inset lighting, and dark ambient occlusion** rather than heavy muddy drop shadows.

Surfaces do not float aimlessly in space; they behave like precision-machined glass plates recessed or elevated above an obsidian circuit chassis. Specular top-edge highlights simulate an overhead studio light, while backdrop blur grounds floating surfaces directly into the environment.

### Shadow Vocabulary

- **Raycast Specular Inset** (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.4)`): Applied to tactile chips and glass surfaces to create an authentic 3D beveled edge.
- **Volt Ambient Glow** (`box-shadow: 0 4px 16px rgba(198, 255, 52, 0.15)` at rest, `0 8px 32px rgba(198, 255, 52, 0.35)` on hover): Radiates energy beneath active buttons and hovered primary nodes.
- **Glass Panel Elevation** (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 12px 40px rgba(0, 0, 0, 0.5)`): Structural shadow on bento cards, floating navigation bar, and interactive dialogs.
- **Deep Occlusion Drop** (`box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3)`): Soft grounding shadow for interactive cards.

### Named Rules

**The Inset Edge Rule.** Every elevated or clickable surface (buttons, cards, floating pills) must feature an internal 1px specular highlight along its top border (`inset 0 1px 0 rgba(255, 255, 255, 0.1..0.8)`). This provides tangible physical clarity against true black without requiring thick borders.

**The State-Driven Glow Rule.** Ambient neon glow effects must never be statically pinned across every card simultaneously. Glows are reactive: they ignite in response to hover, cursor proximity, or live telemetry streaming. Action buttons are the exception by design: their liquid flows slowly, paused off screen and still under reduced motion (see Shader Button). Two panels may carry a travelling edge light (`EdgeBeam`): the ROI instrument and the closing CTA, a single comet each, resting off screen and under reduced motion. A selected or static state is drawn with an edge and a tint, never a halo: no coloured `box-shadow` without offset on a selection indicator, a status dot or a bullet (the Arsenal's rail indicator and capability dots, the cookie banner's dot), and no coloured `drop-shadow` on a headline.

**The Opaque Window Rule.** A product mockup window over the Aurora is opaque graphite (`rgba(18, 22, 19, .95)` to `rgba(10, 12, 11, .97)`) with no backdrop blur: blurring a WebGL field re-samples it every frame for an effect nobody can see behind a 95% surface.

**The Visible Glass Rule.** `backdrop-filter` goes only where light or motion actually passes behind the surface: the floating navigation and its language selector over the page, and the ROI and closing CTA panels over their light. Never over plain black (the FAQ cards), where it shows nothing and still costs a compositing layer. A surface that only needs to hide what is behind it (the mobile menu, the cookie banner) gets an opaque ground instead: a 92% ground without blur lets large white headlines ghost through.

---

## 5. Components

**The One Container Rule.** Every section after the hero sits in one container: `width: min(100% - 2 * var(--gutter), var(--container))` with `--container: 1320px` and `--gutter: clamp(20px, 3vw, 40px)`. Every section's content starts and ends on the same two lines (60px from the edge at 1440, 20px on a phone); a panel (the ROI, the closing call) sits on those lines and pads its own content. The hero is the one centred exception. Section headings sit on the left line; the FAQ sets its title and line in a left column beside the questions.

Components are engineered as self-contained precision modules. They share rounded pill geometries for controls and rounded 16px corners for bento containers.

### Buttons

- **Shader Button (every action button; after Framer's Shader Button, `components/ShaderButton.jsx`):**
  - **Shape:** Full pill (`var(--radius-pill)`), DM Sans 600, white label with a soft dark shadow (`0 1px 10px rgba(0, 0, 0, .55)`).
  - **Material:** A slow liquid glow of the button's tone inside a dark pill, with a visible film grain: a deep olive body, the tone gathering in one soft pool of light that drifts along the lower edge, never stripes. The pool covers about a third of the pill; outside it the liquid settles low in the olive body, so the tone never floods the button (measured: mean brightness 31–44 of 255, down from 47–75 in the first version). Under the label the light is capped at the olive middle of the ramp, so white text clears 7:1 in every frame. Over it, a soft inner glow of the tone in `hard-light` (11px, 40%) and a 2px white edge at 24%.
  - **Tone:** Volt by default; in The Arsenal, the product's own colour (`tone={tool.color}`). The palette is derived from the tone in four steps (a deep olive at 8% of the tone, a dark at 25%, a mid at 60%, the tone). When the tone changes, the liquid eases to the new palette in about half a second instead of jumping.
  - **Motion:** The liquid flows in every visible button (shader time 0.62 per second, 1.6× the first version; the pool of light crosses the pill in about 24 s), paused off screen and in hidden tabs, one still frame under reduced motion. **Hover** (fine pointers only): the liquid and the glow recede to 40% into the dark glass (0.4 s, `cubic-bezier(.4, 0, .6, 1)`), the edge brightens and the arrow slips out to the top right and back. **Press:** `scale(.96)`. **Disabled:** the liquid is dimmed to 25% and still. **Ready** (`data-ready`, a form that can be sent): full liquid and an edge tinted with the tone.
  - **Engine:** One WebGL context for the whole page (`components/liquidEngine.js`, shader in `liquidGradientRenderer.js`): each visible button is drawn into a corner of a shared offscreen canvas and copied into its own 2D canvas, 30 times a second, at a capped DPR of 1.5. Browsers cap live contexts (about sixteen), so one per button would not scale. Each button has a stable seed, so no two flow alike. The server's HTML, and browsers without WebGL, show a still CSS liquid in the same tone.
  - **Never:** a solid Volt fill with black text, a lift on hover, or a second WebGL context for a button. Tabs, accordions, the language selector and form controls are not action buttons and keep their own styles.

### Cards & Containers

- **Bento Glass Card:**
  - **Corner Style:** `border-radius: 16px` (`--radius-lg`).
  - **Background:** `rgba(10, 10, 10, 0.45)`, with `backdrop-filter: blur(24px)` only where light passes behind it (see The Visible Glass Rule).
  - **Border:** 1px border `rgba(255, 255, 255, 0.08)`.
  - **Internal Padding:** `24px` to `32px`.
  - **Hover Effect:** Border subtly shifts to `rgba(198, 255, 52, 0.2)` or `rgba(56, 189, 248, 0.3)`.

### Navigation

- **Floating Glass Pill (`.nav-n5`):**
  - **Shape:** Full pill (`border-radius: 9999px`), fixed position pinned top-center (`top: 24px; left: 50%; transform: translateX(-50%)`).
  - **Material:** Dark glass `rgba(10, 10, 10, 0.6)` with 24px backdrop blur and 1px border `rgba(255, 255, 255, 0.08)`.
  - **Links:** Muted text (70% white). On hover (fine pointers) or keyboard focus the label rolls: each letter lifts out of its line, 12 ms after the one before it (280 ms, `--ease-out`), while a white copy rises in from below; the other links step back to 45% opacity. The label is read once (a visually hidden copy); the two rolling faces are decorative. A press scales the link to `.96`. No pill, underline or magnetic pull.
  - **Outline and reading progress:** In the capsule the 1px border is a quiet white track (12% at rest, 24% under the pointer). The reading progress is traced on it: two 1.5px Volt strokes with a soft glow leave the bottom centre, climb round both ends and meet at the top centre as the page ends. The shape is measured (the capsule changes width on hover); the progress is a CSS scroll-driven animation (`animation-timeline: scroll(root)`) on `stroke-dashoffset`, with a passive scroll listener where the browser has no scroll timelines.
  - **Capsule morph:** Transitions name their properties (never `all`) and settle in 350 ms on `--ease-out`. It is a sanctioned layout transition (height, padding, the rails' `max-width`): measured on the production build, removing the transitions, the blur or the link hover leaves the hover frames unchanged, because the cost is the state change itself, so a transform (FLIP) version would add text-distortion correction for no gain.
  - **CTA Integration:** Embedded compact "Book a Call" Shader Button on the right flank.

**The One Action Rule.** The main action is "Book a Call" ("Agendar Llamada") and reads the same wherever it appears: the navbar, the mobile menu, the hero, the sticky mobile bar, the Arsenal's architecture modal (from the accordion) and the closing form's submit. Secondary links keep their own wording (Industries' "Design your architecture", the ROI's link to an architect).

### Inputs & Fields

- **Architecture Audit Form Input:**
  - **Style:** Dark solid background (`#121212`), 1px border (`#27272a`), radius `8px` (`--radius-md`), padding `12px 16px`.
  - **Text:** White input value (`#ffffff`), placeholder text in zinc-500 (`#71717a`).
  - **Focus State:** 1px outline in Volt Lime (`#c6ff34`) with `0 0 12px rgba(198, 255, 52, 0.2)` soft field glow.
  - **Error State:** Border shifts to coral red (`#ef4444`) with descriptive helper text below.

### Section Atmosphere (`components/SectionAtmosphere.jsx`)

- **Purpose:** Gives a dark section depth without a flat black field, and lets any two sections sit back to back without a seam.
- **Usage:** First child of a `position: relative; isolation: isolate` section. Props: `accent` and `secondary` (colors or tokens), `focus` and `secondaryFocus` (CSS positions), `strength` (0–1).
- **Rules:** One per section. Keep the default Volt + Mesh Cyan pairing unless a section has its own identity accent. Never animate it.

### Aurora Field (`components/AuroraField.jsx`, `components/auroraRenderer.js`)

- **Purpose:** An animated extension of the hero's light for the one section that should feel like a continuation of it (today: Unified Delivery). Where `SectionAtmosphere` is still air, the Aurora is slow light. Reference: Grainient's minimal luminous masses, reduced to one hue.
- **Usage:** First child of a `position: relative; isolation: isolate; overflow: hidden` section. Props: `accent` (default `var(--color-accent)`) and `intensity` (0–1).
- **Material:** A fragment shader warps the light with fbm noise and maps it through one ramp mixed from the accent: black → forest → olive → accent → pale accent. Geometry is measured in units of the section's shorter side, so the diagonal keeps the hero's slope on a phone column. Both seams fade to black inside the shader. A generated film-grain tile sits on top with `mix-blend-mode: overlay` (grain in the light, none in the black) and jitters in steps.
- **Lifecycle:** A field makes its WebGL context only when it comes within one screen of the viewport (`rootMargin: 100% 0px`, or at once when it is already there) and frees it when it goes further; it draws only while on screen. So only the fields near the reader hold a context, never all four at once. A field without WebGL, or a screen away, shows its still CSS fallback.
- **Rules:** See the Aurora Rule. The content it sits under provides its own clearing (`IntegrationsHub` shades the header and the scene stage). GLSL ES reserves words such as `half`, `input` and `filter`; a test guards the shader against them, because a compile error silently drops to the CSS fallback.

### Hero lines (`components/FloatingLines.jsx`, `components/linesRenderer.js`)

- **Engine:** One full-screen fragment shader on a bare WebGL renderer (one triangle, uniforms set by name). Until 2026-11-08 it ran on three.js, which the page loaded only for this quad (about 340 KB of JavaScript); three.js, `@react-three/*` and `ogl` are gone from the dependencies, and a test keeps them out.
- **Portable GLSL:** GLSL ES 1.00, so it compiles in WebGL 1 and 2: every loop counts to a constant (`MAX_LINES`, 32 lines a wave) and stops at its wave's count, and the gradient reads its stops at loop indices, never a computed one.
- **Lifecycle:** As the Aurora fields: a context within a screen of the viewport, none beyond; drawing pauses as soon as the lines leave the screen, and the shader's clock carries over when a context is remade.

### Cookie notice (`components/CookieBanner.jsx`, `components/ConsentAnalytics.jsx`, `lib/consent.js`)

- **Honest:** The site sets no cookies of its own (Vercel Web Analytics is cookieless; the language and the choice live in localStorage), so the notice is titled "Cookie-free analytics" and says in one sentence what is measured and what is not (no advertising, no cross-site tracking), with the privacy policy link.
- **Honoured:** Declining (the button or the ×) drops every analytics event from then on: `ConsentAnalytics` filters through `beforeSend`, reading the choice at send time. A test guards it.
- **Composition:** An opaque card bottom left (across the bottom inside the gutter on phones), a plain title (no eyebrow), the sentence, and two buttons of equal size, Accept and Decline: declining is as easy as accepting. It sits above the phone's sticky call to action while it is open (z-index 1000 against 990), so the bar never covers its buttons.

### Mobile navigation

- The menu is a plain list of the five sections, no numbers. Validated on a touch phone (390×844): every link opens its section with the heading clear of the bar, closes the menu and gives the page its scroll back; the hero's and the sticky bar's Book a Call reach the form; the Arsenal row tapped stays under the finger.

### Loading screen (`app/loading.jsx`, `components/intro/LogoForming.jsx`)

- Every wait shows the NeuralBI logo forming, with the intro's own geometry and order of events: the nodes land, the branches draw, the symbol slides left and the wordmark rises beside it, then the lockup holds, fades and forms again for as long as the wait lasts (a 3.2 s loop). It is CSS alone, so it plays before hydration; under reduced motion the finished logo rests. Never a text loader.

### The Manifesto (`components/sections/Manifesto.jsx`, `components/graphics/ManifestoScenes.jsx`)

- **Purpose:** Why NeuralBI over traditional IT consulting, in three promises read in five seconds. Until 2026-11-08 it was three identical cards (icon, title, a bolded paragraph, a scene with its own title and a before → after caption), about 150 words with a lavender and a cyan card, and looked apart from the rest of the site.
- **Composition:** A header (the plain title, Why NeuralBI, on the left, one line of subtitle on the right, as in the Arsenal) over one **field**: a black panel (`--radius-lg`, a hairline border that takes a Volt tint and the pointer-lit ring of the site's panels under a fine pointer) holding a single `AuroraField` (intensity .95, Volt) behind the three promises. No cards. Each promise is its isometric scene, a title and one line, no icon and no bold.
- **Light:** An Aurora stage (see the Aurora Rule), so it may follow the hero. The copy sits in a clearing: on desktop the promises share two rows through subgrid (scenes, copy) and the copy row is the field's measured clearing (`clearRef`, an empty, hidden span laid on the grid lines); a soft radial shade under each block finishes it, so the lines keep at least 4.5:1 at the brightest moment of the swell (measured 5:1).
- **Scenes:** All three take Volt: one field, one light (Neural Indigo stays with the blueprint graphics). They tell their story without words on screen: their name, the before → after they show and the full description are read to assistive technology only. An 8 s cycle with the resolved state held; every offset is written in seconds of the original 12 s score (`--s`), so beats keep their place at any pace. They pause off screen, rest on their outcome under reduced motion, and a fine pointer over a promise raises its scene 7px and lights it from within (a brighter pool on its floor, a clearer grid, a little more brightness on the drawing), never with a halo and without interrupting its story.
- **Copy:** At most 65 words for the subtitle, the three titles and the three lines (a test counts them in both languages).
- **Layout:** Three columns from 1024px; a promise per row (scene beside copy, the copy column as the clearing) on tablets; one column on phones, where the light keeps to the field's edges.

### The Arsenal Console (`components/sections/ArsenalConsole.jsx`)

- **Purpose:** The four Power Platform products on desktop, without walking the visitor through them. Until 2026-11-07 the Arsenal was a pinned scroll story of twelve stops (four products × three chapters, about nine screens); visitors could not skip it. The console fits the section on one 1440 × 900 screen and lets the visitor choose.
- **Composition:** One dark glass panel (`--radius-lg`, a 1px specular top edge, the film-grain tile, a faint corner light in the product's colour) with the pointer-lit ring of the Manifesto field and the FAQ cards. A rail of the four products (logo tile and name only) on the left, a bar above the product below 1200px. Beside it, the product's title and a segmented chapter control (The proposition · Capabilities · The difference, words only) over the chapter's copy, with the chapter's scene holding the whole right column on a floor of the product's light.
- **No numbers or subheaders.** No indexes, counters, breadcrumbs, scene captions, specs lines or subtitles inside the console, and no full-architecture button: everything the modal held is in the console's chapters (the modal stays for the accordion).
- **Colour:** `--tool-accent` is the active product's colour (a registered property, so it eases over 0.6 s): the rail indicator's edge and tint, the chapter thumb, the outcome figure, the chip and claim dots, the ring and the stage light. Selection is an edge and a tint, never a halo.
- **Behaviour:** An ARIA tab pattern with automatic activation and roving focus: the arrows along the rail move between products, ← → between chapters, Home and End to the ends. The chapter stays when the product changes, so products can be compared chapter by chapter. One indicator glides on the rail and one thumb in the chapter control (springs with a damping ratio above .9).
- **Stability:** Every title and every chapter panel of every product share one grid cell, so the console keeps the height of the longest and never jumps; inactive ones are `aria-hidden` and `inert`. Only the active scene is mounted; it cross-fades through a 2px blur (420 ms in, 240 ms out).

### Unified Delivery (`components/sections/IntegrationsHub.jsx`)

- **Layout:** No container card. The section title on the left line (Integrations with your systems) and a lede that names the real sources, capped at 62ch, above a stage framed by four hairline registration marks, the blueprint's crop marks, around the `UnifiedDeliveryScene`. Nothing sits under the picture at rest: the role of a source or a deliverable appears under it only while that node is explored (hover or focus), as its accessible description.
- **Sources:** SAP ERP, Salesforce CRM, Azure SQL Database, Oracle Database, HubSpot CRM and Microsoft Fabric (OneLake), each with its real brand mark in its own colours (`public/assets/integrations`: CC0 drawings from gilbarbara/logos and Simple Icons, and the Fabric mark supplied by the client). An icon mark (Salesforce, Azure, HubSpot, Fabric) sits in a 19px slot beside the full name, drawn on its whole canvas (never a crop that cuts the mark); a wordmark-only brand (SAP, Oracle) is named by its wordmark, with the brand in its alt text ("[SAP] ERP"). The phone layout's grouped nodes keep plain glyphs: each stands for several systems. The footer states that product names and logos are trademarks of their owners.
- **Scene:** The 14 s delivery clock and its keyframes are the illustration's own; the section never restyles them. A deliverable waiting for its turn rests at 60% opacity, never lower, so its name (a button) still clears 4.5:1; it lights to full when its delivery lands.

### Protocol Run (`components/sections/NeuralProtocol.jsx`)

- **Pattern:** A real, ordered sequence rendered as an `<ol>`. On desktop the statement and a navigable phase index stay pinned on the left while the phases scroll past on the right; on tablet and phone the intro scrolls away and the run keeps its left rail.
- **Signal:** A vertical track runs from the first to the last phase node (measured from the DOM). Its fill follows a fixed reading line at 58% of the viewport; a phase lights (node, label number, scene opacity, soft conic light and floor pool) the moment its heading crosses that line, and the index marks it with `aria-current="step"`.
- **Order inside a phase:** node + label, heading, description, then the scene, so each scene enters already lit.
- **Reduced motion:** Every phase renders lit, the track is full and the pulse is removed.

### Product Mockups (`components/mockups/`)

- **Purpose:** The Industries section shows each solution as the NeuralBI product it ships, not as an abstract diagram: all sixteen cards are product mockups and the section has no isometric scenes. Each card is a 2D HTML/CSS product UI with the NeuralBI mark, telling one short, looping business story (PO #4821 MEX → COL for Supply Chain, Line 2 at Polímeros del Norte for Manufacturing, Andina Retail's stores for Retail).
- **Placement:** On desktop the product sits beside the story, sticky. On one column (≤900px) it sits inside the accordion, under the open answer, and rests hidden (still mounted) when every answer is closed.
- **Stage:** `MockupStage` keeps one `AuroraField` mounted across cards and frames the product either as a graphite `window` or as bare `devices` (phone, tablet, rugged tablet). The window re-keys per card so only the product replays its entrance.
- **Product voice:** Each Power Platform product is shown in its own idiom. Power BI is a dashboard; Power Apps is devices in the field; Power Automate is a flow designer with its run details, and the business systems each branch changes; Copilot Studio is an agent's reasoning: an event, a written request or a spoken question, thoughts, tool calls, a policy check and a cited answer. A workflow or an agent is never drawn as a dashboard.
- **Scale:** Everything inside a mockup is sized in `em` off a base that answers to the stage's width and height (`clamp(6px, min(1.8cqw, 2.15cqh), 12.5px)`, and `min(2.7cqw, 1.95cqh)` in the compact layout under 480px), so a product takes the largest size its stage allows and is never clipped. Radii follow the `mockup-*` steps (`--mk-radius-*`) rather than the pixel scale: `md` for controls and wells, `lg` for panels, `xl` for cards, `window` for the frame.
- **Readability:** No text inside a mockup is set below `.5em`, and the Industries layout gives the mockup the wider column (it scales with the stage). A product never drifts or bobs: perpetual transforms keep text on a composited layer at fractional offsets and soften it. It moves to enter, and the entrance leaves nothing behind.
- **Chrome:** Dashboards use `AppShell` (icon rail, search, period pill). Tools use `ProductBar` (mark, breadcrumb, the tool's own controls). Status pills are `Pill` with `ok` / `risk` / `idle` tones. Agents share `ui/agent` (`AgentChat`, `EventBubble`, `MessageBubble`, `VoiceBubble`, `Reasoning`, `Thought`, `ToolCall`, `PolicyChip`, `Answer`, `ReadAloud`, `Composer`), so every Copilot Studio agent reasons, folds and answers the same way; only the pane beside it (live context, the artefact it writes, or the sources it cites) is its own. Voice is shown as progress, never as a pulse: a question's waveform is revealed as it is heard, and a spoken answer's bars fill as its words land.
- **Storyline:** `useStoryline(beats, live)` walks the beats; `useBeatSteps` lands the work inside a beat (words, form fields, tool replies). Off-screen, paused or under reduced motion the mockup rests on its final, resolved state.
- **Rules:** No live pulses, blinking carets, shimmering "thinking" text or eyebrows. Motion is state change: a value lands, a node completes, a bar slides. A simulated cursor or fingertip appears only when a person would act; an autonomous flow or agent acts alone.

### ROI Instrument (`components/sections/Impact.jsx`)

- **Purpose:** "Results, in numbers" proves its figures instead of listing them. One glass panel: the statement, a lede tied to the three figures and a quiet link to talk to an architect on the left; on the right a ledger of three hairline rows of equal weight (7×, −65%, 25M+). No hero figure: a giant number over small supporting stats is the SaaS hero-metric template.
- **Figures:** One size for all three, white display digits in `tabular-nums`; the unit at `.5em`, weight 500, in Volt, the only colour in the number. Real signs, `×` (U+00D7) and `−` (U+2212). The digits are presentational: each row carries its full sentence for screen readers.
- **Proofs:** Minimal line instruments, one per figure, in a subgrid of figure and detail so every instrument starts on the same axis, and every stroke carries information. They are inline SVG in fixed-ratio boxes, with their labels in HTML (a legend of short strokes, or placed over the box) so text stays legible and translated at any width. One stroke weight (1.25, 1.5 for Volt): graphite for the old way, Volt for NeuralBI, faint white for axes and references; no fills, glows, gradients or stripes. 7×: one traditional cycle arching over the timeline while seven NeuralBI releases hop under it, each landing on a dot. −65%: cost running level, falling to what is kept and running on, a faint line carrying the old level, and a blueprint measure at the end labelled "Saved". 25M+: a 24-hour dial (taller marks every six hours) drawn round from 00 h, beside the rate the figure implies (≈ 290 rows a second). Every drawn stroke has `pathLength="1"` and draws with `stroke-dashoffset` (butt caps, never `vector-effect: non-scaling-stroke`, which breaks the dash). No figure keeps counting after it lands: that would read as live data the page does not have.
- **Motion:** The figures roll like an odometer (`Counter`): each digit is a reel of 0–9 that spins a few laps fast and slows onto its value on `--ease-out`, the ones digit last. It is pure CSS on the same clock as the proofs, keyed to each row's `data-count`: the server's HTML is resolved; a row off screen at hydration is armed (reels on 0, proofs at their start) and rolls once 60% of it is seen, each row 140 ms after the one above; a row already on screen, and every row under reduced motion, stays resolved. At rest the reel is untransformed, so the digits stay crisp.
- **Light and edge:** An Aurora section (the Aurora Rule) with the panel as its clearing: the light flows round the panel at full strength and dims beneath the glass, whose text clears 4.5:1 at the brightest moment of the swell. The panel is Bento glass without a drop shadow. One beam (`EdgeBeam`) travels its 1px edge: a Volt comet on the panel's measured outline (`offset-path: path(…)`, set by `EdgeBeam` through a ResizeObserver from `components/edgePath.js`, so it runs in every engine with motion paths, Safari 16+ included; `inset(0 round var(--radius-lg))` only until it is measured), 12 s a lap at a constant speed, its head echoed by a small, soft glow confined to a 16px band just inside the glass (a lit filament, never a cloud over the content); it rests while the panel is off screen and gives way to a still light at the top left under reduced motion or without motion-path support. A fine pointer also lights the ring where it is. The panel itself never tilts or moves.

### Closing CTA (`components/sections/FooterCTA.jsx`)

- **Composition:** One glass panel with the `EdgeBeam` and the pointer-lit ring, over `SectionAtmosphere` plus a still Volt light behind its lower-left and upper-right corners (faded to black before both seams). On the left the promise (the second line in the Volt italic) and its lede; on the right, across a hairline, the lead form.
- **Form:** Fields are glass wells (`--radius-md`, a Volt focus ring, Signal Red for errors, linked with `aria-describedby`); the submit is a Shader Button whose edge takes the tone once the form can be sent (`data-ready`); a confidentiality note with a lock icon sits under it. The bottom padding leaves room for the NeuralBI mark on the seam below.

### Footer (`components/sections/Footer.jsx`) and the NeuralBI mark (`components/NeuralMark.jsx`)

- **Horizon:** The footer rises from the CTA on a wide SVG arc: black above it, lifted obsidian below, a 1px rim that warms to Volt at the apex. The NeuralBI mark sits on the apex, half over each section, on a contained Volt halo.
- **The mark:** The logo's exact symbol (`components/intro/logoGeometry.js`, `choreography.js`). Resolved in the server's HTML; armed if it loads off screen, it assembles like the intro the first time half of it is seen (nodes light in order, branches trace out). Then it lives on a 6 s loop while on screen, building and taking itself apart: the nodes light in order and the branches trace out between them (0–1.1 s); the finished symbol holds while a pulse of light runs every branch (the main diagonal, then the uprights, then the two Vs), each node flashing as the pulse reaches it and the halo swelling with the wave (to 3.9 s); the branches erase in the direction they flow and the nodes go out on `--ease-in-out` (to 5.2 s); a breath of empty, and it gathers again. Pure CSS on one clock, paused off screen. Reduced motion keeps the finished mark, still.
- **Signature:** "NeuralBI" at the bottom as SVG text in Absolut with no fill: a 1.5px outline, white for "Neural", Volt for "BI", cropped by the page's end. It traces itself once when first seen (drawn in the server's HTML).

### Status Badges & Telemetry Pills

- **Monospace Micro-Tag:**
  - **Typography:** `JetBrains Mono`, 11px / 0.75rem, uppercase.
  - **Background:** `rgba(15, 17, 26, 0.85)` with 8px blur and 1px border in subtle accent tone.
  - **Indicator Dot:** 6px circular LED, lit and still, without a halo. State is shown by color, never by a pulse.

---

## 6. Motion

Motion explains a change; it is never there to fill the screen or to make content arrive. Since 2026-11-06 nothing below the hero fades, rises, staggers or wipes in as it scrolls into view (an anti-slop audit found the same fade-up on every section, which made none of them stand out and the page feel slow). What moves carries information: the hero's lines, the ROI's odometer and proofs, the Protocol's reading line, the delivery clock, the Arsenal's transitions, the product mockups' stories and the NeuralMark. Anything used often (hover, tabs, accordions, presses) is quick and plain. When in doubt, leave it still.

### Tokens (`app/globals.css`)

| Tier | Duration | Curve | Used for |
|---|---|---|---|
| Micro | `--dur-press` 120 ms, `--dur-ui` 200 ms | `--ease-out` | Press `scale(.96)`, hover colour and borders, link roll (280 ms + 12 ms a letter) |
| Component | 200–280 ms | `--ease-out`; `--ease-in-out` for travel | Tabs (240 ms clip), panel swap (220 ms), accordion (280 ms), chapter crossfade |
| Section | `--dur-reveal` 700 ms | `--ease-out` | Retired for arrivals (nothing arrives on scroll); kept for the ROI's roll and proofs |
| Hero | `--dur-enter` 900 ms | `--ease-out` | The hero's lines, a page title |
| Ambient | seconds (6–42 s) | loops of their own | Aurora, the NeuralMark, the button liquid, the hero's lines |

- `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`): entrances, exits, feedback. `--ease-in-out` (`cubic-bezier(0.77, 0, 0.175, 1)`): movement across the screen. Nothing eases in, nothing is linear except scroll-linked parallax, nothing overshoots.
- Staggers: `--stagger-blocks` 80 ms orders the hero's entrance and the ROI rows; `--stagger-words` and the `--reveal-rise` travel tokens no longer drive any arrival.
- Small screens (≤768px) get half the hero's parallax.

### Technique

- CSS transitions for anything interactive (they can be interrupted mid-way); CSS keyframes or scroll-driven animations for anything predetermined (off the main thread); framer-motion only where the motion is dynamic (layout, scroll-linked values), and there with full `transform` strings rather than `x`/`y` where it can.
- What moves moves only `transform`, `opacity`, `clip-path` and SVG strokes, so it never shifts layout; `will-change` is set only while it runs.
- Every IntersectionObserver reads the **last** record of a batch: a fast scroll delivers several, and the first one is stale.
- Render output never branches on the reduced-motion setting during hydration (`useReducedMotionSafe`; `MotionConfig` switches to `user` once mounted).
- No magnetic pull, tilt, bounce or float on anything that carries text or an action.

### No arrivals

Section titles, copy, blocks, scenes and cards are rendered in their finished place and stay there: `<Reveal>` and `<CharacterReveal>` (`components/Reveal.jsx`, `components/CharacterReveal.jsx`) keep their props but no longer animate. `CharacterReveal` still renders a title's `*phrase*` as the Volt italic, with punctuation after it upright. The Manifesto's promises and the FAQ cards no longer rise one after another. `useReveal` (`data-count`) stays for the motion that carries information, such as the ROI roll and its proofs, which still arm off screen and play once when seen.

### Entrances for what is on screen at load

The hero's copy and the secondary pages (404, thank you, privacy, terms) enter with pure CSS utilities, so the server's HTML animates without waiting for JavaScript: `.enter` (a fade up, 700 ms) and `.enter-mask` (a title opening upward from its baseline, 900 ms), ordered by `--enter` (label 0, title 1, copy 2…) one block step apart. They hold their start only while they wait (`backwards`), and under reduced motion they do not run.

### Same picture in every engine (Safari and Chrome)

Checked on 2026-11-07 after the site looked different in Safari on a Mac.

- **Grain is a tile, never a filter.** Film grain comes from `public/assets/grain.png` (128px, grey, 6% alpha), never an SVG `feTurbulence` data URI: WebKit renders that noise with a different strength and contrast, and computes it on the CPU. The Aurora's own grain is a canvas-made tile too.
- **One global dither.** Chrome dithers CSS gradients; WebKit does not, so dark gradients band in Safari. `body::after` lays `public/assets/dither.png` (±2 levels of speckle on half the pixels) over the page, fixed and static: it breaks the bands and lifts pure black by about half a level, which no screen shows. WebGL fields dither inside their shaders.
- **Motion paths are measured.** `EdgeBeam` runs on a `path()` of the panel's measured outline; the beam and its still-light fallbacks are gated on `@supports (offset-path: path(…))`, not on basic shapes in motion paths.
- **WebGL is opaque.** Every context is created with `alpha: false` and writes alpha 1, so premultiplied-alpha differences between engines cannot change a colour; colours read from CSS are rasterised once to sRGB.
- **Vendor prefixes.** `backdrop-filter` and `mask` ship with their `-webkit-` twins (written for masks, added by the build for backdrop filters), which Safari 17 and earlier need.
- **Checking a device.** Open the page with `?diag` (`components/DiagnosticsGate.jsx` loads `components/RenderDiagnostics.jsx` only then): it reports the browser, reduced-motion and reduced-transparency settings, the measured frame rate (Low Power Mode caps it at 30), WebGL and its GPU, the CSS features above, and the state of every live effect (hero lines, Auroras, Shader Buttons, edge beams), with a Copy button. A Mac set to Reduce Motion shows every effect still by design.

### Smooth scroll (Lenis, `components/SmoothScroll.jsx`)

One Lenis instance (`lerp .1`) for fine pointers only; touch keeps native scrolling and reduced motion turns it off. Lenis is a chunk of its own, imported after the page is up and only where it will run: a phone never downloads it. Every programmatic scroll goes through `lib/smoothScroll.js` (`scrollToTarget`, `lockScroll`, `unlockScroll`), which falls back to native scrolling when Lenis is not running. Scrollers inside modals carry `data-lenis-prevent`. framer-motion's `useScroll` keeps reading the native position, so pinned stories and scroll-linked values stay exact.

### One signature per section

Sections share no arrival; each may keep at most one gesture of its own, and only one that carries information.

- **Hero:** the lines of light come on (1.6 s) as the headline rises line by line out of a mask (90 ms apart). The headline is one sharp layer at every width: no blurred base and no pointer spotlight, which left it blurred until hovered and on touch tablets; the copy follows at 360 ms and the action at 440 ms, all landed in about a second. On scroll the copy holds, then leaves on `--ease-in-out` while the parallax stays linear (half on small screens, none under reduced motion). The lines bend, shift and ripple only for a mouse or a pen (`components/heroPointer.js`); a finger never moves them, so on a phone or a tablet they keep their own flow and a touch is just a scroll or a tap.
- **Navbar:** the rolling link labels and the reading progress traced round the capsule's outline.
- **Manifesto:** the promises are in place in their field of light; each scene runs its own 8 s story; a mouse or a pen over a promise raises its scene and lights it without interrupting the story, and the field's edge lights where the pointer is. A finger never does either.
- **The Arsenal:** on desktop (1024px and up) one product console (see The Arsenal Console); its chapters and scenes cross-fade through a 2px blur, so two contents melt into one change, and the console's light follows the product. Nothing in it moves with the scroll. Below 1024px the four products are an accordion: each row is dark glass in its product's colour (logo tile, name, promise, a + that turns to ×), with no eyebrow, counter, chapter or entry numbers and no specs line: the proposition says the promise once, as the console does, and the long version stays in the full-architecture modal. One opens at a time, unfolding the whole product (proposition, capabilities, difference, each with its scene) on grid rows in 420 ms, its parts one block step apart; it folds away at once. The tapped row stays under the finger, a row opened in the lower half settles under the navbar, and a Close at the end returns to the row with focus on it. A product's scenes are built the first time it opens; the accordion's end opens the full architecture modal.
- **Protocol:** the phases light as they cross the reading line.
- **Unified Delivery:** the delivery clock runs; the stage is in place inside its crop marks.
- **Industries:** the selected tab is a lit copy of the tab row clipped to one cell; the clip slides (240 ms, `--ease-in-out`) and the colour travels with it. A new sector arrives in 220 ms through a 2px blur. On one column (≤900px) the product lives inside the open answer, right under its text: it unfolds downward through a clip (460 ms) and travels with whichever answer is opened (the same node, so its light keeps its WebGL context), and the row just tapped stays under the finger while the answer above folds away.
- **ROI:** the odometer roll and the proofs drawing themselves (see ROI Instrument).
- **FAQ:** answers open on `grid-template-rows`, the chevron turns on `--ease-in-out`, and the card's edge follows the pointer.
- **Closing CTA and Footer:** the travelling edge beam, and the NeuralMark's assemble-and-release loop.
- **Thank you page:** the confirmation check draws its stroke once its circle has arrived.
- **Case study** (built, not yet placed on the page): a representative, anonymised scenario. A quote that rises word by word beside a line instrument, with the figure rolling like the ROI.

### Named Rules

**The One Signature Rule.** No section arrives: its title, copy and visuals are in place. A section earns at most one gesture of its own, and only one that carries information (a roll that lands on a figure, a line that shows progress, a scene that tells its story). A new section picks from the vocabulary above or adds to it here.

**The Resolved First Rule.** The server's HTML is always the finished state. Motion only arms what loaded off screen, so a slow script, no script or reduced motion never leaves content hidden.

**The Legibility Rule.** Paragraphs arrive as blocks, never word by word; no scramble, rotation or bounce on text; legal and long-form documents stay still below their heading.

### What loads, and when (performance)

Measured on the production build, 2026-11-09: the home page's first load went from 329 kB to 199 kB of JavaScript (gzip, as `next build` reports it), its own bundle from 150 kB to 56 kB. Keep it there with these rules.

**The One Font Source Rule.** The three families come from `next/font` only (self-hosted, no third-party stylesheet, nothing render-blocking): DM Sans as one variable file with its optical-size axis and its italic, so a 5rem headline draws the 40pt cut and body copy the 14pt cut; Inter and JetBrains Mono as variable files. `app/globals.css` maps `--font-dm-sans`, `--font-inter` and `--font-jetbrains-mono` onto the `--font-*` tokens, and a token never refers to itself (`--font-sans: var(--font-sans, …)` turns the whole chain invalid and silently drops to whatever else is loaded). A test guards both.

**The Lazy Drawing Rule.** A drawing below the first two screens is a chunk of its own, fetched when its section comes within a screen of the viewport (`useNear` and `lazyModule` in `components/lazyModule.js`): the Arsenal's twelve scenes (the console asks on approach, the accordion and the modal when they open), the three "How we deliver" scenes and the sixteen Industries products (the open sector first, the rest when the browser is idle). What loads together is one chunk (`webpackChunkName`): the Arsenal scenes, the Protocol scenes, one per Industries sector, so shared code ships once per set. The copy, the headings and the stage are always in the server's HTML; the stage keeps its full size before the drawing arrives, so nothing moves and an anchor jump lands where it aims; a figure that carries a name keeps it (and its description) for a screen reader before the drawing arrives. This is the one exception to the Resolved First Rule, and it applies to drawings, never to copy. A drawing whose stage takes its height from its content (the Integrations diagram) stays in the bundle, and so do the Manifesto scenes, one screen under the hero.

**The Light Motion Rule.** Components render framer-motion's `m`, never `motion`; `components/MotionProvider.jsx` (`LazyMotion`, `strict`) loads the features (animation, gestures, in-view, exit, layout) as a chunk right after hydration. Until then an element holds the state the server drew, so nothing the first screen needs for legibility may depend on a framer entrance (the hero's text enters through CSS). A test fails on any `motion` import.

**The Copy on Demand Rule.** English ships with the page (the server renders it, every component falls back to it, `lib/translations.en.js`). Spanish (`lib/translations.es.js`) is a chunk fetched as the page boots for a visitor who reads Spanish (a saved choice or the browser's language), and on reaching for the language selector for everyone else (`lib/i18n.js`). The page switches only once the copy is there, never half translated. App code never imports `lib/translations.js` (both languages, for tests and tooling); a test guards it.

**The GPU Only Rule.** A WebGL effect (the hero's lines, the auroras, the Shader Buttons' liquid) draws only where a GPU draws it. Without one (Google's PageSpeed and Lighthouse servers, virtual machines, a blocklisted driver) Chrome hands out a context drawn on the CPU (SwiftShader), and a full-screen shader there freezes the page: on the live site, before this rule, PageSpeed Insights gave up with `DEADLINE_EXCEEDED` and a local Lighthouse run took 336 s with 66 s of blocking time. Every renderer gets its context from `hardwareContext` (`components/webglContext.js`), which asks with `failIfMajorPerformanceCaveat` and rejects a CPU renderer by name; the effect then keeps its still CSS fallback, which must always read as finished. A test guards it. Local headless Chrome uses the machine's GPU, so check the CPU path with `--use-angle=swiftshader --enable-unsafe-swiftshader`.

---

## 7. Do's and Don'ts

### Do:
- **Do** anchor all views in deep obsidian black (`#000000`) to preserve dramatic contrast.
- **Do** strictly limit Volt Lime (`#c6ff34`) to key interactive conversion triggers, active states, and critical ROI metrics.
- **Do** use multi-layered inset highlights on buttons and glass cards to maintain a tactile, physical quality.
- **Do** preserve the exact typography stack: DM Sans for display and controls, Inter for body, JetBrains Mono for telemetry tags, Absolut only for the footer signature.
- **Do** set running text at 16px or more (section lines, product propositions, answers, phase copy); labels, chips and figures inside mockups may be smaller.
- **Do** give every image its intrinsic `width` and `height` (unless its class sizes only one side) and `loading="lazy"` below the fold.
- **Do** ease entrances, exits and feedback on `--ease-out` and on-screen travel on `--ease-in-out`; framer-motion springs keep a damping ratio of at least 0.9 (no overshoot).
- **Do** animate only `transform`, `opacity`, `clip-path`, SVG strokes and short `filter: blur()` handoffs (4px at most, only while a reveal or a crossfade runs); position moving parts with a transformed layer, never with `top`, `left`, `width` or `height`. The layout transitions allowed are the FAQ answer's `grid-template-rows` (0fr → 1fr), which stays interruptible, and the navbar capsule's morph (see Navigation).
- **Do** pause every loop offscreen and in hidden tabs, and give every animation a reduced-motion state: CSS rests on the resolved frame, framer-motion follows `MotionConfig reducedMotion="user"`, and WebGL draws one still frame.
- **Do** write crisp, assertive engineering copy that speaks to enterprise directors and CTOs with concrete technical architectures.
- **Do** ensure interactive elements provide distinct `:hover`, `:focus-visible`, and `:active` states: hover only inside `@media (hover: hover) and (pointer: fine)` (a tap must not leave it stuck), and a press of `scale(.96)` (full-width rows and tab cells darken instead of scaling).
- **Do** test all copy and form fields against the mandatory automated test suite before committing code.

### Don't:
- **Don't** use light, cream, beige, or sand background palettes under any circumstances.
- **Don't** fall back to corporate IT consulting clichés (e.g., stock photos of handshakes, vague arrows, Accenture-style blue-gradient swooshes).
- **Don't** use standard Bootstrap or uncustomized Tailwind defaults.
- **Don't** splash neon colors indiscriminately across borders, backgrounds, and paragraphs.
- **Don't** introduce fonts outside the documented stack (no Sora, Manrope, Roboto, Fraunces, or Comic Sans).
- **Don't** use gradient text (`background-clip: text` over a gradient); headlines are solid white with a Volt italic accent.
- **Don't** use bounce or elastic easing (`cubic-bezier` with a value above 1, underdamped springs), or ease-in on anything the visitor is waiting for.
- **Don't** write `transition: all`; name the properties that change.
- **Don't** fade, rise, stagger or wipe content in as the page scrolls: a fade-up everywhere reads as a template and slows the page.
- **Don't** add live pulses, blinking indicators or perpetual motion on controls; the one exception is the Shader Button's slow liquid, which pauses off screen and rests under reduced motion.
- **Don't** float, bob or scale a surface that carries text in a loop; a perpetual transform leaves glyphs at fractional offsets and they read soft.
- **Don't** create flat, lifeless buttons without hover transitions, inset bevels, or tactile press feedback.
- **Don't** use monospace fonts for long body paragraphs; restrict monospace strictly to telemetry tags, code blocks, and micro-labels.
- **Don't** add decorative generic diagrams with fake controls or unstyled placeholders.
- **Don't** import a below-the-fold drawing, Lenis, the Spanish copy or framer's full `motion` statically; each has its chunk (see What loads, and when).
- **Don't** call `canvas.getContext('webgl…')` in an effect; ask `hardwareContext`, so a machine without a GPU gets the still fallback instead of a frozen page.
