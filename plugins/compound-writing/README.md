# Compound Writing Plugin

> Each unit of writing work should make subsequent units easier—not harder.

AI-powered writing tools that apply compound engineering principles to content creation. Build a system that learns your voice, captures what works, and makes every piece of writing faster than the last.

## Installation

```bash
claude /plugin install compound-writing
```

## Philosophy

**The Compound Effect**: Every piece you write teaches the system. Patterns get captured, preferences get encoded, and your next piece benefits from everything before it.

```
Write → Feedback → Learn → Write (faster) → Feedback → Learn → Write (even faster)
```

**The 50/50 Rule**: Spend 50% improving your writing system (voice profiles, patterns, feedback), 50% actually writing. This feels slow at first. Within weeks, the compounding becomes obvious.

## Quick Start

### First Time Setup

```bash
# Initialize compound-writing for your project (interactive wizard)
claude /writing:init

# Or use minimal setup (no questions, just create structure)
claude /writing:init --minimal
```

This creates:
- `.claude/writing-knowledge/` — Voice profiles, patterns, references
- `drafts/` — Draft workspace with scratchpad
- `.claude/CLAUDE.md` — Project writing preferences

### Writing Workflow

```bash
# 1. Plan a piece with research
claude /writing:plan "How to debug production issues"

# 2. Draft from the outline
claude /writing:draft drafts/debug-production/outline.md

# 3. Give feedback on drafts
claude /writing:feedback draft-2 love the opening stat
claude /writing:feedback draft-1 too formal

# 4. Refine based on feedback
claude /writing:draft refine draft-2

# 5. Run editorial review
claude /writing:review drafts/debug-production/draft-v1.md

# 6. Capture what worked
claude /writing:compound drafts/debug-production/final.md
```

### Create Custom Skills

```bash
# Create a voice from your writing samples
claude /writing:skill create voice "my-blog" ~/posts/*.md

# Create a voice from description
claude /writing:skill create voice "founder-voice" "direct, vulnerable, builds in public"

# Create domain expertise
claude /writing:skill create domain "persuasion" "Cialdini, rhetoric, behavioral economics"

# Create platform-specific format
claude /writing:skill create format "twitter-thread"
```

## The Complete Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                     COMPOUND WRITING FLOW                        │
└─────────────────────────────────────────────────────────────────┘

    ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
    │  PLAN    │────▶│  DRAFT   │────▶│  REVIEW  │────▶│ COMPOUND │
    └──────────┘     └──────────┘     └──────────┘     └──────────┘
         │                │                │                │
         ▼                ▼                ▼                ▼
    Research &       3 Draft           Multi-Agent      Extract
    Outline          Variations        Editorial        Patterns
                          │
                          ▼
                   ┌──────────┐
                   │ FEEDBACK │◀─── Real-time preference capture
                   └──────────┘
                          │
                          ▼
                   ┌──────────┐
                   │SCRATCHPAD│◀─── Session memory
                   └──────────┘
                          │
                          ▼
                   ┌──────────┐
                   │KNOWLEDGE │◀─── Permanent patterns
                   └──────────┘
```

## Components

### Commands (8)

| Command | Purpose |
|---------|---------|
| `/writing:init` | Interactive setup wizard for project writing environment |
| `/writing:plan` | Transform a topic into a researched outline with sources |
| `/writing:draft` | Execute an outline into prose with 3 variations |
| `/writing:review` | Multi-agent editorial review from every angle |
| `/writing:feedback` | Capture real-time preferences into scratchpad |
| `/writing:knowledge` | Manage voice profiles, patterns, and references |
| `/writing:compound` | Extract patterns from successful writing |
| `/writing:skill` | Create new skills (voice, domain, format) with research |

### Agents (7)

| Agent | Purpose |
|-------|---------|
| `source-researcher` | Research sources, analyze audience, study competitors |
| `fact-checker` | Verify claims, check statistics, ensure accuracy |
| `structure-architect` | Create outlines, analyze flow, generate hooks |
| `voice-guardian` | Maintain voice consistency, calibrate tone |
| `clarity-editor` | Improve clarity, cut words, remove jargon |
| `publishing-optimizer` | Optimize for SEO, social media, newsletters |
| `every-style-editor` | Review against Every's style guide |

### Skills (9)

| Skill | Type | Purpose |
|-------|------|---------|
| `writing-orchestration` | Core | Two-agent architecture with strategies and quality gates |
| `scratchpad` | Core | Real-time feedback tracking for iterative refinement |
| `context-notes` | Core | Structured handoffs between commands |
| `voice-capture` | Core | Extract and encode voice profiles from samples |
| `pragmatic-writing` | Voice | Write like Hunt/Thomas and Joel Spolsky |
| `dhh-writing` | Voice | Write in DHH's direct, opinionated style |
| `every-essay-guide` | Voice | Every essay craft (worldview, best practices, hed/dek) |
| `source-code-guide` | Voice | Source Code series (AI-era building, coining language) |
| `every-style-editor` | Editing | Mechanical review tool (grammar, punctuation, compliance) |

**Voice Layering:** Combine multiple voices for a piece. Example: Source Code + DHH directness, or Every essay + pragmatic clarity.

## Core Systems

### 1. The Scratchpad (Session Memory)

The scratchpad captures your preferences in real-time:

```bash
# Mark what you like
/writing:feedback draft-2 love the punchy opening

# Mark what you don't
/writing:feedback draft-1 too corporate, sounds like a press release

# General preferences
/writing:feedback general prefer short sentences, data-driven
```

The scratchpad builds a preference profile:

```markdown
## What Works ✓
- Data-driven openings
- Conversational tone
- Short punchy sentences

## What Doesn't ✗
- Corporate/formal language
- Long paragraphs
- Abstract concepts without examples
```

Every subsequent draft reads the scratchpad and adapts.

### 2. The Knowledge Base (Permanent Memory)

Your writing knowledge compounds over time:

```bash
# Search for techniques
/writing:knowledge search "hooks for technical content"

# Add a new pattern
/writing:knowledge add pattern "The Callback Close - end by referencing the opening"

# Import your voice from samples
/writing:knowledge import voice-profile my-best-posts/*.md
```

Knowledge structure:
```
.claude/writing-knowledge/
├── voice-profiles/     # Your encoded voices
├── patterns/           # Proven techniques
│   ├── hooks/
│   ├── structures/
│   └── transitions/
└── references/         # Style guides & exemplars
```

### 3. Context Notes (Handoff Protocol)

Commands pass structured context to each other:

```markdown
<context_notes>
## Research Summary
Researched AI adoption. 73% of hospitals now use AI diagnostics.

## Material Available
- Stat: 73% hospital AI adoption
- Case: Mayo Clinic 40% improvement
- Quote: "AI is the stethoscope of the 21st century"

## Message Clarity
**Thesis**: AI diagnostics are becoming standard of care
**Audience**: Hospital administrators
**Desired Action**: Request a demo

## Voice Configuration
**Profile**: kieran-blog
**Channel**: blog

## Mode
EXPLORATION
</context_notes>
```

### 4. Draft ID Tracking

Every draft gets a unique, persistent ID:

```
Response 1: draft-1, draft-2, draft-3  (exploration)
Response 2: draft-4, draft-5, draft-6  (new exploration)
Response 3: draft-2 refined            (keeps original ID)
```

Reference specific drafts in feedback:
```bash
/writing:feedback draft-2 perfect opening
/writing:draft refine draft-2
```

## Two-Agent Architecture

Complex writing benefits from separation of concerns:

### Orchestrator Role
- Classifies requests (research vs. content)
- Applies two-gate assessment
- Gathers materials and context
- Hands off when ready

### Writer Role
- Creates drafts using strategies
- Applies voice profiles
- Produces 3 variations (exploration) or 1 (refinement)
- Incorporates scratchpad preferences

### Two-Gate Assessment

Before any content creation:

**Gate 1: Material Sufficiency**
> "Could we create this without inventing facts?"
- ✓ Have concrete examples
- ✓ Have data/statistics
- ✗ Would need to make things up

**Gate 2: Message Clarity**
> "Do we know exactly what message to convey?"
- ✓ Clear thesis
- ✓ Specific audience
- ✗ Vague "write about this"

## Writing Strategies

### 10 Baseline Strategies (Always Apply)

| Strategy | Rule |
|----------|------|
| reader-zero-context | Add orienting phrases for unfamiliar terms |
| subject-verb-first | Subject + verb in first 5 words |
| activate-verbs | Precise verbs over is/was |
| watch-adverbs | Let strong verbs carry the load |
| limit-ings | Simple tense over continuous |
| prefer-simple | Everyday language unless technical |
| cut-big-small | Edit hierarchically (paragraphs → sentences → words) |
| ban-empty-hypophora | No self-answered questions |
| present-active-tense | Direct, immediate language |
| one-idea-per-sentence | Single clear point per sentence |

### 20+ Situational Strategies (Select 3-4)

**Hooks**: hook-effectiveness, tension-builder, pattern-twist
**Structure**: ladder-abstraction, sentence-length, paragraph-length
**Style**: elegant-variation, punctuation-pace, key-words-space
**Narrative**: narrate-scenes, cinematic-angles, reveal-traits

## Modes: Exploration vs. Refinement

### Exploration Mode (3 Drafts)
When to use:
- New content request
- "Show me different options"
- Unsure about direction

What happens:
- Creates exactly 3 variations
- Each with a different angle/approach
- User picks one to refine

### Refinement Mode (1 Draft)
When to use:
- User selected a specific draft
- "Make this punchier"
- Clear direction established

What happens:
- Works on single draft
- Keeps original draft ID
- Applies specific feedback

## Example Session

```bash
# Start with a topic
$ claude /writing:plan "Why most code reviews are useless"

# Plan creates outline.md and sources.md
# Context notes passed forward

$ claude /writing:draft drafts/code-reviews/outline.md

# Creates draft-1, draft-2, draft-3
# Each with different angle

$ claude /writing:feedback draft-2 the opening hook is fire
$ claude /writing:feedback draft-1 too academic

# Scratchpad learns: prefer punchy hooks, avoid academic tone

$ claude /writing:draft refine draft-2

# Creates refined draft-2 using scratchpad preferences

$ claude /writing:review draft-2

# Parallel agents check: voice, clarity, facts, structure
# Returns prioritized issues

$ claude /writing:feedback draft-2 perfect

$ claude /writing:compound draft-2

# Extracts winning patterns to knowledge base:
# - The hook formula used
# - The structure that worked
# - The voice elements that landed
```

## Voice Profiles

Encode your writing style in a profile:

```yaml
voice:
  name: "kieran-blog"

  # Immutable traits
  traits: [direct, conversational, technically-informed]
  register: informal
  prohibited: ["synergy", "leverage", passive voice in openings]

  # Channel guidance
  channels:
    blog: "longer form, storytelling allowed"
    social: "punchy, hooks required"
    newsletter: "personality forward"

  # Example library
  exemplars:
    - path: "samples/great-opening.md"
      why: "Concrete example first, theory second"
```

## Quality Gates

### Pre-Draft
- [ ] Material sufficiency verified
- [ ] Message clarity confirmed
- [ ] Voice profile loaded

### Post-Draft
- [ ] Opening hooks in first 50 words
- [ ] No paragraph over 4 sentences
- [ ] Concrete example in each section
- [ ] All claims supported
- [ ] Voice score ≥ 85

### Post-Review
- [ ] Critical issues addressed
- [ ] Important issues triaged
- [ ] Voice consistency verified

## Pattern Library

Patterns are stored and searchable:

```
docs/patterns/
├── hooks/              # Opening formulas
│   └── stat-surprise.md
├── structures/         # Article architectures
│   └── problem-solution.md
├── transitions/        # Flow techniques
└── closings/           # Ending formulas
    └── callback-close.md
```

Each pattern includes:
- Formula with placeholders
- Usage count and success rate
- Examples from your writing
- When to use / when to avoid

## Integration with Compound Engineering

This plugin complements the compound-engineering plugin:

| compound-engineering | compound-writing |
|---------------------|------------------|
| Code, systems, dev workflows | Content, prose, editorial |
| Code review agents | Editorial review agents |
| Pattern capture for code | Pattern capture for prose |

Both follow the same philosophy: each unit of work makes the next easier.

## File Structure

```
project/
├── .claude/
│   └── writing-knowledge/
│       ├── voice-profiles/
│       ├── patterns/
│       └── references/
└── drafts/
    ├── .scratchpad.md      # Session feedback
    ├── .context.md         # Persistent context
    └── [slug]/
        ├── outline.md
        ├── sources.md
        ├── draft-v1.md
        ├── draft-v2.md
        └── review-v1.md
```

## License

MIT

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
