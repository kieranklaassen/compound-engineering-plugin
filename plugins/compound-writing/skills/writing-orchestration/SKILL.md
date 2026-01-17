---
name: writing-orchestration
description: This skill should be used when orchestrating complex writing workflows with multiple phases. It provides two-agent orchestration patterns, the two-gate content readiness assessment, 10 baseline writing strategies, 20+ situational strategies, and quality checkpoints. Inspired by the Spiral Writing System.
---

# Writing Orchestration Skill

A complete orchestration system for complex writing workflows. This skill provides the strategic layer that coordinates agents, applies writing strategies, and ensures content quality.

## When to Use This Skill

This skill applies when:
- Coordinating multiple writing agents
- Applying strategic writing decisions
- Assessing content readiness before drafting
- Selecting and applying writing strategies
- Running quality checkpoints on drafts

## Two-Agent Architecture

Complex writing benefits from separation of concerns:

### Orchestrator Role
- Classifies requests (information vs. content)
- Applies two-gate assessment
- Gathers research and context
- Hands off to writer when ready
- Never creates content directly

### Writer Role
- Creates drafts using strategies
- Applies style guides
- Produces variations (EXPLORATION mode)
- Refines based on feedback (REFINEMENT mode)
- Uses tools for all content (never in chat)

```
User Request
    ↓
[Orchestrator] → Classify → Research → Two-Gate Assessment
    ↓
    ├── Not Ready → Gather more material/clarity
    ↓
    └── Ready → Handoff to Writer
                    ↓
              [Writer] → Apply Strategies → Create Drafts
                    ↓
              Quality Checkpoints → Output
```

## Two-Gate Content Readiness Assessment

Before any content creation, apply this assessment:

### Gate 1: Material Sufficiency

**Question**: "Could the writer create this without inventing facts?"

| Outcome | Action |
|---------|--------|
| ✓ Pass | Have concrete examples, data, quotes available |
| ✗ Fail | Need to research/gather material first |

**Pass signals**:
- Specific examples available
- Data points confirmed
- Expert quotes accessible
- No major claims need fabrication

### Gate 2: Message Clarity

**Question**: "Do we know EXACTLY what message to convey?"

| Outcome | Action |
|---------|--------|
| ✓ Pass | Clear, specific communication goal |
| ✗ Fail | Need to interview for clarity |

**Pass signals**:
- Can state thesis in one sentence
- Know the audience specifically
- Know the desired action
- Angle is differentiated

### Decision Matrix

| Material | Message | Action |
|----------|---------|--------|
| ✓ | ✓ | Handoff to writer immediately |
| ✓ | ✗ | Interview for message clarity |
| ✗ | ✓ | Research/gather material |
| ✗ | ✗ | Interview for both |

## 10 Baseline Strategies (ALWAYS Apply)

These strategies apply to ALL content. Reference [baseline-strategies.md](./references/baseline-strategies.md) for full details.

| Strategy | Rule | Transform |
|----------|------|-----------|
| **reader-zero-context** | Add 3-6 word orienting phrases | "Stripe handles billing" → "Stripe, the payments platform, handles billing" |
| **subject-verb** | Subject + verb in first 5 words | "There were students who..." → "Students completed..." |
| **activate-verbs** | Precise verbs over is/was | "Markets were down" → "Markets plunged" |
| **watch-adverbs** | Let strong verbs carry load | "whispered quietly" → "whispered" |
| **limit-ings** | Simple tense over continuous | "are running tests" → "run tests" |
| **prefer-simple** | Everyday language unless technical | "utilizes stochastic gradient" → "learns by trial and error" |
| **cut-big-small** | Edit hierarchically | Paragraphs → Sentences → Words |
| **ban-empty-hypophora** | No self-answered questions | "The payoff? Our app..." → "Our app..." |
| **present-active-tense** | Direct, immediate language | "debuts today" → "is out now" |
| **one-idea-per-sentence** | Single clear point | Split compound thoughts |

## 20+ Situational Strategies (Select 3-4)

Choose based on content type and goals. Reference [situational-strategies.md](./references/situational-strategies.md) for full list.

### Hook & Opening
- **hook-effectiveness** - Counterintuitive or surprising openings
- **tension-builder** - Create and resolve tension
- **pattern-twist** - Set expectations, then break them

### Structure & Flow
- **order-words-emphasis** - Important words at sentence ends
- **sentence-length** - Vary for rhythm (short for impact, long for flow)
- **paragraph-length** - Mix for visual rhythm
- **ladder-abstraction** - Alternate concrete ↔ abstract

### Style & Voice
- **elegant-variation** - Avoid word repetition
- **passive-aggressive** - Strategic passive for emphasis
- **punctuation-pace** - Use punctuation for rhythm
- **key-words-space** - Give important terms breathing room

### Persuasion & Engagement
- **essential-name-filter** - Only names that add value
- **name-of-dog** - Specific details for authenticity
- **original-images** - Fresh metaphors, avoid clichés
- **show-and-tell** - Balance showing with telling

### Narrative & Story
- **narrate-scenes** - Immersive scene-setting
- **cinematic-angles** - Camera-like perspective shifts
- **dialogue-compression** - Tight, purposeful dialogue
- **reveal-traits** - Character through action

## Quality Checkpoints

Before finalizing content, verify:

### Opening Quality
- [ ] Opening is counterintuitive or surprising
- [ ] Leads with most compelling insight/moment/problem
- [ ] No chronology/setup/version numbers in opening
- [ ] Hook earns the next sentence

### Body Quality
- [ ] Body delivers on opening's promise
- [ ] Concrete sensory details present
- [ ] Each paragraph has clear purpose
- [ ] Transitions are smooth

### Strategy Compliance
- [ ] All 10 baseline strategies applied
- [ ] 3-4 situational strategies visible
- [ ] Each sentence expresses one clear idea
- [ ] Technical terminology oriented with context

### Style Guide Compliance
- [ ] Voice matches profile/guide
- [ ] No prohibited words/patterns
- [ ] Formatting rules followed

## Content Modes

### EXPLORATION Mode (New Content)

When creating new content:
1. Generate 3 different drafts
2. Vary angle, not just words
3. Apply all strategies to each
4. Let user choose direction

### REFINEMENT Mode (Editing)

When user provides feedback:
1. Work with existing draft
2. Preserve voice and structure
3. Apply specific changes requested
4. Keep what works

## Handoff Protocol

### Orchestrator → Writer

```
[Research summary if applicable - 2-3 sentences]
[Material gathered: list key assets]
[Message clarity: thesis statement]
[Style guide: name if applicable]
[Mode: EXPLORATION or REFINEMENT]
```

### Writer → Orchestrator (Rare)

Only when:
- User explicitly requests brainstorming
- New research topic needed
- Web search required
- Significant scope change

## Integration with Commands

### `/writing:plan`
Uses Orchestrator patterns:
- Request classification
- Research phase
- Two-gate assessment
- Material gathering

### `/writing:draft`
Uses Writer patterns:
- Strategy application
- Mode selection
- Draft creation
- Quality checkpoints

### `/writing:review`
Uses both:
- Orchestrator: coordinate review agents
- Writer: apply fixes

### `/writing:compound`
Captures patterns that worked for future orchestration.

## References

- [baseline-strategies.md](./references/baseline-strategies.md) - Full 10 baseline strategies with examples
- [situational-strategies.md](./references/situational-strategies.md) - 20+ situational strategies
- [quality-checkpoints.md](./references/quality-checkpoints.md) - Detailed checkpoint criteria
