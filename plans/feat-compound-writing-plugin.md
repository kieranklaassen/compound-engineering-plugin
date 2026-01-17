# Compound Writing Plugin

> Each unit of writing work should make subsequent units easier—not harder.

## Enhancement Summary

**Deepened on:** 2026-01-16
**Research agents used:** 14 parallel agents (skills analysis, architecture review, simplicity review, pattern recognition, best practices, framework docs, learnings check, agent structure guidance)

### Key Improvements from Research
1. **Simplified from 17 to 9 agents** - Consolidated overlapping agents (clarity-surgeon absorbs passive-voice-hunter, concision-enforcer, jargon-detector)
2. **Skills provide specialization, not agents** - Style skills (dhh-writing, every-style) replace redundant reviewer agents
3. **Producer-Critic loop added** - Voice-guardian runs iteratively during drafting until score ≥85
4. **Voice Kit architecture** - Structured YAML voice profiles with 3 layers (immutable traits, channel guidance, example library)
5. **Quality gates refined** - 5 gates with specific pass thresholds and scoring rubrics
6. **Parallel execution maximized** - Research phase (3 agents), Review phase (6+ agents) run simultaneously
7. **Pattern capture system** - Structured `docs/patterns/` with YAML frontmatter schema

### Critical Decisions Made
- **Extend compound-engineering, don't fragment** - Add `agents/writing/` category to existing plugin
- **Use `writing:*` command namespace** - Distinct from `workflows:*` for engineering
- **Reference existing skills** - Don't duplicate `every-style-editor`, import existing external skills

---

## Overview

A Claude Code plugin that applies compound engineering principles to writing. Just as compound-engineering captures coding patterns and preferences to make future development faster, compound-writing captures voice, style, and editorial preferences to make future writing faster and more consistent.

**Core Philosophy**: The 50/50 rule for writing—spend 50% improving your writing system (style guides, templates, voice documentation), 50% actually writing. This feels slow at first. Within weeks, the compounding becomes obvious.

---

## Architecture

### Research Insight: Extend compound-engineering, Don't Fragment

Based on architecture review, this plugin should **extend the existing compound-engineering plugin** rather than create a standalone plugin. This:
- Maintains single source of truth for shared components
- Reuses existing infrastructure (file-todos, compound-docs)
- Avoids skill ownership ambiguity
- Follows the established plugin pattern

### Directory Structure (Simplified from Research)

```
plugins/compound-engineering/
├── agents/
│   └── writing/                    # NEW: Writing-specific agents
│       ├── source-researcher.md    # Research + audience + competitor (consolidated)
│       ├── fact-checker.md         # Claim verification
│       ├── structure-architect.md  # Outline + flow + hooks (consolidated)
│       ├── voice-guardian.md       # Voice consistency + tone (consolidated)
│       ├── clarity-editor.md       # Clarity + concision + jargon + passive (consolidated)
│       └── publishing-optimizer.md # SEO + social + newsletter (consolidated)
├── commands/
│   └── workflows/
│       ├── write.md               # /writing:plan - Unified entry point
│       ├── draft.md               # /writing:draft - Execute outline
│       ├── edit.md                # /writing:review - Multi-agent editorial
│       └── capture.md             # /writing:compound - Capture patterns
├── skills/
│   ├── every-style-editor/        # EXISTING - reuse, don't duplicate
│   ├── pragmatic-writing/         # NEW
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── techniques.md
│   │       ├── examples.md
│   │       ├── anti-patterns.md   # Added from research
│   │       └── sources.md
│   ├── dhh-writing/               # NEW
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── examples.md        # Before/after transformations
│   │       ├── anti-patterns.md   # Seven deadly sins of tech writing
│   │       ├── techniques.md      # 10 core techniques
│   │       └── resources.md       # Source material links
│   └── voice-capture/             # NEW
│       ├── SKILL.md
│       ├── references/
│       │   ├── extraction-templates.md
│       │   ├── analysis-dimensions.md
│       │   └── example-profiles.md
│       └── assets/
│           └── voice-profile-template.yaml
└── docs/
    └── patterns/                  # NEW: Writing pattern captures
        ├── common-patterns.md     # Index of frequently used patterns
        ├── hooks/                 # Hook formulas that work
        ├── structures/            # Successful article structures
        ├── transitions/           # Transition phrases that flow
        └── voice/                 # Voice pattern captures
```

### Agent Consolidation (17 → 6)

| Original Agents | Consolidated Into | Reasoning |
|-----------------|-------------------|-----------|
| source-researcher, audience-analyzer, competitor-content-analyst | `source-researcher` | All research functions |
| outline-architect, flow-analyzer, hook-generator | `structure-architect` | All structure functions |
| voice-guardian, tone-calibrator | `voice-guardian` | Both manage voice |
| clarity-surgeon, concision-enforcer, jargon-detector, passive-voice-hunter | `clarity-editor` | All editing functions |
| seo-optimizer, social-adapter, newsletter-formatter | `publishing-optimizer` | All publishing functions |
| every-style-enforcer, dhh-writing-reviewer, pragmatic-writing-reviewer | **REMOVED** | Skills provide this |

### Voice Kit Architecture (from Research)

```yaml
# Voice profile format (3 layers)
voice:
  name: "kieran-blog"

  # Layer 1: Immutable Traits
  traits:
    - direct
    - conversational
    - technically-informed
  register: informal
  prohibited:
    - "synergy"
    - "leverage" (as verb)
    - passive voice in openings

  # Layer 2: Channel Guidance
  channels:
    blog: "longer form, storytelling allowed"
    social: "punchy, hooks required"
    newsletter: "personality forward"

  # Layer 3: Example Library
  exemplars:
    - path: "samples/great-opening.md"
      why: "Concrete example first, theory second"
    - path: "samples/transition.md"
      why: "Invisible transition technique"
```

---

## The Four-Phase Workflow

### Phase 1: `/writing:plan` — Research & Outline

**Purpose**: Transform a topic or brief into a structured outline with sources.

**Parallel Research Agents**:
```
- Task source-researcher(topic) — Find credible sources
- Task audience-analyzer(topic) — Understand reader context
- Task competitor-content-analyst(topic) — See what exists
```

**Process**:
1. **Clarify the brief**: What's the argument? Who's the reader? What should they do after?
2. **Gather material**: Sources, quotes, data, examples
3. **Two-gate assessment**:
   - Gate 1: Material sufficiency — "Could I write this without inventing facts?"
   - Gate 2: Message clarity — "Do I know the specific point to make?"
4. **Create outline**: Hook, structure, key beats, CTA
5. **Output**: `drafts/{slug}/outline.md`

**Post-Planning Options**:
1. Deepen research (more sources)
2. Review outline (structural feedback)
3. Start `/writing:draft`

---

### Phase 2: `/writing:draft` — Execute Outline

**Purpose**: Transform outline into prose following style preferences.

**Process**:
1. **Load context**:
   - Read outline and sources
   - Fetch applicable style guide (Every, DHH, custom)
   - Extract voice patterns if samples provided
2. **Pre-draft checklist**:
   - [ ] Opening is concrete (story/example first, not theory)
   - [ ] Each section has a clear purpose
   - [ ] Sources are sufficient for claims
3. **Draft execution**:
   - Section by section, following outline
   - Apply baseline strategies (short sentences, active voice, concrete examples)
   - Apply situational strategies (platform-specific, audience-specific)
4. **Three-draft exploration** (optional):
   - Produce 3 variations with different angles
   - User selects direction
5. **Output**: `drafts/{slug}/draft-v1.md`

**Quality Checkpoints**:
- [ ] Opening hooks within first 50 words
- [ ] No paragraph over 4 sentences
- [ ] Concrete example in each major section
- [ ] Clear CTA at end

---

### Phase 3: `/writing:review` — Multi-Agent Editorial

**Purpose**: Exhaustive parallel review from multiple perspectives.

**Parallel Review Agents**:
```
- Task voice-guardian(draft) — Does it match the voice?
- Task clarity-surgeon(draft) — Is it clear and readable?
- Task fact-checker(draft) — Are claims supported?
- Task every-style-enforcer(draft) — Style guide compliance
- Task concision-enforcer(draft) — Can anything be cut?
- Task flow-analyzer(draft) — Does it flow logically?
```

**Conditional Agents**:
- If technical: `jargon-detector`
- If persuasive: `argument-strength-analyzer`
- If SEO needed: `seo-optimizer`

**Output**: Findings ranked by priority:

```markdown
**[Critical]** Unsupported claim in paragraph 3: "Studies show..." — no source provided.
*What do you want to do?* Accept / Skip / Custom

**[Important]** Passive voice in 4 sentences. Active alternatives suggested.
*What do you want to do?* Accept / Skip / Custom

**[Polish]** "Very" used 3 times. Stronger alternatives available.
*What do you want to do?* Accept / Skip / Custom
```

**Triage Flow**: `/triage` walks through findings one by one, creating todos for accepted items.

---

### Phase 4: `/writing:compound` — Capture What Worked

**Purpose**: Turn this piece's learnings into permanent improvements.

**Triggers**: "That draft worked well", "This is ready to publish", piece is approved

**Process**:
1. **Extract patterns**:
   - What made the hook effective?
   - Which structure worked for this topic type?
   - What voice elements landed?
2. **Update style documentation**:
   - Add successful examples to style guide
   - Document new patterns discovered
   - Flag anti-patterns that were edited out
3. **Create reusable assets**:
   - Template from successful structure
   - Hook formula that worked
   - Transition phrases that flowed
4. **Output**: Updates to `docs/patterns/`, `skills/*/references/`

**The Compound Loop**:
```
Write → Review → Edit → Document what worked → Next piece starts smarter
```

---

## Specialized Agents

### Research Agents

#### `source-researcher`
**Purpose**: Find credible, recent sources for claims.
**Principles**:
- Primary sources over secondary
- Recency matters (prefer last 2 years)
- Diverse perspectives, not just confirming
**Output**: Structured source list with quotes and reliability ratings

#### `audience-analyzer`
**Purpose**: Understand who's reading and what they need.
**Principles**:
- What do they already know?
- What's their emotional state?
- What action should they take?
**Output**: Reader persona with context, goals, objections

#### `fact-checker`
**Purpose**: Verify claims against sources.
**Principles**:
- Every statistic needs a source
- Quotes need attribution
- "Studies show" is never acceptable without citation
**Output**: Claim verification report with flags

---

### Structure Agents

#### `outline-architect`
**Purpose**: Create structures that serve the argument.
**Principles**:
- Hook must earn the next sentence
- Each section must advance the argument
- Transitions should be invisible
**Output**: Structured outline with beat-by-beat breakdown

#### `flow-analyzer`
**Purpose**: Ensure logical progression.
**Principles**:
- Does each section follow from the last?
- Are there gaps in logic?
- Does the ending deliver on the opening's promise?
**Output**: Flow analysis with gap identification

#### `hook-generator`
**Purpose**: Create compelling openings.
**Principles**:
- Concrete before abstract
- Tension or surprise in first line
- Earn the reader's next 30 seconds
**Output**: 3-5 hook options with rationale

---

### Style Agents

#### `voice-guardian`
**Purpose**: Maintain consistent voice across pieces.
**Input**: Voice profile (extracted or defined)
**Principles**:
- Vocabulary consistency
- Sentence rhythm patterns
- Emotional register matching
**Output**: Voice drift report with specific fixes

#### `every-style-enforcer`
**Purpose**: Enforce Every's style guide.
**Based on**: `EVERY_WRITE_STYLE.md`
**Checks**:
- Title case for headlines
- Sentence case elsewhere
- Oxford comma
- Em dashes without spaces
- Number formatting
- Company singular/plural
**Output**: Style violations with line numbers and fixes

#### `dhh-writing-reviewer`
**Purpose**: Review in DHH's direct, opinionated style.
**Principles**:
- Is this brave enough?
- Does it take a stand?
- Is it too hedged?
- Would DHH publish this?
**Output**: Brutally honest feedback

#### `pragmatic-writing-reviewer`
**Purpose**: Apply Hunt/Thomas/Spolsky principles.
**Principles**:
- Concrete before abstract?
- Physical analogies for concepts?
- Conversational register?
- Humor as architecture?
**Output**: Technique-by-technique assessment

---

### Editing Agents

#### `clarity-surgeon`
**Purpose**: Make every sentence crystal clear.
**Principles**:
- One idea per sentence
- Subject-verb-object structure
- No ambiguous pronouns
**Output**: Clarity issues with rewrites

#### `concision-enforcer`
**Purpose**: Cut everything that can be cut.
**Principles**:
- If removing it doesn't hurt, remove it
- Adverbs are usually cuttable
- "That" is usually cuttable
**Output**: Cut suggestions with before/after

#### `jargon-detector`
**Purpose**: Flag insider language.
**Principles**:
- Would a smart outsider understand this?
- Is the jargon necessary or lazy?
- Provide plain-language alternatives
**Output**: Jargon list with accessible alternatives

---

## Skills

### `pragmatic-writing`
**Triggers**: "Write like Spolsky", "Pragmatic Programmer style", technical writing
**Core**: Hunt/Thomas + Spolsky principles
- Concrete before abstract
- Physical analogies
- Conversational register
- Humor as architecture
**References**: `techniques.md`, `examples.md`

### `dhh-writing`
**Triggers**: "DHH style", "write like Basecamp", "strong opinion"
**Core**: Direct, brave, opinionated prose
- Take a stand
- No hedging
- Short, punchy sentences
**References**: `style-guide.md`

### `every-style`
**Triggers**: "Every style", editing for Every publications
**Core**: Every's editorial standards
- Full style guide
- Punctuation rules
- Formatting standards
**References**: `EVERY_WRITE_STYLE.md`

### `spiral-writing`
**Triggers**: "Strategic writing", "content strategy"
**Core**: Two-agent orchestration with strategies
- 10 baseline strategies
- 20+ situational strategies
- Two-gate assessment
**References**: `strategies.md`, `templates.md`

### `voice-capture`
**Triggers**: "Extract my voice", "match this style", sample text provided
**Core**: Voice extraction and encoding
- Analyze sample text
- Extract patterns
- Create voice profile
**References**: `extraction-templates.md`

---

## Commands

### `/writing:plan [topic or brief]`
Research topic, gather sources, create outline.
```yaml
name: writing:plan
description: Transform a topic into a researched outline
argument-hint: "[topic, brief, or idea]"
```

### `/writing:draft [outline path]`
Execute outline into prose.
```yaml
name: writing:draft
description: Transform outline into draft following style preferences
argument-hint: "[path to outline.md]"
```

### `/writing:review [draft path]`
Multi-agent editorial review.
```yaml
name: writing:review
description: Exhaustive parallel editorial review
argument-hint: "[path to draft.md or 'latest']"
```

### `/writing:compound`
Capture learnings from successful piece.
```yaml
name: writing:compound
description: Document what worked to improve future writing
argument-hint: "[path to published piece]"
```

### `/voice-extract [sample text or file]`
Extract voice profile from samples.
```yaml
name: voice-extract
description: Analyze text samples and create voice profile
argument-hint: "[sample text, file path, or URL]"
```

### `/style-check [text or file]`
Quick style compliance check.
```yaml
name: style-check
description: Check text against style guide
argument-hint: "[text or file path]"
```

---

## Quality Gates

### Gate 1: Material Sufficiency
**Question**: "Could the writer create this without inventing facts?"
- Pass: Concrete details, examples, data available
- Fail: Would need to fabricate examples

### Gate 2: Message Clarity
**Question**: "Do we know the specific message to convey?"
- Pass: Clear, specific communication goal
- Fail: Vague requests like "write about this"

### Gate 3: Style Compliance
**Question**: "Does it match the voice and style guide?"
- Pass: Consistent voice, style rules followed
- Fail: Drift, violations, inconsistency

### Gate 4: Factual Accuracy
**Question**: "Are all claims supported?"
- Pass: Every claim has a source
- Fail: Unsupported assertions

---

## The Compound Effect

### Before Compound Writing
```
Write piece → Edit → Publish → Start from scratch
Write piece → Edit → Publish → Start from scratch
Write piece → Edit → Publish → Start from scratch
```

### After Compound Writing
```
Write piece → Edit → Document patterns → Publish
Write piece (faster) → Edit (patterns help) → Document → Publish
Write piece (faster still) → Minimal edit → Document → Publish
```

### What Compounds
- **Voice profiles**: Extracted once, used forever
- **Style rules**: Encoded once, enforced automatically
- **Successful structures**: Templated for reuse
- **Hook formulas**: Patterns that work
- **Editing fixes**: Turn recurring edits into rules

---

## Implementation Plan (Simplified from Research)

### Phase 1: Core Infrastructure
- [ ] Update `plugins/compound-engineering/.claude-plugin/plugin.json` (bump version, update description)
- [ ] Update `plugins/compound-engineering/README.md` (add writing components)
- [ ] Update `plugins/compound-engineering/CHANGELOG.md` (document additions)
- [ ] Create `plugins/compound-engineering/agents/writing/` directory
- [ ] Create `plugins/compound-engineering/docs/patterns/` directory structure

### Phase 2: Core Agents (6 consolidated)
- [ ] `agents/writing/source-researcher.md` - Research, audience, competitor analysis
- [ ] `agents/writing/fact-checker.md` - Claim verification
- [ ] `agents/writing/structure-architect.md` - Outline, flow, hooks
- [ ] `agents/writing/voice-guardian.md` - Voice consistency, tone calibration
- [ ] `agents/writing/clarity-editor.md` - Clarity, concision, jargon, passive voice
- [ ] `agents/writing/publishing-optimizer.md` - SEO, social, newsletter formatting

### Phase 3: Core Workflow Commands (4)
- [ ] `commands/writing-plan.md` - `/writing:plan` (research & outline)
- [ ] `commands/writing-draft.md` - `/writing:draft` (execute outline with Producer-Critic loop)
- [ ] `commands/writing-review.md` - `/writing:review` (parallel agent editorial)
- [ ] `commands/writing-compound.md` - `/writing:compound` (capture patterns)

### Phase 4: Skills (3 new + 1 existing reference)
- [ ] `skills/pragmatic-writing/SKILL.md` + references (techniques, examples, anti-patterns, sources)
- [ ] `skills/dhh-writing/SKILL.md` + references (examples, anti-patterns, techniques, resources)
- [ ] `skills/voice-capture/SKILL.md` + references + assets/voice-profile-template.yaml
- [ ] Verify `skills/every-style-editor/` is properly linked (existing)

### Phase 5: Pattern Capture System
- [ ] Create `docs/patterns/common-patterns.md` (index file)
- [ ] Create `docs/patterns/hooks/` directory
- [ ] Create `docs/patterns/structures/` directory
- [ ] Create `docs/patterns/transitions/` directory
- [ ] Create `docs/patterns/voice/` directory
- [ ] Create pattern template in `skills/voice-capture/assets/pattern-template.md`

### Phase 6: Versioning Checkpoint (from learnings)
- [ ] Verify component counts match actual files
- [ ] Update plugin.json description with accurate counts
- [ ] Update README.md tables
- [ ] Validate JSON files with `jq`

### Removed from Original Plan (YAGNI)
- ~~17 separate agents~~ → 6 consolidated agents
- ~~5 skills~~ → 3 new skills (reuse existing every-style-editor)
- ~~hooks/hooks.json~~ → Removed (no established pattern, adds intrusive automation)
- ~~spiral-writing skill~~ → Too complex for initial version
- ~~Three-draft exploration~~ → Single draft, iterate if needed

---

## Success Metrics

1. **Time to first draft**: Should decrease 50% after 10 pieces
2. **Edit rounds**: Should decrease from 3+ to 1-2
3. **Style violations**: Should approach zero with enforcement
4. **Voice consistency**: Reader shouldn't detect multiple authors
5. **Reusable assets**: Each piece should generate at least one template/pattern

---

## References

### Internal (from research)
- Compound Engineering Plugin: `plugins/compound-engineering/`
- Existing Every Style Skill: `plugins/compound-engineering/skills/every-style-editor/`
- DHH Writing Style Skill: `~/.claude/skills/dhh-writing-style/`
- Pragmatic Writing Skill: `~/.claude/skills/pragmatic-writing-skill/`
- Spiral Writing Skill: `~/.claude/skills/spiral-writing/`
- Compound Docs Skill: `plugins/compound-engineering/skills/compound-docs/`
- Skill Creator Skill: `plugins/compound-engineering/skills/skill-creator/`
- Agent Native Architecture Skill: `plugins/compound-engineering/skills/agent-native-architecture/`

### External (from research)
- Stanford STORM: Multi-agent research system for perspective-based research
- CrewAI: Role-based agent orchestration with sequential/hierarchical processes
- LangGraph: Graph-based state management with checkpointing
- Vale: Prose linting tool for style enforcement
- Writer.com: Voice extraction and Knowledge Graph patterns
- Jasper Brand IQ: Voice profile and style guide integration

### Best Practices Applied (from research)
- Progressive disclosure for skills (SKILL.md < 500 lines)
- Third-person descriptions for agent/skill triggers ("This skill should be used when...")
- Namespaced commands (`writing:*`) to avoid collisions with built-in commands
- Parallel agent execution for research and review phases
- Producer-Critic loop for iterative draft refinement (score threshold: 85+)
- Two-gate assessment before drafting (material sufficiency + message clarity)
- Explicit completion signals for all agents (`complete_task` tool pattern)
- Shared workspace pattern (files as universal interface)
- Voice Kit architecture with 3 layers (traits, channels, exemplars)
- Pattern capture with YAML frontmatter schema

### Research Sources
- [Writer.com Knowledge Graph](https://writer.com/product/graph-based-rag/)
- [LangGraph Multi-Agent Workflows](https://www.blog.langchain.com/langgraph-multi-agent-workflows/)
- [Microsoft Azure AI Agent Patterns](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns)
- [Producer-Critic Pattern](https://agentic-design.ai/patterns/reflection/producer-critic)
- [AI Framework Landscape 2025](https://medium.com/@hieutrantrung.it/the-ai-agent-framework-landscape-in-2025)
- Plugin versioning requirements: `docs/solutions/plugin-versioning-requirements.md`
