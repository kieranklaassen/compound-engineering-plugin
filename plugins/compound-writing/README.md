# Compound Writing Plugin

> Each unit of writing work should make subsequent units easier—not harder.

AI-powered writing tools that apply compound engineering principles to content creation. Just as [compound-engineering](../compound-engineering/) captures coding patterns to accelerate development, compound-writing captures voice, style, and editorial preferences to accelerate writing.

## Installation

```bash
claude /plugin install compound-writing
```

## Philosophy

**The 50/50 Rule**: Spend 50% improving your writing system (style guides, templates, voice documentation), 50% actually writing. This feels slow at first. Within weeks, the compounding becomes obvious.

### The Compound Effect

**Before Compound Writing:**
```
Write → Edit → Publish → Start from scratch
Write → Edit → Publish → Start from scratch
```

**After Compound Writing:**
```
Write → Edit → Capture patterns → Publish
Write (faster) → Edit (patterns help) → Capture → Publish
Write (faster still) → Minimal edit → Capture → Publish
```

## Quick Start

```bash
# Plan a new piece
claude /writing:plan "How to debug production issues"

# Draft from an outline
claude /writing:draft drafts/debug-production/outline.md

# Run editorial review
claude /writing:review drafts/debug-production/draft-v1.md

# Capture what worked
claude /writing:compound drafts/debug-production/final.md
```

## Components

### Agents (7)

| Agent | Purpose |
|-------|---------|
| `source-researcher` | Research sources, analyze audience, study competitors |
| `fact-checker` | Verify claims, check statistics, ensure accuracy |
| `structure-architect` | Create outlines, analyze flow, generate hooks |
| `voice-guardian` | Maintain voice consistency, calibrate tone |
| `clarity-editor` | Improve clarity, cut words, remove jargon, fix passive voice |
| `publishing-optimizer` | Optimize for SEO, social media, newsletters |
| `every-style-editor` | Review and edit text against Every's style guide |

### Commands (4)

| Command | Purpose |
|---------|---------|
| `/writing:plan` | Transform a topic into a researched outline |
| `/writing:draft` | Execute an outline into prose with style guidance |
| `/writing:review` | Multi-agent editorial review |
| `/writing:compound` | Capture patterns from successful writing |

### Skills (5)

| Skill | Purpose |
|-------|---------|
| `pragmatic-writing` | Write like Hunt/Thomas and Joel Spolsky |
| `dhh-writing` | Write in DHH's direct, opinionated style |
| `voice-capture` | Extract and encode voice profiles from samples |
| `every-style-editor` | Review and edit copy against Every's style guide |
| `writing-orchestration` | Two-agent orchestration with strategies and quality gates |

## The Four-Phase Workflow

### Phase 1: `/writing:plan` — Research & Outline

Transform a topic into a structured outline with sources.

- **Parallel research**: Sources, audience, competitors
- **Two-gate assessment**: Material sufficiency, message clarity
- **Output**: `drafts/{slug}/outline.md`

### Phase 2: `/writing:draft` — Execute Outline

Transform outline into prose following style preferences.

- **Voice matching**: Apply voice profiles and style guides
- **Producer-critic loop**: Voice guardian feedback until score ≥85
- **Output**: `drafts/{slug}/draft-v1.md`

### Phase 3: `/writing:review` — Multi-Agent Editorial

Exhaustive parallel review from multiple perspectives.

- **Core reviews**: Voice, clarity, facts, structure
- **Style reviews**: Every, DHH, Pragmatic (based on context)
- **Interactive triage**: Accept, skip, or customize each fix

### Phase 4: `/writing:compound` — Capture Patterns

Turn successful writing into permanent improvements.

- **Extract patterns**: Hooks, structures, transitions, voice elements
- **Update documentation**: Add to pattern library
- **Create templates**: For similar future pieces

## Voice Profiles

Voice profiles encode writing style in three layers:

```yaml
voice:
  name: "kieran-blog"

  # Layer 1: Immutable Traits
  traits: [direct, conversational, technically-informed]
  register: informal
  prohibited: ["synergy", passive voice in openings]

  # Layer 2: Channel Guidance
  channels:
    blog: "longer form, storytelling allowed"
    social: "punchy, hooks required"
    newsletter: "personality forward"

  # Layer 3: Example Library
  exemplars:
    - path: "samples/great-opening.md"
      why: "Concrete example first, theory second"
```

## Quality Gates

### Gate 1: Material Sufficiency
"Could the writer create this without inventing facts?"

### Gate 2: Message Clarity
"Do we know the specific message to convey?"

### Gate 3: Style Compliance
"Does it match the voice and style guide?"

### Gate 4: Factual Accuracy
"Are all claims supported?"

## Pattern Capture System

Patterns are stored in `docs/patterns/`:

```
docs/patterns/
├── common-patterns.md     # Index
├── hooks/                 # Hook formulas that work
├── structures/            # Successful article structures
├── transitions/           # Transition phrases that flow
└── voice/                 # Voice pattern captures
```

## Integration with Compound Engineering

This plugin complements the compound-engineering plugin:

- **compound-engineering**: Code, systems, development workflows
- **compound-writing**: Content, prose, editorial workflows

Both follow the same philosophy: each unit of work should make the next easier.

## License

MIT

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
