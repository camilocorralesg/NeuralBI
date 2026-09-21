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
typography:
  display:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw + 1rem, 5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3vw + 1rem, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
  pill: "9999px"
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
- **Tactile Bento Glassmorphism:** Translucent dark container cards (`rgba(10, 10, 10, 0.45)`) with 24px backdrop blur, subtle noise grain, and delicate perimeter glow.

---

## 2. Colors

The NeuralBI palette is a high-contrast dark scheme built on an absolute black canvas, punctuated by a razor-sharp electric volt accent and specialized technical telemetry hues.

### Primary
- **Volt Lime** (`#c6ff34`): The signature brand signifier. Used with deliberate restraint on primary call-to-action buttons, high-impact hover states, active live nodes, and conversion targets. It conveys immediate computational velocity.
- **Volt Lime Hover** (`#d4ff66`): Lightened state for immediate physical responsiveness on hover.

### Secondary
- **Neural Indigo** (`#6366f1` / `#818cf8`): Represents cognitive computation, autonomous agents, and internal reasoning models. Applied to copilot nodes, neural pipeline streams, and secondary graphic indicators.
- **Mesh Cyan** (`#38bdf8` / `#0ea5e9`): Represents real-time telemetry, Power BI semantic models, Azure infrastructure, and live database synchronizations.

### Neutral
- **Deep Obsidian Paper** (`#000000`): The ground plane. Pure black foundation ensuring maximum dynamic range, energy efficiency on OLED displays, and theatrical contrast.
- **Surface Elevation 1** (`#121212`): Elevated cards, bento modules, and floating navigation container canvas.
- **Surface Elevation 2** (`#1a1a1a`): Inner inset panels, code telemetry blocks, and subtle card partitions.
- **Ink Primary** (`#ffffff`): Pure white, allocated exclusively to primary headlines and key values.
- **Ink Secondary** (`#a1a1aa`): Zinc-400 neutral for explanatory paragraphs, feature descriptions, and subtitle copy.
- **Ink Tertiary** (`#71717a`): Zinc-500 neutral for metadata tags, footer copyright, and deactivated node strokes.
- **Subtle Border** (`#27272a`): 1px structural container boundary maintaining container definition against the dark background.
- **Glass Border** (`rgba(255, 255, 255, 0.08)`): Faint specular boundary on glass panels and bento cards.

### Named Rules

**The 10% Volt Rule.** The primary accent (`#c6ff34`) must never occupy more than 10% of any given viewport. Its power comes directly from its scarcity against the deep obsidian field. If the whole screen glows, nothing is actionable.

**The True Black Foundation Rule.** Surfaces must never default to charcoal, slate blue, navy, or desaturated brown as background canvas. The ground is `#000000`. Backgrounds with beige, cream, or sand tones are strictly forbidden.

**The Functional Chromatic Separation Rule.** Green/Volt represents action and velocity; Indigo represents AI logic; Cyan represents enterprise telemetry and data structure. Accents must never be mixed purely for decorative novelty.

---

## 3. Typography

The typographic system pairs the geometric, confident authority of **Sora** for display headings with the legibility and human clarity of **Manrope** for body text, reinforced by **JetBrains Mono** for engineering labels and status telemetry.

**Display Font:** Sora (System Fallback: `system-ui, sans-serif`)  
**Body Font:** Manrope (System Fallback: `system-ui, sans-serif`)  
**Tech/Sub-Display Font:** Schibsted Grotesk (System Fallback: `system-ui, sans-serif`)  
**Monospace Font:** JetBrains Mono (Fallback: `ui-monospace, SFMono-Regular, monospace`)  
**Branded Accent Font:** Absolut (`AbsolutMediumReduced.ttf`) for custom brand logotype assets.

**Character:** Confident, structural, and architectonic. Headings feel like precision-machined steel; prose reads with effortless editorial fluidity; monospace labels convey real-time system logs.

### Hierarchy

- **Display 1** (`weight: 700`, `clamp(2.5rem, 5vw + 1rem, 5rem)`, `line-height: 1.1`, `letter-spacing: -0.04em`): Reserved for hero headlines ("Intelligence That Executes"). Uses tight tracking and maximum visual authority.
- **Display 2 / Headline** (`weight: 600`, `clamp(2rem, 3vw + 1rem, 3.5rem)`, `line-height: 1.1`, `letter-spacing: -0.03em`): Section headings across the bento grid and methodology phases.
- **Display 3 / Title** (`weight: 600`, `1.5rem` (24px), `line-height: 1.2`, `letter-spacing: -0.02em`): Bento card titles, feature headers, and modal headings.
- **Body Large** (`weight: 400`, `clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)`, `line-height: 1.6`): Subtitles, introductory thesis statements, and hero supporting copy. Maximum line length 65ch.
- **Body** (`weight: 400`, `1rem` (16px), `line-height: 1.5`): General body copy, feature explanations, and architectural descriptions.
- **Label / Monospace** (`weight: 500`, `0.75rem` (12px), `line-height: 1.4`, `letter-spacing: 0.05em`, `text-transform: uppercase`): Section kickers (`> METHODOLOGY`), telemetry tags, phase counters (`01`, `02`), and terminal status indicators.

### Named Rules

**The Strict Font Stack Rule.** Only fonts defined in the official stack (`Sora`, `Manrope`, `Schibsted Grotesk`, `JetBrains Mono`, `Absolut`) may be rendered. System defaults like Arial, Times New Roman, or unapproved Google Fonts (Inter, Roboto, Space Grotesk) are forbidden.

**The Light-on-Dark Breathing Rule.** Because light text on pure black visually bleeds slightly, body text (`--color-ink-2`) must always carry a minimum line-height of `1.5` to `1.6` and letter-spacing between `0` and `0.01em` to prevent typographic crowding.

---

## 4. Elevation

Depth in NeuralBI is conveyed through **tactile glassmorphism, physical inset lighting, and dark ambient occlusion** rather than heavy muddy drop shadows.

Surfaces do not float aimlessly in space; they behave like precision-machined glass plates recessed or elevated above an obsidian circuit chassis. Specular top-edge highlights simulate an overhead studio light, while backdrop blur grounds floating surfaces directly into the environment.

### Shadow Vocabulary

- **Raycast Specular Inset** (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.4)`): Applied to primary action buttons and tactile chips to create an authentic 3D beveled edge.
- **Volt Ambient Glow** (`box-shadow: 0 4px 16px rgba(198, 255, 52, 0.15)` at rest, `0 8px 32px rgba(198, 255, 52, 0.35)` on hover): Radiates energy beneath active buttons and hovered primary nodes.
- **Glass Panel Elevation** (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 12px 40px rgba(0, 0, 0, 0.5)`): Structural shadow on bento cards, floating navigation bar, and interactive dialogs.
- **Deep Occlusion Drop** (`box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3)`): Soft grounding shadow for interactive cards.

### Named Rules

**The Inset Edge Rule.** Every elevated or clickable surface (buttons, cards, floating pills) must feature an internal 1px specular highlight along its top border (`inset 0 1px 0 rgba(255, 255, 255, 0.1..0.8)`). This provides tangible physical clarity against true black without requiring thick borders.

**The State-Driven Glow Rule.** Ambient neon glow effects must never be statically pinned across every card simultaneously. Glows are reactive: they ignite in response to hover, cursor proximity, or live telemetry streaming.

---

## 5. Components

Components are engineered as self-contained precision modules. They share rounded pill geometries for controls and rounded 16px corners for bento containers.

### Buttons

- **Primary (Raycast DNA):**
  - **Shape:** Full pill (`border-radius: 9999px`), padding `14px 36px` (`0.875rem 2.25rem`).
  - **Color:** Gradient fill `linear-gradient(180deg, rgba(198, 255, 52, 0.95) 0%, rgba(198, 255, 52, 0.75) 100%)` with pure black text (`#000000`), font-weight 600.
  - **Lighting:** Signature Raycast multi-layer shadow with white top inset and volt ambient bloom.
  - **Hover:** Brightness expansion (`#d4ff66`), `transform: translateY(-1px)`, amplified neon bloom (`0 8px 32px rgba(198, 255, 52, 0.35)`).
  - **Active:** `transform: translateY(1px) scale(0.98)`, compressed shadow.

- **Secondary (Outlined Glass):**
  - **Shape:** Full pill (`border-radius: 9999px`), padding `12px 24px`.
  - **Color:** Transparent background, white text (`#ffffff`), 1px border (`#27272a`).
  - **Hover:** Background shifts to `#121212`, border brightens to `rgba(255, 255, 255, 0.2)`.

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
  - **Links:** Muted text (`#a1a1aa`), transition to white on hover.
  - **CTA Integration:** Embedded compact "Book Audit" pill on the right flank.

### Inputs & Fields

- **Architecture Audit Form Input:**
  - **Style:** Dark solid background (`#121212`), 1px border (`#27272a`), radius `8px` (`--radius-md`), padding `12px 16px`.
  - **Text:** White input value (`#ffffff`), placeholder text in zinc-500 (`#71717a`).
  - **Focus State:** 1px outline in Volt Lime (`#c6ff34`) with `0 0 12px rgba(198, 255, 52, 0.2)` soft field glow.
  - **Error State:** Border shifts to coral red (`#ef4444`) with descriptive helper text below.

### Status Badges & Telemetry Pills

- **Monospace Micro-Tag:**
  - **Typography:** `JetBrains Mono`, 11px / 0.75rem, uppercase.
  - **Background:** `rgba(15, 17, 26, 0.85)` with 8px blur and 1px border in subtle accent tone.
  - **Indicator Dot:** 6px circular LED with pulse glow indicating active computation.

---

## 6. Do's and Don'ts

### Do:
- **Do** anchor all views in deep obsidian black (`#000000`) to preserve dramatic contrast.
- **Do** strictly limit Volt Lime (`#c6ff34`) to key interactive conversion triggers, active states, and critical ROI metrics.
- **Do** use multi-layered inset highlights on buttons and glass cards to maintain a tactile, physical quality.
- **Do** preserve the exact typography stack: Sora for headings, Manrope for paragraphs, JetBrains Mono for telemetry tags.
- **Do** write crisp, assertive engineering copy that speaks to enterprise directors and CTOs with concrete technical architectures.
- **Do** ensure interactive elements provide distinct `:hover`, `:focus-visible`, and `:active` states.
- **Do** test all copy and form fields against the mandatory automated test suite before committing code.

### Don't:
- **Don't** use light, cream, beige, or sand background palettes under any circumstances.
- **Don't** fall back to corporate IT consulting clichés (e.g., stock photos of handshakes, vague arrows, Accenture-style blue-gradient swooshes).
- **Don't** use standard Bootstrap or uncustomized Tailwind defaults.
- **Don't** splash neon colors indiscriminately across borders, backgrounds, and paragraphs.
- **Don't** introduce fonts outside the documented stack (no Inter, Roboto, Fraunces, or Comic Sans).
- **Don't** create flat, lifeless buttons without hover transitions, inset bevels, or tactile press feedback.
- **Don't** use monospace fonts for long body paragraphs; restrict monospace strictly to telemetry tags, code blocks, and micro-labels.
- **Don't** add decorative generic diagrams with fake controls or unstyled placeholders.
