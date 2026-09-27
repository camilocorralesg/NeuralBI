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
    fontFamily: "Montserrat, system-ui, sans-serif"
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
- **Two Motion Curves, No Overshoot:** Entrances, exits and feedback ease out on `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`); what travels across the screen uses `--ease-in-out` (`cubic-bezier(0.77, 0, 0.175, 1)`). Nothing eases in, nothing bounces, everything pressable answers with `scale(.96)`, loops pause offscreen, the visitor's reduced-motion setting is followed, and every section enters with its own signature rather than one shared fade (see Motion).
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

**The Aurora Rule.** Motion in a backdrop is reserved for `AuroraField`, the hero's light reprised as a liquid, grained gradient: one Volt streak on the hero's diagonal and two blooms welling up from the lower corners, breathing against each other on an 18 s swell. Most of the band stays black; the light lives at the edges and behind opaque surfaces. At most two Aurora sections per page (Unified Delivery and the ROI instrument), never adjacent to each other or to the hero. It renders in WebGL at half resolution and 30 fps, pauses offscreen and in hidden tabs, ignores the pointer, paints one still frame under reduced motion and falls back to a static CSS gradient without WebGL. Content on top must sit in a clearing (a radial black shade under the copy, a deeper one under any illustration), and text contrast is measured against the brightest moment of the swell, not the average.

**The Quiet Text Floor.** Ink Tertiary (`#71717a`) lands at ~4.4:1 on black, below AA for small text. Labels under 18px that use it must lift to `#85858e` (5.8:1); The Arsenal does this by overriding `--color-ink-3` at section scope, and the product mockups set their tertiary text to `#8f9889` (6.1:1 on the graphite window). Plain Ink Tertiary stays for strokes, dividers and inactive node rings.

**The Functional Chromatic Separation Rule.** Green/Volt represents action and velocity; Indigo represents AI logic; Cyan represents enterprise telemetry and data structure. Accents must never be mixed purely for decorative novelty.

**Product identity accents.** Power BI (`#f2c811`), Power Apps (`#e7a2cd`), Power Automate (`#9bc5ec`), and Copilot Studio (`#a2d8c1`) identify their product and illustration. Within The Arsenal section and its detail modals, navigation and action controls use the current product accent with the hero button's dark core, rounded geometry, and luminous edge. Inactive controls keep a quiet edge; the stronger response belongs to selection, hover, and focus. Actions elsewhere on the site remain Volt Lime.

---

## 3. Typography

The typographic system is aligned with the **NeuralNet** design ecosystem, pairing the modernist, confident geometry of **DM Sans** for display headings with the legibility and human clarity of **Inter** for body text, the structural refinement of **Montserrat** for UI/buttons/navigation, and **JetBrains Mono** for engineering telemetry, labels, and code metrics.

**Display Font:** DM Sans (Weights: 600, 700, 800; Fallback: `system-ui, sans-serif`)  
**Editorial Accent Italic:** DM Sans Italic (Weight: 300; Color: `#c6ff34` Volt Lime; Fallback: `sans-serif`)  
**Body Font:** Inter (Weights: 400, 500; Fallback: `system-ui, sans-serif`)  
**UI / Button Font:** Montserrat (Weights: 500, 600, 700; Fallback: `system-ui, sans-serif`)  
**Monospace Font:** JetBrains Mono (Weights: 400, 500, 600; Fallback: `ui-monospace, SFMono-Regular, monospace`)  
**Branded Accent Font:** Absolut (`AbsolutMediumReduced.ttf`) for custom brand logotype assets.

**Character:** Modernist, structural, and architectonic. Headings command visual authority with tight tracking (`-0.03em` to `-0.04em`); italic accents inject razor-sharp editorial energy in radiant Volt Lime; prose reads with effortless clarity; monospace telemetry grounds the design in real-time execution.

### Hierarchy

- **Display 1** (`weight: 700/800`, `clamp(2.5rem, 5vw + 1rem, 5rem)`, `line-height: 1.1`, `letter-spacing: -0.04em`): Reserved for hero headlines ("Intelligence *That Executes*"). Uses tight tracking and maximum visual authority.
- **Display 2 / Headline** (`weight: 600`, `clamp(2rem, 3vw + 1rem, 3.5rem)`, `line-height: 1.1`, `letter-spacing: -0.03em`): Section headings across the bento grid and methodology phases.
- **Display 3 / Title** (`weight: 600`, `1.5rem` (24px), `line-height: 1.2`, `letter-spacing: -0.02em`): Bento card titles, feature headers, and modal headings.
- **Editorial Italic Accent** (`weight: 300`, `font-style: italic`, `color: #c6ff34`, `letter-spacing: -0.03em` to `-0.04em`): Key words and punchlines in titles (`<em>`, `.title-italic`, `.font-editorial`).
- **Body Large** (`weight: 400`, `clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)`, `line-height: 1.6`): Subtitles, introductory thesis statements, and hero supporting copy. Maximum line length 65ch.
- **Body** (`weight: 400`, `1rem` (16px), `line-height: 1.5`): General body copy, feature explanations, and architectural descriptions.
- **UI / Button** (`weight: 600`, `0.875rem - 1rem`, `font-family: Montserrat`): Interactive controls, CTA buttons, tabs, and navigation links.
- **Label / Monospace** (`weight: 500`, `0.75rem` (12px), `line-height: 1.4`, `letter-spacing: 0.05em`, `text-transform: uppercase`): Section kickers (`> METHODOLOGY`), telemetry tags, phase counters (`01`, `02`), and terminal status indicators.

### Named Rules

**The NeuralNet Font Stack Rule.** Only fonts defined in the official NeuralNet stack (`DM Sans`, `Inter`, `Montserrat`, `JetBrains Mono`, `Absolut`) may be rendered. System defaults like Arial, Times New Roman, or legacy font pairings are forbidden.

**The Title Italic Lime Accent Rule.** Every title element formatted in italics (`<em>` or `.title-italic`) must render in `#c6ff34` (Volt Lime) with a lightweight weight of `300` and tight tracking (`-0.03em` to `-0.04em`). This creates a dynamic, high-contrast signature between the solid white bold display typeface and the radiant lime editorial emphasis.

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

**The State-Driven Glow Rule.** Ambient neon glow effects must never be statically pinned across every card simultaneously. Glows are reactive: they ignite in response to hover, cursor proximity, or live telemetry streaming. Action buttons are the exception by design: their liquid flows slowly, paused off screen and still under reduced motion (see Shader Button). Two panels may carry a travelling edge light (`EdgeBeam`): the ROI instrument and the closing CTA, a single comet each, resting off screen and under reduced motion.

**The Opaque Window Rule.** A product mockup window over the Aurora is opaque graphite (`rgba(18, 22, 19, .95)` to `rgba(10, 12, 11, .97)`) with no backdrop blur: blurring a WebGL field re-samples it every frame for an effect nobody can see behind a 95% surface.

---

## 5. Components

Components are engineered as self-contained precision modules. They share rounded pill geometries for controls and rounded 16px corners for bento containers.

### Buttons

- **Shader Button (every action button; after Framer's Shader Button, `components/ShaderButton.jsx`):**
  - **Shape:** Full pill (`var(--radius-pill)`), Montserrat 600, white label with a soft dark shadow (`0 1px 10px rgba(0, 0, 0, .55)`).
  - **Material:** A slow liquid glow of the button's tone inside a dark pill, with a visible film grain: a deep olive body, the tone gathering in one soft pool of light that drifts along the lower edge, never stripes. The pool covers about a third of the pill; outside it the liquid settles low in the olive body, so the tone never floods the button (measured: mean brightness 31–44 of 255, down from 47–75 in the first version). Under the label the light is capped at the olive middle of the ramp, so white text clears 7:1 in every frame. Over it, a soft inner glow of the tone in `hard-light` (11px, 40%) and a 2px white edge at 24%.
  - **Tone:** Volt by default; in The Arsenal, the product's own colour (`tone={tool.color}`). The palette is derived from the tone in four steps (a deep olive at 8% of the tone, a dark at 25%, a mid at 60%, the tone). When the tone changes, the liquid eases to the new palette in about half a second instead of jumping.
  - **Motion:** The liquid flows in every visible button (shader time 0.62 per second, 1.6× the first version; the pool of light crosses the pill in about 24 s), paused off screen and in hidden tabs, one still frame under reduced motion. **Hover** (fine pointers only): the liquid and the glow recede to 40% into the dark glass (0.4 s, `cubic-bezier(.4, 0, .6, 1)`), the edge brightens and the arrow slips out to the top right and back. **Press:** `scale(.96)`. **Disabled:** the liquid is dimmed to 25% and still. **Ready** (`data-ready`, a form that can be sent): full liquid and an edge tinted with the tone.
  - **Engine:** One WebGL context for the whole page (`components/liquidEngine.js`, shader in `liquidGradientRenderer.js`): each visible button is drawn into a corner of a shared offscreen canvas and copied into its own 2D canvas, 30 times a second, at a capped DPR of 1.5. Browsers cap live contexts (about sixteen), so one per button would not scale. Each button has a stable seed, so no two flow alike. The server's HTML, and browsers without WebGL, show a still CSS liquid in the same tone.
  - **Never:** a solid Volt fill with black text, a lift on hover, or a second WebGL context for a button. Tabs, accordions, the language selector and form controls are not action buttons and keep their own styles.

### Cards & Containers

- **Bento Glass Card:**
  - **Corner Style:** `border-radius: 16px` (`--radius-lg`).
  - **Background:** `rgba(10, 10, 10, 0.45)` with `backdrop-filter: blur(24px)`.
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
  - **CTA Integration:** Embedded compact "Book Audit" Shader Button on the right flank.

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
- **Rules:** See the Aurora Rule. The content it sits under provides its own clearing (`IntegrationsHub` shades the header and the scene stage). GLSL ES reserves words such as `half`, `input` and `filter`; a test guards the shader against them, because a compile error silently drops to the CSS fallback.

### Unified Delivery (`components/sections/IntegrationsHub.jsx`)

- **Layout:** No container card. A centred two-line headline (statement, then the Volt italic promise) and a lede capped at 62ch, above a stage framed by four hairline registration marks, the blueprint's crop marks, around the `UnifiedDeliveryScene`.
- **Scene:** The 14 s delivery clock and its keyframes are the illustration's own; the section never restyles them.

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

- **Purpose:** "The Math Speaks For Itself." proves its figures instead of listing them. One glass panel: the statement, a lede tied to the three figures and a quiet link to talk to an architect on the left; on the right a ledger of three hairline rows of equal weight (7×, −65%, 25M+). No hero figure: a giant number over small supporting stats is the SaaS hero-metric template.
- **Figures:** One size for all three, white display digits in `tabular-nums`; the unit at `.5em`, weight 500, in Volt, the only colour in the number. Real signs, `×` (U+00D7) and `−` (U+2212). The digits are presentational: each row carries its full sentence for screen readers.
- **Proofs:** Minimal line instruments, one per figure, in a subgrid of figure and detail so every instrument starts on the same axis, and every stroke carries information. They are inline SVG in fixed-ratio boxes, with their labels in HTML (a legend of short strokes, or placed over the box) so text stays legible and translated at any width. One stroke weight (1.25, 1.5 for Volt): graphite for the old way, Volt for NeuralBI, faint white for axes and references; no fills, glows, gradients or stripes. 7×: one traditional cycle arching over the timeline while seven NeuralBI releases hop under it, each landing on a dot. −65%: cost running level, falling to what is kept and running on, a faint line carrying the old level, and a blueprint measure at the end labelled "Saved". 25M+: a 24-hour dial (taller marks every six hours) drawn round from 00 h, beside the rate the figure implies (≈ 290 rows a second). Every drawn stroke has `pathLength="1"` and draws with `stroke-dashoffset` (butt caps, never `vector-effect: non-scaling-stroke`, which breaks the dash). No figure keeps counting after it lands: that would read as live data the page does not have.
- **Motion:** The figures roll like an odometer (`Counter`): each digit is a reel of 0–9 that spins a few laps fast and slows onto its value on `--ease-out`, the ones digit last. It is pure CSS on the same clock as the proofs, keyed to each row's `data-count`: the server's HTML is resolved; a row off screen at hydration is armed (reels on 0, proofs at their start) and rolls once 60% of it is seen, each row 140 ms after the one above; a row already on screen, and every row under reduced motion, stays resolved. At rest the reel is untransformed, so the digits stay crisp.
- **Light and edge:** An Aurora section (the Aurora Rule) with the panel as its clearing: the light flows round the panel at full strength and dims beneath the glass, whose text clears 4.5:1 at the brightest moment of the swell. The panel is Bento glass without a drop shadow. One beam (`EdgeBeam`) travels its 1px edge: a Volt comet on `offset-path: inset(0 round var(--radius-lg))`, 12 s a lap at a constant speed, its head echoed by a small, soft glow confined to a 16px band just inside the glass (a lit filament, never a cloud over the content); it rests while the panel is off screen and gives way to a still light at the top left under reduced motion or without motion-path support. A fine pointer also lights the ring where it is. The panel itself never tilts or moves.

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
  - **Indicator Dot:** 6px circular LED, lit and still. State is shown by color, never by a pulse.

---

## 6. Motion

Motion explains a change or rewards arrival; it is never there to fill the screen. It is a layer of hierarchy: the hero moves most, section titles next, then cards and content, then supporting copy, and decoration barely at all. Anything seen once (a section arriving, the hero, the ROI roll) gets the budget for delight; anything used often (hover, tabs, accordions, presses) is quick and plain. When in doubt, leave it still.

### Tokens (`app/globals.css`)

| Tier | Duration | Curve | Used for |
|---|---|---|---|
| Micro | `--dur-press` 120 ms, `--dur-ui` 200 ms | `--ease-out` | Press `scale(.96)`, hover colour and borders, link roll (280 ms + 12 ms a letter) |
| Component | 200–280 ms | `--ease-out`; `--ease-in-out` for travel | Tabs (240 ms clip), panel swap (220 ms), accordion (280 ms), chapter crossfade |
| Section | `--dur-reveal` 700 ms (600 text, 720 words, 900 visuals) | `--ease-out` | Headlines, copy, cards, panels, scenes arriving |
| Hero | `--dur-enter` 900 ms | `--ease-out` | The hero's lines, a page title |
| Ambient | seconds (6–42 s) | loops of their own | Aurora, the NeuralMark, the button liquid, the marquee |

- `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`): entrances, exits, feedback. `--ease-in-out` (`cubic-bezier(0.77, 0, 0.175, 1)`): movement across the screen. Nothing eases in, nothing is linear except scroll-linked parallax, nothing overshoots.
- Staggers: `--stagger-words` 32 ms between the words of a headline, `--stagger-blocks` 80 ms between blocks and cards (a group caps its index, so a set of eight lands as fast as a set of six).
- Travel: `--reveal-rise` 18px for blocks, `--reveal-rise-text` 10px for copy.
- Small screens (≤768px) keep the same sequences, contained: 24 ms and 60 ms staggers, 12px and 6px travel, half the hero's parallax.

### Technique

- CSS transitions for anything interactive (they can be interrupted mid-way); CSS keyframes or scroll-driven animations for anything predetermined (off the main thread); framer-motion only where the motion is dynamic (layout, scroll-linked values), and there with full `transform` strings rather than `x`/`y` where it can.
- Arrivals move only `transform`, `opacity` and `clip-path`, so they never shift layout; `will-change` is set only while one runs.
- Every IntersectionObserver reads the **last** record of a batch: a fast scroll delivers several, and the first one is stale.
- Render output never branches on the reduced-motion setting during hydration (`useReducedMotionSafe`; `MotionConfig` switches to `user` once mounted).
- No magnetic pull, tilt, bounce or float on anything that carries text or an action.

### Arrivals

Everything below the hero arrives once, the first time it is seen, through one state machine (`components/useReveal.js`, on `data-reveal` or `data-count`): absent means resolved (the server's HTML, no JavaScript, and anything already on screen at load stay put, so nothing is ever blank); `armed` means it loaded off screen and waits at its start; `run` means it came into view and its transitions carry it home. After `settle` it returns to absent, so no delays or layers linger, and it never re-animates on the way back up.

- **Headlines (`CharacterReveal`):** each word rises out of its own mask (the clip travels with the word, so its window stays put), one `--stagger-words` step after the word before, 720 ms. No blur. A second line continues the first (`delay={wordsIn(firstLine)}`, `components/revealTiming.js`). `*phrase*` is the Volt italic; punctuation right after it stays upright on the same word.
- **Supporting copy (`<Reveal>`, `text`):** the paragraph fades up 10px as one block, about 200–300 ms after its title, never word by word.
- **Blocks (`<Reveal variant="block">`):** a form, a tab row or a panel rises 18px, one step behind the copy.
- **Visuals (`<Reveal variant="visual">`):** a scene opens upward from its lower edge through a clip while it settles. A wipe, never a zoom.
- **Collections:** cards rise one block step apart as one composition (Manifesto, FAQ), each card's own contents following one step behind each other.

### Entrances for what is on screen at load

The hero's copy and the secondary pages (404, thank you, privacy, terms) enter with pure CSS utilities, so the server's HTML animates without waiting for JavaScript: `.enter` (a fade up, 700 ms) and `.enter-mask` (a title opening upward from its baseline, 900 ms), ordered by `--enter` (label 0, title 1, copy 2…) one block step apart. They hold their start only while they wait (`backwards`), and under reduced motion they do not run.

### Smooth scroll (Lenis, `components/SmoothScroll.jsx`)

One Lenis instance (`lerp .1`) for fine pointers only; touch keeps native scrolling and reduced motion turns it off. Every programmatic scroll goes through `lib/smoothScroll.js` (`scrollToTarget`, `lockScroll`, `unlockScroll`), which falls back to native scrolling when Lenis is not running. Scrollers inside modals carry `data-lenis-prevent`. framer-motion's `useScroll` keeps reading the native position, so pinned stories and scroll-linked values stay exact.

### One signature per section

The arrivals above are the shared language; each section adds at most one gesture of its own.

- **Hero:** the lines of light come on (1.6 s) as the headline rises line by line out of a mask (90 ms apart); the copy follows at 360 ms and the action at 440 ms, all landed in about a second. On scroll the copy holds, then leaves on `--ease-in-out` while the parallax stays linear (half on small screens, none under reduced motion).
- **Navbar:** the rolling link labels and the reading progress traced round the capsule's outline.
- **TrustBar:** a marquee with feathered edges that pauses under a fine pointer and stands still under reduced motion.
- **Manifesto:** each card rises one step after its neighbour, then its title, body and scene follow one step apart; the card's edge lights in its own accent where the pointer is.
- **The Arsenal:** chapters and scenes cross-fade through a 2px blur, so two contents melt into one change; the curtain carries tool changes. Below 1024px the four products are an accordion: each row is dark glass in its product's colour (logo tile, number and architecture, name, promise, a + that turns to ×). One opens at a time, unfolding the whole product (proposition, capabilities, difference, each with its scene) on grid rows in 420 ms, its parts one block step apart; it folds away at once. The tapped row stays under the finger, a row opened in the lower half settles under the navbar, and a Close at the end returns to the row with focus on it. A product's scenes are built the first time it opens. Desktop keeps the pinned story, and the long article under reduced motion.
- **Protocol:** the phases light as they cross the reading line.
- **Unified Delivery:** the stage opens upward through its crop marks, then the delivery clock runs.
- **Industries:** the selected tab is a lit copy of the tab row clipped to one cell; the clip slides (240 ms, `--ease-in-out`) and the colour travels with it. A new sector arrives in 220 ms through a 2px blur. On one column (≤900px) the product lives inside the open answer, right under its text: it unfolds downward through a clip (460 ms) and travels with whichever answer is opened (the same node, so its light keeps its WebGL context), and the row just tapped stays under the finger while the answer above folds away.
- **ROI:** the odometer roll and the proofs drawing themselves (see ROI Instrument).
- **FAQ:** answers open on `grid-template-rows`, the chevron turns on `--ease-in-out`, and the card's edge follows the pointer.
- **Closing CTA and Footer:** the travelling edge beam, and the NeuralMark's assemble-and-release loop.
- **Thank you page:** the confirmation check draws its stroke once its circle has arrived.
- **Case study** (built, not yet placed on the page): a representative, anonymised scenario. A quote that rises word by word beside a line instrument, with the figure rolling like the ROI.

### Named Rules

**The One Signature Rule.** Every section shares the arrival language (masked headline words, copy and blocks one step behind); on top of it a section earns at most one gesture of its own and keeps it. A new section picks from the vocabulary above (a mask, a stagger, a clip, a roll, a draw) or adds to it here.

**The Resolved First Rule.** The server's HTML is always the finished state. Motion only arms what loaded off screen, so a slow script, no script or reduced motion never leaves content hidden.

**The Legibility Rule.** Paragraphs arrive as blocks, never word by word; no scramble, rotation or bounce on text; legal and long-form documents stay still below their heading.

---

## 7. Do's and Don'ts

### Do:
- **Do** anchor all views in deep obsidian black (`#000000`) to preserve dramatic contrast.
- **Do** strictly limit Volt Lime (`#c6ff34`) to key interactive conversion triggers, active states, and critical ROI metrics.
- **Do** use multi-layered inset highlights on buttons and glass cards to maintain a tactile, physical quality.
- **Do** preserve the exact typography stack: DM Sans for display, Inter for body, Montserrat for UI and buttons, JetBrains Mono for telemetry tags, Absolut only for the logotype.
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
- **Don't** give two sections the same entrance: a fade-up everywhere reads as a template.
- **Don't** add live pulses, blinking indicators or perpetual motion on controls; the one exception is the Shader Button's slow liquid, which pauses off screen and rests under reduced motion.
- **Don't** float, bob or scale a surface that carries text in a loop; a perpetual transform leaves glyphs at fractional offsets and they read soft.
- **Don't** create flat, lifeless buttons without hover transitions, inset bevels, or tactile press feedback.
- **Don't** use monospace fonts for long body paragraphs; restrict monospace strictly to telemetry tags, code blocks, and micro-labels.
- **Don't** add decorative generic diagrams with fake controls or unstyled placeholders.
